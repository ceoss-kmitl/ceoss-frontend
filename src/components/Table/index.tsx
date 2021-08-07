import css from 'classnames'
import style from './style.module.scss'
import { Table, Form, Button } from 'antd'
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi'
import { EditableCell } from './EditableCell'
import {
  IColumn,
  IRecord,
  IRealUseTable,
  EditingStatus,
  useTable,
  convertToAntdData,
  convertToAntdColumn,
} from './helper'

interface IProps {
  /** Use with `useTable` hooks */
  use: ReturnType<typeof useTable>
}

const MyTable: React.FC<IProps> = ({ use }) => {
  const { $ } = use as IRealUseTable
  const dataWithKey = convertToAntdData($.tableData)
  const antdColumn = convertToAntdColumn($.columnList, $.isEditing)

  const editableColumn: any[] = [...antdColumn]

  if ($.enableEdit) {
    editableColumn.push({
      title: '',
      align: 'right' as any,
      onHeaderCell: () => ({ className: style.headerActionCell }),
      render: (_: any, record: IRecord) => {
        const editable = $.isEditing(record)
        return editable ? (
          <span key="save-cancel" className={style.buttonWrapper}>
            <Button
              type="text"
              shape="circle"
              icon={<FiCheck />}
              className={css(style.button, style.buttonSave)}
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
              className={css(style.button, style.buttonCancel)}
              onClick={$.stopEditing}
              style={{ marginLeft: '0.5rem' }}
            />
          </span>
        ) : (
          <span key="edit-delete" className={style.buttonWrapper}>
            <Button
              type="text"
              shape="circle"
              icon={<FiEdit />}
              className={css(style.button, style.buttonEdit)}
              disabled={$.isEditable()}
              onClick={() => $.startEditing(record)}
            />
            <Button
              type="text"
              shape="circle"
              icon={<FiTrash2 />}
              className={css(style.button, style.buttonDelete)}
              style={{ marginLeft: '0.5rem' }}
              disabled={$.isEditable()}
              onClick={() => $.event('delete', record)}
            />
          </span>
        )
      },
    })
  }

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
