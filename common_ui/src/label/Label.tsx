import React, { FC } from 'react'

export interface LabelProps {}

export const Label: FC<LabelProps> = ({ children }) => {
  if (!children) {
    return null
  }

  return <div className="mb-2">{children}</div>
}
