import css from 'classnames'
import style from './style.module.scss'
import { Table, Form, Button } from 'antd'
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { EditableCell } from './EditableCell'
import {
  IColumn,
  IRecord,
  EditingStatus,
  useTable,
  convertToAntdData,
  convertToAntdColumn,
} from './helper'

interface IProps {
  /** Use with `useTable` hooks */
  use: ReturnType<typeof useTable>
}

const MyTable: React.FC<IProps> = ({ use: { $ } }) => {
  const dataWithKey = convertToAntdData($.tableData)
  const antdColumn = convertToAntdColumn($.columnList, $.isEditing)

  const editableColumn = [
    ...antdColumn,
    {
      title: '',
      align: 'right' as any,
      onHeaderCell: () => ({ className: style.buttonWraper }),
      render: (_: any, record: IRecord) => {
        const editable = $.isEditing(record)
        return editable ? (
          <span key="save-cancel">
            <Button
              type="text"
              shape="circle"
              icon={<FiCheck />}
              className={style.buttonSave}
              onClick={() => {
                if (record.key === EditingStatus.NewlyAdded) {
                  $.event('add', { ...record, ...$.form.getFieldsValue() })
                } else {
                  $.event('edit', { ...record, ...$.form.getFieldsValue() })
                }
              }}
            />
            <Button
              type="text"
              shape="circle"
              icon={<FiX />}
              className={style.buttonCancel}
              onClick={$.stopEditing}
              style={{ marginLeft: '0.5rem' }}
            />
          </span>
        ) : (
          <span key="edit-delete">
            <Button
              type="text"
              shape="circle"
              icon={<FiEdit />}
              className={style.buttonEdit}
              disabled={$.isEditable()}
              onClick={() => $.startEditing(record)}
            />
            <Button
              type="text"
              shape="circle"
              icon={<FiTrash2 />}
              className={style.buttonDelete}
              style={{ marginLeft: '0.5rem' }}
              disabled={$.isEditable()}
              onClick={() => $.event('delete', record)}
            />
          </span>
        )
      },
    },
  ]

  return (
    <Form form={$.form} component={false}>
      <Table
        className={css(style.table, 'shadow')}
        components={{ body: { cell: EditableCell } }}
        columns={editableColumn}
        dataSource={[...dataWithKey]}
        pagination={false}
        onRow={(record) =>
          $.isEditing(record) ? { className: style.editingRow } : {}
        }
      />
    </Form>
  )
}

export type { IColumn }
export { MyTable as Table, useTable }
