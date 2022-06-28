import { ComponentTemplate } from 'common-ui'
import { Layout, TemplateRenderer } from '@src/components'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'

export interface RouterProps {
  template: ComponentTemplate[] | ComponentTemplate
}

export const getServerSideProps: GetServerSideProps<RouterProps> = async ({ resolvedUrl }) => {
  const path = resolvedUrl?.substring(1)

  // FIXME to be removed
  if (path.includes('/templates/')) {
    return { notFound: true }
  }

  try {
    // TODO integrate with backend
    const response = await fetch(`http://localhost:3000/templates/${path}.json`)
    const data = await response.json()
    return { props: { template: data } }
  } catch (e) {
    return { notFound: true }
  }
}

function Router({ template }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <TemplateRenderer templates={template} />
    </Layout>
  )
}

export default Router
