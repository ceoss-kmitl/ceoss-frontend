import dayjs from 'dayjs'

import { DayOfWeek, Degree, DocumentPattern, WorkloadType } from './common'

export interface IOption {
  label: string
  value: string | number
}

export const OptionList = {
  /** Workload type */
  workloadType: [
    {
      label: 'ทฤษฎี',
      value: WorkloadType.LECTURE,
    },
    {
      label: 'ปฏิบัติ',
      value: WorkloadType.LAB,
    },
  ],
  /** Degree */
  degree: [
    {
      label: 'ปริญญาตรี ทั่วไป',
      value: Degree.BACHELOR,
    },
    {
      label: 'ปริญญาตรี ต่อเนื่อง',
      value: Degree.BACHELOR_CONTINUE,
    },
    {
      label: 'ปริญญาตรี นานาชาติ',
      value: Degree.BACHELOR_INTER,
    },
    {
      label: 'บัณฑิต ทั่วไป',
      value: Degree.PUNDIT,
    },
    {
      label: 'บัณฑิต นานาชาติ',
      value: Degree.PUNDIT_INTER,
    },
  ],
  /** Class year */
  classYear: [
    {
      label: 'ปี 1',
      value: 1,
    },
    {
      label: 'ปี 2',
      value: 2,
    },
    {
      label: 'ปี 3',
      value: 3,
    },
    {
      label: 'ปี 4',
      value: 4,
    },
  ],
  /** Day of week */
  dayOfWeek: [
    {
      label: 'จันทร์',
      value: DayOfWeek.MONDAY,
    },
    {
      label: 'อังคาร',
      value: DayOfWeek.TUESDAY,
    },
    {
      label: 'พุธ',
      value: DayOfWeek.WEDNESDAY,
    },
    {
      label: 'พฤหัสบดี',
      value: DayOfWeek.THURSDAY,
    },
    {
      label: 'ศุกร์',
      value: DayOfWeek.FRIDAY,
    },
    {
      label: 'เสาร์',
      value: DayOfWeek.SATURDAY,
    },
    {
      label: 'อาทิตย์',
      value: DayOfWeek.SUNDAY,
    },
  ],
  /** Full thai month name */
  month: Array(12)
    .fill('')
    .map((_, index) => {
      const thatDay = dayjs().month(index)
      return {
        label: thatDay.toDate().toLocaleDateString('th-TH', { month: 'long' }),
        value: thatDay.month(),
      }
    }),
  /** Document pattern */
  documentPattern: [
    {
      label: 'Online',
      value: DocumentPattern.ONLINE,
    },
    {
      label: 'On-site',
      value: DocumentPattern.ONSITE,
    },
  ],
}
