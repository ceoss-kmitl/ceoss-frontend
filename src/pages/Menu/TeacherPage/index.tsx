import { VscAdd } from 'react-icons/vsc'

import { Table, useTable } from 'components/Table'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { UploadExcelFileButton } from 'components/UploadExcelFileButton'
import { TeacherExcelFileHeaders } from 'constants/excel'

import { useMenuTeacher, columnList, formLayout } from './helper'
import style from './style.module.scss'

export const MenuTeacherPage = () => {
  const {
    isLoading,
    data,
    addTeacher,
    editTeacher,
    deleteTeacher,
    importDataFromExcel,
  } = useMenuTeacher()

  const teacherTable = useTable({
    loading: isLoading,
    data,
    columnList,
    formLayout,
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

        <UploadExcelFileButton
          className={style.importButton}
          headers={TeacherExcelFileHeaders}
          onUpload={(data) => importDataFromExcel(data)}
        />
        <Button onClick={() => teacherTable.addRecord()}>
          <VscAdd className={style.iconAdd} />
          เพิ่มอาจารย์
        </Button>
      </div>
      <Table use={teacherTable} />
    </div>
  )
}
