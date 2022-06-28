import React, { FC, ReactNode } from 'react'
import styled from '@emotion/styled'

const StyledHeader = styled.div`
  border-radius: 4px;
  padding: 20px 25px 20px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export interface AccordionProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'title' | 'children'> {
  title: ReactNode | string
  children?: ReactNode | string
  expanded?: boolean
}

export const Accordion: FC<AccordionProps> = ({ title, children, expanded, ...rest }) => {
  return (
    <div {...rest}>
      <StyledHeader className="bg-main10">{title}</StyledHeader>
      {expanded && <div className="my-3">{children}</div>}
    </div>
  )
}
