import { DAY_OF_WEEK, DEGREE, SUBJECT_TYPE } from './enum'

/**
 * Option for `<Select />` component
 */
export interface ISelectOption {
  label: string
  value: string | number
}

export const typeOptionList: ISelectOption[] = [
  {
    label: 'ทฤษฎี',
    value: SUBJECT_TYPE.LECTURE,
  },
  {
    label: 'ปฏิบัติ',
    value: SUBJECT_TYPE.LAB,
  },
]

export const degreeOptionList: ISelectOption[] = [
  {
    label: 'ปริญญาตรี ทั่วไป',
    value: DEGREE.Bachelor,
  },
  {
    label: 'ปริญญาตรี ต่อเนื่อง',
    value: DEGREE.BachelorCon,
  },
  {
    label: 'ปริญญาตรี นานาชาติ',
    value: DEGREE.BachelorInter,
  },
  {
    label: 'บัณฑิต ทั่วไป',
    value: DEGREE.Pundit,
  },
  {
    label: 'บัณฑิต นานาชาติ',
    value: DEGREE.PunditInter,
  },
]

export const dayOfWeekOptionList: ISelectOption[] = [
  {
    label: 'จันทร์',
    value: DAY_OF_WEEK.MONDAY,
  },
  {
    label: 'อังคาร',
    value: DAY_OF_WEEK.TUESDAY,
  },
  {
    label: 'พุธ',
    value: DAY_OF_WEEK.WEDNESDAY,
  },
  {
    label: 'พฤหัสบดี',
    value: DAY_OF_WEEK.THURSDAY,
  },
  {
    label: 'ศุกร์',
    value: DAY_OF_WEEK.FRIDAY,
  },
  {
    label: 'เสาร์',
    value: DAY_OF_WEEK.SATURDAY,
  },
  {
    label: 'อาทิตย์',
    value: DAY_OF_WEEK.SUNDAY,
  },
]
