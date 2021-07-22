import css from 'classnames'
import style from './style.module.scss'
import { Table, TableColumnsType, Checkbox, Select, Form } from 'antd'
import { EditableCell } from './EditableCell'
import { useTableEditor } from './helper'

interface IProps {
  columnList: IColumn[]
  data: any[]
  editor?: ReturnType<typeof useTableEditor>
}

export type IColumn = ITextColumn | ICheckboxColumn | ISelectColumn

interface IBaseColumn {
  text: string
  dataIndex: string
  width?: string
  editable?: boolean
}

interface ITextColumn extends IBaseColumn {
  type?: 'text'
}

interface ICheckboxColumn extends IBaseColumn {
  type: 'checkbox'
}

interface ISelectColumn extends IBaseColumn {
  type: 'select'
  selectList: string[]
}

function buildColumnList(
  columnList: IColumn[],
  editor?: ReturnType<typeof useTableEditor>
) {
  const result: TableColumnsType = []
  for (let i = 0, len = columnList.length; i < len; i++) {
    const column = columnList[i]

    switch (column.type) {
      case 'checkbox':
        result.push({
          ...column,
          title: column.text,
          render: (isExecutive: boolean) => <Checkbox checked={isExecutive} />,
        })
        break

      case 'select':
        result.push({
          ...column,
          title: column.text,
          render: (title: string) => (
            <Select
              value={title}
              options={column.selectList.map((o) => ({ value: o }))}
            />
          ),
        })
        break

      default:
        result.push({
          ...column,
          title: column.text,
        })
        break
    }
  }

  if (editor) {
    result.push({
      title: '',
      render: (_, record, i) => {
        const editable = editor.isEditing(i)
        return editable ? (
          <span>editing</span>
        ) : (
          <button onClick={() => editor.setEditingIndex(i)}>edit</button>
        )
      },
    })
  }

  return result
}

const MyTable: React.FC<IProps> = ({ columnList, data, editor }) => {
  return (
    <Form form={editor?.form} component={false}>
      <Table
        className={css(style.table, 'shadow')}
        components={{ body: { cell: EditableCell } }}
        columns={buildColumnList(columnList, editor)}
        dataSource={data}
        pagination={false}
      />
    </Form>
  )
}

export { MyTable as Table, useTableEditor }
