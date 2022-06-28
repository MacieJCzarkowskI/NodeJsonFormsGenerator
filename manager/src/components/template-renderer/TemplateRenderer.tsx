import CommonTemplateRenderer, { TemplateRendererProps } from 'common-ui/template-renderer'
import dynamic from 'next/dynamic'
import React, { ComponentType, FC } from 'react'

const COMPONENTS_MAP: Record<string, ComponentType<any>> = {
  accordion: dynamic(() => import('common-ui/accordion')),
  stepper: dynamic(() => import('common-ui/stepper')),
  form: dynamic(() => import('common-ui/form')),
  select: dynamic(() => import('common-ui/select'), { ssr: false }),
  'async-select': dynamic(() => import('common-ui/async-select'), { ssr: false }),
  input: dynamic(() => import('common-ui/input')),
  button: dynamic(() => import('common-ui/button')),
  'date-picker': dynamic(() => import('common-ui/date-picker')),
  conditional: dynamic(() => import('common-ui/conditional')),
  table: dynamic(() => import('common-ui/table')),
}

export const TemplateRenderer: FC<TemplateRendererProps> = ({ templates }) => {
  return <CommonTemplateRenderer templates={templates} components={COMPONENTS_MAP} />
}
