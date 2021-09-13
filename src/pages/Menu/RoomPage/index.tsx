import { VscAdd } from 'react-icons/vsc'

import { Table, useTable } from 'components/Table'
import { Button } from 'components/Button'
import { Text } from 'components/Text'

import style from './style.module.scss'
import { useMenuRoom, columnList, formLayout } from './helper'

export const MenuRoomPage = () => {
  const { isLoading, data, addRoom, editRoom, deleteRoom } = useMenuRoom()

  const roomTable = useTable({
    loading: isLoading,
    data,
    columnList,
    formLayout,
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
        <Button onClick={() => roomTable.addRecord()}>
          <VscAdd className={style.iconAdd} />
          เพิ่มห้องเรียน
        </Button>
      </div>
      <Table use={roomTable} />
    </div>
  )
}
