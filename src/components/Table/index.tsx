import React from 'react'
import css from 'classnames'
import { Table } from 'antd'

import style from './style.module.scss'
import { CustomCell } from './CustomCell'
import { Drawer } from './Drawer'
import { IColumn, IFormLayout, IPrivateUseTable, useTable } from './helper'
import { Loader } from 'components/Loader'

interface IProps {
  /** Use with `useTable` hooks */
  use: ReturnType<typeof useTable>
}

const MyTable: React.FC<IProps> = ({ use }) => {
  const { _ } = use as IPrivateUseTable

  return (
    <>
      <Table
        className={css(style.table, 'shadow')}
        components={{ body: { cell: CustomCell } }}
        columns={_.columnList as any}
        dataSource={_.tableData}
        loading={{ spinning: _.loading, indicator: <Loader /> }}
        pagination={false}
        onRow={(record) => ({
          className: style.tableRow,
          onClick: () => _.editRecord(record),
        })}
      />
      <Drawer use={use} />
    </>
  )
}

export type { IColumn, IFormLayout }
export { MyTable as Table, useTable }
