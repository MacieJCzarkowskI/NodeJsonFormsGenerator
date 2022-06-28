/* eslint-disable @typescript-eslint/no-use-before-define */
import { AxiosProvider } from '@shared/hooks'
import { nanoid } from 'nanoid'
import { is, map } from 'ramda'
import React, { cloneElement, ComponentType, createElement, FC, isValidElement, ReactElement, useMemo } from 'react'

export type JSONPrimitive = string | number | boolean | null
export type JSONValue = JSONPrimitive | JSONObject | JSONArray
export interface JSONArray extends Array<JSONValue> {}
export type JSONObject = { [member: string]: JSONValue }

export interface ComponentTemplate {
  type: string
  options?: any
  children?: ComponentTemplate[] | ComponentTemplate | string
}

interface DynamicComponent {
  Component: ComponentType<any> | ReactElement
  props: JSONObject
  key: string
  children?: DynamicComponent[] | DynamicComponent | string
}

const allHTMLTags: string =
  'a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,label,legend,li,link,main,map,mark,menu,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,param,picture,pre,progress,q,rp,rt,ruby,s,samp,script,section,select,slot,small,source,span,strong,style,sub,summary,sup,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr'

const toDynamicComponent = (components: Record<string, ComponentType<any>>) => ({
  type,
  children,
  options = { children },
}: ComponentTemplate): DynamicComponent => {
  let Component: ComponentType<any> | ReactElement = components[type]

  if (!Component && allHTMLTags.includes(type)) {
    Component = createElement(type)
  }

  if (!Component) {
    throw new Error(`Component with type: '${type}' does not exist`)
  }

  const props = mapToProps(options, toDynamicComponent(components))

  let newChildren: any | undefined
  if (Array.isArray(children)) {
    newChildren = children.map(toDynamicComponent(components))
  } else if (isComponentTemplate(children)) {
    newChildren = toDynamicComponent(components)(children as ComponentTemplate)
  } else {
    newChildren = children
  }

  return {
    key: nanoid(),
    Component,
    props,
    children: newChildren,
  }
}

export interface TemplateRendererProps {
  templates: ComponentTemplate | ComponentTemplate[]
  components?: Record<string, ComponentType>
}

export const TemplateRenderer: FC<TemplateRendererProps> = ({ templates, components = {} }) => {
  const dynamicComponents: DynamicComponent[] = useMemo(
    () => (Array.isArray(templates) ? templates : [templates]).map(toDynamicComponent(components)),
    [templates, components],
  )

  const renderComponent = ({ Component, children, key, props }: DynamicComponent) => {
    const renderProps = mapToRenderProps(props, renderDynamicComponents)

    const content = children ? renderDynamicComponents(children) : children

    if (isValidElement(Component)) {
      return cloneElement(Component, { ...renderProps, key }, content)
    }

    return (
      <Component {...renderProps} key={key}>
        {content}
      </Component>
    )
  }

  const renderDynamicComponents = (
    internalComponents: DynamicComponent[] | DynamicComponent | string,
  ): ComponentType<any> | ComponentType<any>[] | ReactElement | ReactElement[] | string => {
    if (typeof internalComponents === 'string') {
      return internalComponents
    }

    return Array.isArray(internalComponents)
      ? internalComponents.map(renderComponent)
      : renderComponent(internalComponents)
  }

  return <AxiosProvider config={{}}>{renderDynamicComponents(dynamicComponents)}</AxiosProvider>
}

function mapToProps(props: any, mapper: (prop: any) => any): any {
  if (!is(Object, props)) {
    return props
  }

  return map((prop: any) => (isComponentTemplate(prop) ? mapper(prop) : mapToProps(prop, mapper)), props)
}

function isComponentTemplate(obj: any = {}): boolean {
  return typeof obj.type === 'string' && !!obj.type
}

function mapToRenderProps(props: any, mapper: (prop: any) => any): any {
  if (!is(Object, props)) {
    return props
  }

  return map((prop: any) => (isDynamicComponent(prop) ? mapper(prop) : mapToRenderProps(prop, mapper)), props)
}

function isDynamicComponent(obj: any = {}): boolean {
  return [obj.props, obj.Component, obj.key].every(Boolean)
}
