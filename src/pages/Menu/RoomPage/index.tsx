import { Table, useTable } from 'components/Table'
import { useMenuRoom, columnList } from './helper'
import { Button } from 'components/Button'
import { VscAdd } from 'react-icons/vsc'
import style from './style.module.scss'

export const MenuRoomPage = () => {
  const { data, addRoom, editRoom, deleteRoom } = useMenuRoom()
  console.log(data)

  const roomTable = useTable({
    data: data,
    columnList: columnList,
    onAdd: addRoom,
    onEdit: editRoom,
    onDelete: deleteRoom,
  })

  return (
    <div className={style.page}>
      <div className={style.topTable}>
        <h1 className={style.head}>ข้อมูลห้องเรียน</h1>
        <Button onClick={() => roomTable.addRow()}>
          <VscAdd className={style.iconAdd} />
          เพิ่มห้องเรียน
        </Button>
      </div>
      <Table use={roomTable} />
    </div>
  )
}
