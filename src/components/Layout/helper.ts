import { IconType } from 'react-icons/lib'
import { FiCalendar, FiMonitor, FiBook, FiFileText } from 'react-icons/fi'

interface IPath {
  path: string
  text: string
  Icon?: IconType
}

export const pathList: IPath[] = [
  {
    path: '/workload',
    text: 'จัดการภาระงาน',
    Icon: FiCalendar,
  },
  {
    path: '/automatic-room',
    text: 'จัดห้องอัตโนมัติ',
    Icon: FiMonitor,
  },
  {
    path: '/compensation-book',
    text: 'หนังสือสอนชดเชย',
    Icon: FiBook,
  },
  {
    path: '/assistant-document',
    text: 'เอกสาร TA',
    Icon: FiFileText,
  },
]

export const subPathList: IPath[] = [
  {
    path: '/menu/teacher',
    text: 'ข้อมูลอาจารย์',
  },
  {
    path: '/menu/subject',
    text: 'ข้อมูลวิชา',
  },
  {
    path: '/menu/assistant',
    text: 'ข้อมูล TA',
  },
  {
    path: '/menu/room',
    text: 'ข้อมูลห้องเรียน',
  },
  {
    path: '/menu/setting',
    text: 'การตั้งค่า',
  },
]
