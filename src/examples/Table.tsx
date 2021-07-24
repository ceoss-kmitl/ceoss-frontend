/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { IColumn, Table, useTable } from 'components/Table'

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
    width: '50%',
    placeholder: 'ชื่อ-สกุล',
  },
  {
    text: 'อายุ',
    dataIndex: 'age',
    type: 'number',
    editable: true,
    width: '20%',
    min: 10,
    max: 30,
  },
  {
    text: 'ผู้บริหาร',
    dataIndex: 'isExecutive',
    type: 'checkbox',
    editable: true,
    width: '10%',
  },
]

const MOCK_DATA: any[] = [
  {
    id: 'eDvc-4X',
    title: 'อาจารย์',
    name: 'คณัฐ ตังติสาานนท์',
    age: 28,
    isExecutive: true,
  },
  {
    id: 'zeBq-oL',
    title: 'ศาสตราจารย์',
    name: 'บีม อิอิซ่า',
    age: 19,
    isExecutive: false,
  },
]
