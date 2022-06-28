import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import { Column } from 'react-table'
import { mockRows } from './mockRows'
import { Table, TableProps } from './Table'

export default {
  title: 'Table',
  component: Table,
} as Meta

const Template: Story<TableProps<any>> = (args) => <Table {...args} />

interface TipdRow {
  id: number
  tagCode: string
  index: number
  name: string
  number: string
  owner: string
  status: string
  createDate: string
}

const columns: Column<TipdRow>[] = [
  { Header: '#', accessor: 'index', width: 60 },
  { Header: 'TIDP Name', accessor: 'name' },
  { Header: 'TIDP Number', accessor: 'number' },
  { Header: 'TIDP Owner', accessor: 'owner' },
  { Header: 'TIDP Status', accessor: 'status' },
  { Header: 'TIDP Created Date', accessor: 'createDate' },
]

export const Default = Template.bind({})
Default.args = {
  fullWidth: true,
  columns,
  data: mockRows,
}
