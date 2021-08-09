import { useState } from 'react'
import { IColumn, Table, useTable } from 'components/Table'

export const DemoTable = () => {
  const [data, setData] = useState(MOCK_DATA)

  const table = useTable({
    data: data,
    columnList: MOCK_COLUMN,
    onAdd: mockAddData,
    onEdit: mockEditData,
    onDelete: mockDeleteData,
  })

  function mockAddData(record: any) {
    const newData = { ...record }
    delete newData.key
    setData([
      { ...newData, id: `MOCK-${Math.random()}-${Math.random()}` },
      ...data,
    ])
  }

  function mockEditData(record: any) {
    const newData = { ...record }
    delete newData.key
    setData(
      data.map((each) => {
        if (each.id === record.id) {
          return { ...each, ...newData }
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
    type: 'select',
    text: 'ตำแหน่ง',
    dataIndex: 'title',
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
    type: 'number',
    text: 'อายุ',
    dataIndex: 'age',
    editable: true,
    width: '20%',
    min: 10,
    max: 30,
  },
  {
    type: 'checkbox',
    text: 'ผู้บริหาร',
    dataIndex: 'isExecutive',
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
