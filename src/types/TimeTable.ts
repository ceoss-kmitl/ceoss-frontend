export enum DAY_IN_WEEK {
  MONDAY = 1,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export interface IDay {
  dayInWeek: DAY_IN_WEEK
  subjectList: ISubject[]
}

export enum SUBJECT_TYPE {
  LECTURE = 'LECTURE',
  LAB = 'LAB',
}

export interface ISubject {
  id: string
  code: string
  name: string
  section: number
  startSlot: number
  endSlot: number
  type: SUBJECT_TYPE
  isEditing?: boolean
}

export interface ISlot {
  slotSpan: number
  startSlot: number
  endSlot: number
  subjectList: ISubject[]
}
