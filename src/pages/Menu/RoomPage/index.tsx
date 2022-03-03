import { VscAdd } from 'react-icons/vsc'

import { Table, useTable } from 'components/Table'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { UploadExcelFileButton } from 'components/UploadExcelFileButton'
import { RoomExcelFileHeaders } from 'constants/excel'

import { useMenuRoom, columnList, formLayout } from './helper'
import style from './style.module.scss'

export const MenuRoomPage = () => {
  const {
    isLoading,
    data,
    addRoom,
    editRoom,
    deleteRoom,
    importDataFromExcel,
  } = useMenuRoom()

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
          {`ข้อมูลห้องเรียน (${data.length})`}
        </Text>

        <UploadExcelFileButton
          className={style.importButton}
          headers={RoomExcelFileHeaders}
          onUpload={(data) => importDataFromExcel(data)}
        />
        <Button onClick={() => roomTable.addRecord()}>
          <VscAdd className={style.iconAdd} />
          เพิ่มห้องเรียน
        </Button>
      </div>
      <Table use={roomTable} />
    </div>
  )
}
