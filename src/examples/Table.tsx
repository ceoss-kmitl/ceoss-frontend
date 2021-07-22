import { Table, IColumn, useTableEditor } from 'components/Table'

export const DemoTable = () => {
  const editor = useTableEditor(MOCK_DATA)

  return (
    <main
      style={{
        width: '100%',
        margin: '2rem auto',
        padding: '2rem',
      }}
    >
      <Table columnList={MOCK_COLUMN} data={MOCK_DATA} editor={editor} />
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
  },
  { text: 'ชื่อ-สกุล', dataIndex: 'name', editable: true },
  {
    text: 'ผู้บริหาร',
    dataIndex: 'isExecutive',
    type: 'checkbox',
    editable: true,
  },
]

const MOCK_DATA: any[] = [
  {
    title: 'อาจารย์',
    name: 'คณัฐ ตังติสาานนท์',
    isExecutive: true,
  },
  {
    title: 'ศาสตราจารย์',
    name: 'บีม อิอิซ่า',
    isExecutive: false,
  },
]
