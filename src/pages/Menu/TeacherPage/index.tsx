import { Table, useTable } from 'components/Table'
import { useMenuTeacher, columnList } from './helper'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
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
        <Text size="head" bold>
          ข้อมูลอาจารย์
        </Text>
        <Button onClick={() => teacherTable.addRow()}>
          <VscAdd className={style.iconAdd} />
          เพิ่มอาจารย์
        </Button>
      </div>
      <Table use={teacherTable} />
    </div>
  )
}
