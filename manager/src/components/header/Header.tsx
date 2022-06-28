import { Icon, Tooltip } from 'common-ui'
import { css } from '@emotion/react'
import { FaUser } from 'react-icons/fa'
import { tailwindColors } from '@src/theme'
import Link from 'next/link'
import React, { forwardRef } from 'react'

export const Header = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <header
      className="sticky top-0 px-3 z-50"
      ref={ref}
      css={css`
        background: ${tailwindColors.white};
        border-bottom: 1px solid ${tailwindColors.gray[200]};
      `}
    >
      <div className="h-16 flex items-center justify-between max-w-screen-2xl m-auto">
        <div className="flex items-center h-16 flex-1">
          <div className="w-24">
            <Link href="/">
              <img src="/images/cmm_logo.jpeg" alt="logo" className="h-24 cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className="flex items-center flex-1 justify-end min-w-0">
          <div
            className="text-right mr-2"
            css={css`
              font-size: 14px;
              min-width: 60px;
              max-width: 240px;
            `}
          >
            <div
              css={css`
                font-weight: bold;
                line-height: 16px;
              `}
            >
              Maciek
            </div>
          </div>
          <Tooltip
            interactive
            trigger="click"
            content={
              <ul className="py-2 px-3 bg-white border-gray-200">
                <li>
                  <button type="button" className="flex hover:bg-gray-50 transition-colors w-full text-left p-1">
                    Log out
                    <Icon name="exit_to_app" className="ml-2 text-gray-500" />
                  </button>
                </li>
              </ul>
            }
            offset={[0, 18]}
          >
            <button
              type="button"
              css={css`
                min-width: 52px;
              `}
            >
              <FaUser />
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  )
})
