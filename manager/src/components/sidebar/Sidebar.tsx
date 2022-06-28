/* eslint-disable jsx-a11y/anchor-is-valid */
import { Icon } from 'common-ui'
import { css } from '@emotion/react'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { forwardRef } from 'react'

// FIXME to be removed
const routes = [
  {
    name: 'List example',
    path: '/table',
  },
  {
    name: 'Create Example',
    path: '/createForm/create',
  },
  {
    name: 'Example form',
    path: '/home',
  },
]

export interface SidebarProps {
  headerHeight: number
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({ headerHeight }, ref) => {
  const { asPath } = useRouter()

  return (
    <div
      ref={ref}
      className="fixed bottom-0 bg-gray-50 w-56 h-full border-r border-gray-200 border-solid overflow-auto z-40"
      css={css`
        padding: 36px 20px;
        height: calc(100vh - ${headerHeight}px);
      `}
    >
      {routes.map(({ name, path }) => {
        const key = `${name}_${path}`

        return (
          <Link key={key} href={path} passHref>
            <a
              className={classNames('flex p-2 rounded font-semibold hover:bg-main10 transition-colors', {
                'bg-main5': asPath !== path,
                'bg-main10 pointer-events-none': asPath === path,
              })}
              css={css`
                &:not(:last-of-type) {
                  margin-bottom: 8px;
                }
              `}
            >
              <Icon name="star" className="text-blue-800 mr-4" />
              {name}
            </a>
          </Link>
        )
      })}
    </div>
  )
})
