import { Table, useTable } from 'components/Table'
import { useMenuSubject, columnList } from './helper'
import { Button } from 'components/Button'
import { VscAdd } from 'react-icons/vsc'
import style from './style.module.scss'

export const MenuSubjectPage = () => {
  const { data, addSubject, editSubject, deleteSubject } = useMenuSubject()

  const subjectTable = useTable({
    data,
    columnList,
    onAdd: addSubject,
    onEdit: editSubject,
    onDelete: deleteSubject,
  })

  return (
    <div className={style.page}>
      <div className={style.topTable}>
        <h1 className={style.head}>ข้อมูลวิชา</h1>
        <Button onClick={() => subjectTable.addRow()}>
          <VscAdd className={style.iconAdd} />
          เพิ่มวิชา
        </Button>
      </div>
      <Table use={subjectTable} />
    </div>
  )
}
