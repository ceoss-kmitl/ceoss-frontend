// Types
export interface Day {
  subjectList: Subject[]
  overlapSubjectList: Subject[][]
}

export interface Subject {
  id: string
  code: string
  name: string
  section: number
  startSlot: number
  endSlot: number
  type: 'LECTURE' | 'LAB' | 'EDITING'
}

export interface Column extends Partial<Subject> {
  colSpan: number
}

// Constants
export const timeSlot = generateTimeSlot(8, 20)
export const dayInWeek = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา']

// Functions
export function createColumnList(subjectList: Subject[]) {
  const MAX_SPAN = 52
  let span = 1
  const columnList: (Column | null)[] = []
  while (span <= MAX_SPAN) {
    const subject = subjectList.find((s) => s.startSlot === span)

    if (subject) {
      const spanRange = subject.endSlot - subject.startSlot
      columnList.push({
        ...subject,
        colSpan: spanRange,
      })
      span += spanRange
    } else {
      columnList.push(null)
      span += 1
    }
  }
  return columnList
}

// Private functions
function generateTimeSlot(start: number, end: number) {
  const slots = []
  for (let i = start; i <= end; i++) {
    const time = `${String(i).padStart(2, '0')}:00`
    slots.push(time)
  }
  return slots
}
