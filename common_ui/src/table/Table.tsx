import { css } from '@emotion/core'
import styled from '@emotion/styled'
import classNames from 'classnames'
import React, { MouseEvent } from 'react'
import {
  Column as ReactTableColumn,
  Row,
  useFlexLayout,
  useSortBy,
  UseSortByColumnOptions,
  useTable,
} from 'react-table'

const StyledTable = styled.div<{ fullWidth?: boolean }>`
  table {
    font-weight: 500;
    vertical-align: middle;
    font-size: 12px;
    border-spacing: 0;

    ${({ fullWidth }) =>
      fullWidth &&
      css`
        width: 100%;
      `}

    thead {
      th {
        background: #013ca60d;
        border: none;
      }

      .thContainer {
        position: relative;
        border-radius: 8px;
        padding: 0 24px 0 16px;
        height: 48px;
        margin: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    tbody {
      .noResults {
        td {
          text-align: center;
          padding-top: 24px;
          padding-bottom: 24px;
        }
      }

      tr:not(.noResults) {
        background: white;
      }

      td {
        transition: all 50ms ease-in;
        border: none;
        padding: 8px 8px;
      }
    }
  }
`

const StyledArrow = styled.span`
  position: absolute;
  right: 12px;
`

export const StyledTdContainer = styled.div<{ center?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 28px;
  background: #013ca60d;
  border-radius: 8px;
  padding: 8px 24px;
  ${({ center }) =>
    center &&
    css`
      justify-content: center;
    `}
`

type RowStatus = 'original' | 'new' | 'modified' | 'deleted'

export interface RowMetadata {
  status?: RowStatus
}

export type Column<D extends object = {}> = ReactTableColumn<D> & UseSortByColumnOptions<D>

export interface TableProps<TRow extends RowMetadata> {
  columns: Column<TRow>[]
  data: TRow[]
  fullWidth?: boolean
  onClickRow?(event: MouseEvent<HTMLTableRowElement>, row: Row<TRow>): void
}

export function Table<TRow extends object = {}>({ columns, data, onClickRow, fullWidth }: TableProps<TRow>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn: {
        width: 100,
      },
    },
    useSortBy,
    useFlexLayout,
  )

  return (
    <StyledTable fullWidth={fullWidth}>
      <table {...(getTableProps() as any)} cellSpacing="0" cellPadding="0">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...(headerGroup.getHeaderGroupProps() as any)}>
              {headerGroup.headers.map((column) => {
                const content = (
                  <>
                    {column.render('Header')}
                    {(column as any).isSorted ? (
                      <StyledArrow>
                        {/* <Image
                          imageSrc={arrowDownImage}
                          alt="arrow-down-icon"
                          customRotate={(column as any).isSortedDesc ? 0 : 180}
                        /> */}
                      </StyledArrow>
                    ) : (
                      ''
                    )}
                  </>
                )

                return (
                  // tslint:disable-next-line:jsx-key
                  <th {...(column.getHeaderProps((column as any).getSortByToggleProps()) as any)}>
                    <div className="thContainer">{content}</div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody {...(getTableBodyProps() as any)}>
          {rows.length === 0 && (
            <tr className="noResults">
              <td colSpan={100000}>There are no results</td>
            </tr>
          )}
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr
                // eslint-disable-next-line react/no-array-index-key
                key={`${row}_${i}`}
                {...(row.getRowProps() as any)}
                onClick={(e) => onClickRow && onClickRow(e, row)}
                className={classNames({ hasClickEvent: !!onClickRow })}
              >
                {row.cells.map((cell: any) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <td key={`${cell}_${i}`} {...cell.getCellProps()}>
                      {cell.column.noTdContainer ? (
                        cell.column.render('Cell')
                      ) : (
                        <StyledTdContainer center={cell.column.style && cell.column.style.center}>
                          {cell.render('Cell')}
                        </StyledTdContainer>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </StyledTable>
  )
}
