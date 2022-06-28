import { css, Global } from '@emotion/react'
import Tippy, { TippyProps } from '@tippyjs/react'
import React, { FC, forwardRef } from 'react'

const tooltipCss = css`
  .tippy-content {
    padding: 1px;
  }

  .tippy-box {
    background-color: #fff;
    color: black;
  }

  .tippy-box > .tippy-arrow::before {
    color: lightgray;
  }

  .tippy-box[data-placement^='bottom'] > .tippy-arrow:before {
    top: -9px;
  }

  .tippy-box[data-placement^='right'] > .tippy-arrow:before {
    left: -9px;
  }
`

export interface TooltipProps extends TippyProps {}

export const Tooltip: FC<TooltipProps> = forwardRef(({ ...rest }, ref) => {
  return (
    <>
      <Global styles={tooltipCss} />
      <Tippy
        {...rest}
        ref={ref}
        css={css`
          border-radius: 8px;
          border-width: 1px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        `}
      />
    </>
  )
})
