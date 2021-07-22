import css from 'classnames'
import style from './style.module.scss'
import { Table, Typography, Popconfirm, Form } from 'antd'
import { EditableCell } from './EditableCell'
import { IColumn, useTableEditor, addKey, convertToAntdColumn } from './helper'

interface IProps {
  columnList: IColumn[]
  data: any[]
  editor?: ReturnType<typeof useTableEditor>
}

const MyTable: React.FC<IProps> = ({ columnList, data, editor }) => {
  const dataWithKey = addKey(data)
  const antdColumn = convertToAntdColumn(columnList)
  const editableColumn = editor
    ? [
        ...antdColumn,
        {
          title: '',
          render: (_: any, record: any) => {
            const editable = editor.isEditing(record)
            return editable ? (
              <span>
                <a
                  href="javascript:;"
                  onClick={() => editor.setEditingKey(-1)}
                  style={{ marginRight: 8 }}
                >
                  Save
                </a>
                <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={() => editor.setEditingKey(-1)}
                >
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editor.editingKey !== -1}
                onClick={() => editor.setEditingKey(record.key)}
              >
                Edit
              </Typography.Link>
            )
          },
        },
      ]
    : antdColumn

  return (
    <Form form={editor?.form} component={false}>
      <Table
        className={css(style.table, 'shadow')}
        components={{ body: { cell: EditableCell } }}
        columns={editableColumn}
        dataSource={dataWithKey}
        pagination={false}
      />
    </Form>
  )
}

export type { IColumn }
export { MyTable as Table, useTableEditor }
