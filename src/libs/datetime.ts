import dayjs from 'dayjs'

export function getCurrentAcademicYear() {
  const [day, month, year] = new Date()
    .toLocaleDateString('th-TH')
    .split('/')
    .map((each) => Number(each))

  const hasStartNewAcademicYear = day >= 1 && month >= 8
  const academicYear = hasStartNewAcademicYear ? year : year - 1
  const semester = hasStartNewAcademicYear ? 1 : 2

  return { academicYear, semester }
}

/**
 * Convert plain time to dayjs time
 * @param time ex. 10:30, 12:45
 */
export function toDayjsTime(time?: string) {
  if (!time) return dayjs()

  const [hr, min] = time.split(':').map((t) => Number(t))
  return dayjs().set('hours', hr).set('minutes', min)
}
