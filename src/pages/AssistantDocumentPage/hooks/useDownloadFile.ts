import { useState } from 'react'
import { Form } from 'antd'
import { get } from 'lodash'

import { saveFile } from 'libs/utils'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { Notification } from 'components/Notification'
import { ErrorCode } from 'constants/error'
import { IOption } from 'constants/option'
import { downloadOneAssistantExcelFile, ISection } from 'apis/subject'
import { delay } from 'libs/delay'

const MESSAGE_KEY = 'ASSISTANT_SYSTEM'

export const useDownloadFile = () => {
  const { academicYear, semester } = useAcademicYear()
  const [isDownloading, setIsDownloading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [teacherList, setTeacherList] = useState<IOption[]>([])
  const [section, setSection] = useState(0)
  const [form] = Form.useForm()

  const downloadExcel = async (
    subjectId?: string,
    onSuccess: () => void = () => {}
  ) => {
    if (!subjectId || !section) return

    Notification.loading({
      key: MESSAGE_KEY,
      message: 'กำลังดาวน์โหลด...',
    })
    setIsDownloading(true)
    // await delay(2)
    try {
      const formValue = form.getFieldsValue()
      const file = await downloadOneAssistantExcelFile(subjectId, section, {
        ...formValue,
        academicYear,
        semester,
        documentDate: formValue.documentDate.toISOString(),
        approvalDate: formValue.approvalDate.toISOString(),
      })
      saveFile(file)
      Notification.success({
        key: MESSAGE_KEY,
        message: 'ดาวน์โหลดสำเร็จ',
      })
      onSuccess()
    } catch (error) {
      Notification.error({
        key: MESSAGE_KEY,
        message: ErrorCode.A03,
        seeMore: error,
      })
    }
    setIsDownloading(false)
  }

  const openDrawer = (value: ISection) => {
    setIsOpen(true)
    form.setFieldsValue({
      teacherId: get(value, 'teacherList[0].id'),
    })
    setSection(value.section)
    setTeacherList(
      value.teacherList.map((t) => ({
        label: t.name,
        value: t.id,
      }))
    )
  }

  const closeDrawer = () => {
    form.resetFields()
    setIsOpen(false)
    setSection(0)
    setTeacherList([])
  }

  return {
    downloaderForm: form,
    isDownloaderOpen: isOpen,
    openDownloaderDrawer: openDrawer,
    closeDownloaderDrawer: closeDrawer,
    isDownloading,
    downloadExcel,
    teacherList,
  }
}
