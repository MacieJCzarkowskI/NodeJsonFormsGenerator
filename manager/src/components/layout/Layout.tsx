import { css } from '@emotion/react'
import { Header, Sidebar } from '@src/components'
import React, { FC, useEffect, useRef, useState } from 'react'

const CONTENT_LEFT_PADDING = 36

const getContentCss = (sideBarWidth: number) => css`
  flex: 1 1 0%;
  position: relative;
  word-wrap: break-word;
  will-change: padding-left;
  padding-left: ${sideBarWidth + CONTENT_LEFT_PADDING}px;
  padding-right: 36px;
  padding-top: 36px;
  padding-bottom: 36px;
  width: 0px;
`

export const Layout: FC = ({ children }) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const [headerHeight, setHeaderHeight] = useState<number>(0)
  const [sideBarWidth, setSideBarWidth] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => {
      setHeaderHeight(headerRef.current?.clientHeight ?? 0 + 1)
      setSideBarWidth(sidebarRef.current?.clientWidth ?? 0 + 1)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="h-full overflow-auto">
      <Header ref={headerRef} />
      <div
        className="relative flex flex-row"
        css={css`
          min-height: calc(100% - ${headerHeight + 1}px);
        `}
      >
        <Sidebar ref={sidebarRef} headerHeight={headerHeight} />
        <div css={getContentCss(sideBarWidth)}>{children}</div>
      </div>
    </div>
  )
}
