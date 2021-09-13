import { IColumn, IFormLayout, Table, useTable } from 'components/Table'
import { delay } from 'libs/delay'

export const DemoTable = () => {
  const table = useTable({
    data: MOCK_DATA,
    columnList: MOCK_COLUMN,
    formLayout: MOCK_LAYOUT,
    onAdd: async (record) => {
      await delay(1.5)
      console.log(record)
    },
    onEdit: async (record) => console.log(record),
    onDelete: async (record) => console.log(record),
  })

  return (
    <main
      style={{
        width: '100%',
        margin: '2rem auto',
        padding: '2rem',
      }}
    >
      <button onClick={() => table.addRecord()}>Add row</button>
      <Table use={table} />
    </main>
  )
}

const MOCK_COLUMN: IColumn[] = [
  {
    type: 'select',
    header: 'ตำแหน่ง',
    dataIndex: 'title',
    optionList: ['อาจารย์', 'ศาสตราจารย์', 'admin'],
    defaultFirstOption: true,
    showInTable: true,
    width: '20%',
  },
  {
    type: 'text',
    header: 'ชื่อ-สกุล',
    dataIndex: 'name',
    showInTable: true,
    width: '20%',
    placeholder: 'ชื่อ-สกุล',
  },
  {
    type: 'credit',
    header: 'credit',
    dataIndex: 'credit',
    showInTable: true,
    width: '20%',
  },
  {
    type: 'number',
    header: 'อายุ',
    dataIndex: 'age',
    showInTable: true,
    width: '20%',
    min: 10,
    max: 30,
  },
  {
    type: 'checkbox',
    header: 'ผู้บริหาร',
    dataIndex: 'isExecutive',
    showInTable: true,
    align: 'center',
    width: '10%',
  },
  {
    type: 'text',
    header: 'secret',
    dataIndex: 'secret',
  },
]

const MOCK_LAYOUT: IFormLayout = {
  addFormTitle: 'เพิ่มข้อมูลเดโม่ใหม่',
  editFormTitle: 'แก้ไขข้อมูลเดโม่',
  layout: [['title', 'name'], ['credit'], ['age', 'isExecutive', 'name']],
}

const MOCK_DATA: any[] = [
  {
    id: 'eDvc-4X',
    title: 'อาจารย์',
    name: 'คณัฐ ตังติสาานนท์',
    credit: '1(2-3-4)',
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
