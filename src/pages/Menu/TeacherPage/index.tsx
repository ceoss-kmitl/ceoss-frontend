import { Table, useTable } from 'components/Table'
import { useMenuTeacher, columnList } from './helper'
import { Button } from 'components/Button'
import { VscAdd } from 'react-icons/vsc'
import style from './style.module.scss'

export const MenuTeacherPage = () => {
  const { data, addTeacher, editTeacher, deleteTeacher } = useMenuTeacher()

  const teacherTable = useTable({
    data,
    columnList,
    onAdd: addTeacher,
    onEdit: editTeacher,
    onDelete: deleteTeacher,
  })

  return (
    <div className={style.page}>
      <div className={style.topTable}>
        <h1 className={style.head}>ข้อมูลอาจารย์</h1>
        <Button onClick={() => teacherTable.addRow()}>
          <VscAdd className={style.iconAdd} />
          เพิ่มอาจารย์
        </Button>
      </div>
      <Table use={teacherTable} />
    </div>
  )
}
