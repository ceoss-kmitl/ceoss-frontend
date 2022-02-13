export enum FormMode {
  CREATE = 'FORM_MODE_CREATE',
  EDIT = 'FORM_MODE_EDIT',
}

export enum DayOfWeek {
  MONDAY = 0,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export const DayOfWeekName = <const>{
  [DayOfWeek.MONDAY]: 'วันจันทร์',
  [DayOfWeek.TUESDAY]: 'วันอังคาร',
  [DayOfWeek.WEDNESDAY]: 'วันพุธ',
  [DayOfWeek.THURSDAY]: 'วันพฤหัสบดี',
  [DayOfWeek.FRIDAY]: 'วันศุกร์',
  [DayOfWeek.SATURDAY]: 'วันเสาร์',
  [DayOfWeek.SUNDAY]: 'วันอาทิตย์',
}

export enum Degree {
  BACHELOR = 'BACHELOR',
  BACHELOR_CONTINUE = 'BACHELOR_CONTINUE',
  BACHELOR_INTER = 'BACHELOR_INTER',
  PUNDIT = 'PUNDIT',
  PUNDIT_INTER = 'PUNDIT_INTER',
}

export enum WorkloadType {
  LECTURE = 'LECTURE',
  LAB = 'LAB',
}

export interface IAcademicTime {
  academicYear: number
  semester: number
}

export enum DocumentPattern {
  ONSITE = 'ONSITE',
  ONLINE = 'ONLINE',
}
