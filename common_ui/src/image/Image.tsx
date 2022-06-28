import { useAxiosContext } from '@shared/hooks'
import React, { DetailedHTMLProps, FC, ImgHTMLAttributes, useEffect, useState } from 'react'

export interface ImageProps
  extends Omit<
    DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
    'onPointerEnterCapture' | 'onPointerLeaveCapture'
  > {
  name: string
}

export const Image: FC<ImageProps> = ({ name, ...rest }): JSX.Element | null => {
  const axios = useAxiosContext()

  if (!axios) {
    throw new Error('Image component does not work without axios context')
  }

  const { get } = axios
  const [image, setImage] = useState<string | null>(null)
  const [contentType, setContentType] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      // FIXME wrong endpoint
      const response = await get('https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg', {
        responseType: 'arraybuffer',
      })
      setContentType(response.headers['content-type'])
      setImage(Buffer.from(response.data, 'binary').toString('base64'))
    })()
  }, [get])

  if (image) {
    return <img src={`data:${contentType};base64, ${image}`} alt={name} {...rest} />
  }

  return null
}
