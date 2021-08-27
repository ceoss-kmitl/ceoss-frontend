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
