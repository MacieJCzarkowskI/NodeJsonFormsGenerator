import { cloneElement, isValidElement, ReactNode } from 'react'

export function renderReactNode(content: ReactNode | string) {
  return isValidElement(content) ? cloneElement(content, content.props) : content
}
