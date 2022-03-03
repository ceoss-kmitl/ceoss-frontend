import { VscAdd } from 'react-icons/vsc'

import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { Table, useTable } from 'components/Table'
import { UploadExcelFileButton } from 'components/UploadExcelFileButton'
import { SubjectExcelFileHeaders } from 'constants/excel'

import { useMenuSubject, columnList, formLayout } from './helper'
import style from './style.module.scss'

export const MenuSubjectPage = () => {
  const {
    isLoading,
    data,
    addSubject,
    editSubject,
    deleteSubject,
    importDataFromExcel,
  } = useMenuSubject()

  const subjectTable = useTable({
    loading: isLoading,
    data,
    columnList,
    formLayout,
    onAdd: addSubject,
    onEdit: editSubject,
    onDelete: deleteSubject,
  })

  return (
    <div className={style.page}>
      <div className={style.topTable}>
        <Text size="head" bold>
          {`ข้อมูลวิชา (${data.length})`}
        </Text>

        <UploadExcelFileButton
          className={style.importButton}
          headers={SubjectExcelFileHeaders}
          onUpload={(data) => importDataFromExcel(data)}
        />
        <Button onClick={() => subjectTable.addRecord()}>
          <VscAdd className={style.iconAdd} />
          เพิ่มวิชา
        </Button>
      </div>
      <Table use={subjectTable} />
    </div>
  )
}
