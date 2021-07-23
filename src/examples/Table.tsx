/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { Table, IColumn, useTable } from 'components/Table'

export const DemoTable = () => {
  const [data, setData] = useState(MOCK_DATA)

  const table = useTable({
    initialData: data,
    columnList: MOCK_COLUMN,
    onAdd: mockAddData,
    onEdit: mockEditData,
    onDelete: mockDeleteData,
  })

  function mockAddData(record: any) {
    const { key, ...rest } = record
    setData([
      { ...rest, id: `MOCK-${Math.random()}-${Math.random()}` },
      ...data,
    ])
  }

  function mockEditData(record: any) {
    const { key, ...rest } = record
    setData(
      data.map((each) => {
        if (each.id === record.id) {
          return { ...each, ...rest }
        }
        return each
      })
    )
  }

  function mockDeleteData(record: any) {
    setData(data.filter((each) => each.id !== record.id))
  }

  return (
    <main
      style={{
        width: '100%',
        margin: '2rem auto',
        padding: '2rem',
      }}
    >
      <button onClick={() => table.addRow({})}>Add row</button>
      <Table use={table} />
    </main>
  )
}

const MOCK_COLUMN: IColumn[] = [
  {
    text: 'ตำแหน่ง',
    dataIndex: 'title',
    type: 'select',
    selectList: ['อาจารย์', 'ศาสตราจารย์', 'admin'],
    editable: true,
    width: '20%',
  },
  {
    text: 'ชื่อ-สกุล',
    dataIndex: 'name',
    editable: true,
    width: '60%',
    placeholder: 'ชื่อ-สกุล',
  },
  {
    text: 'ผู้บริหาร',
    dataIndex: 'isExecutive',
    type: 'checkbox',
    editable: true,
    width: '20%',
  },
]

const MOCK_DATA: any[] = [
  {
    id: 'eDvc-4X',
    title: 'อาจารย์',
    name: 'คณัฐ ตังติสาานนท์',
    isExecutive: true,
  },
  {
    id: 'zeBq-oL',
    title: 'ศาสตราจารย์',
    name: 'บีม อิอิซ่า',
    isExecutive: false,
  },
]
