import { Table, useTable } from 'components/Table'
import { useMenuRoom, columnList } from './helper'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { VscAdd } from 'react-icons/vsc'
import style from './style.module.scss'

export const MenuRoomPage = () => {
  const { data, addRoom, editRoom, deleteRoom } = useMenuRoom()

  const roomTable = useTable({
    data,
    columnList,
    onAdd: addRoom,
    onEdit: editRoom,
    onDelete: deleteRoom,
  })

  return (
    <div className={style.page}>
      <div className={style.topTable}>
        <Text size="head" bold>
          ข้อมูลห้องเรียน
        </Text>
        <Button onClick={() => roomTable.addRow()}>
          <VscAdd className={style.iconAdd} />
          เพิ่มห้องเรียน
        </Button>
      </div>
      <Table use={roomTable} />
    </div>
  )
}
