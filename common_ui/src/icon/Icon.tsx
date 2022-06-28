import classNames from 'classnames'
import React, { FC, SVGProps, useEffect, useRef, useState } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'onPointerEnterCapture' | 'onPointerLeaveCapture'> {
  name: string
}

export const Icon: FC<IconProps> = ({ name, ...rest }): JSX.Element | null => {
  const ImportedIconRef = useRef<any>()
  const [loading, setLoading] = useState(false)

  useEffect((): void => {
    setLoading(true)
    const importIcon = async (): Promise<void> => {
      try {
        ImportedIconRef.current = (await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!./icons/${name}.svg`)).default
      } finally {
        setLoading(false)
      }
    }
    importIcon()
  }, [name])

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef
    return <ImportedIcon {...rest} className={classNames(rest.className, 'fill-current')} />
  }

  return null
}
