export const timeSlot = generateTimeSlot(8, 20)
export const dayInWeek = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา']

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

export enum DEGREE {
  Bachelor = 'BACHELOR',
  BachelorCon = 'BACHELOR_CONTINUE',
  BachelorInter = 'BACHELOR_INTER',
  Pundit = 'PUNDIT',
  PunditInter = 'PUNDIT_INTER',
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
  workloadId: string
}

export interface ISlot {
  slotSpan: number
  startSlot: number
  endSlot: number
  subjectList: ISubject[]
}

/**
 * Input 7 days data from backend and this hooks
 * will return 7 days data that ready to render
 */
export function useTimeTable(dayList: IDay[]) {
  const tableSlot = []
  const MAX_SLOT = 52 // 13 hours x 4 slot each hours (08:00 - 20:00)
  const sortedDayList = sortBySubjectStartTime(dayList)

  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const { subjectList } = sortedDayList[dayIndex]
    const daySlot: (ISlot | null)[] = []
    let subjectIndex = 0
    let curSlot = 1

    while (curSlot <= MAX_SLOT) {
      const currentSubject = subjectList[subjectIndex] || { startSlot: 99 }

      // Case #1: Has subject
      if (currentSubject.startSlot === curSlot) {
        const slotSpan = currentSubject.endSlot - currentSubject.startSlot + 1
        const newEndSlot = curSlot + slotSpan
        daySlot.push({
          slotSpan,
          startSlot: curSlot,
          endSlot: newEndSlot - 1,
          subjectList: [currentSubject],
        })
        curSlot = newEndSlot
        subjectIndex += 1
      }
      // Case #2: Has subject BUT overlap time
      else if (currentSubject.startSlot < curSlot) {
        const prevDaySlot = daySlot.pop()!
        const prevFirstSubject = prevDaySlot.subjectList[0]
        const slotSpan = Math.max(
          currentSubject.endSlot - prevFirstSubject.startSlot + 1,
          prevDaySlot.slotSpan
        )
        const newEndSlot = Math.max(currentSubject.endSlot + 1, curSlot)
        daySlot.push({
          slotSpan,
          startSlot: prevDaySlot.startSlot,
          endSlot: newEndSlot - 1,
          subjectList: [...prevDaySlot.subjectList, currentSubject],
        })
        curSlot = newEndSlot
        subjectIndex += 1
      }
      // Case #3: No subject
      else {
        curSlot += 1
        daySlot.push(null)
      }
    }
    tableSlot.push(daySlot)
  }
  return tableSlot
}

/**
 * Input subject slot data and this hooks
 * will data that ready to render
 */
export function useSubjectSlot(data: ISlot) {
  const subjectSlot = []
  const MAX_SLOT = data.slotSpan

  for (let i = 0, length = data.subjectList.length; i < length; i++) {
    const slot = []
    let curSlot = 1

    while (curSlot <= MAX_SLOT) {
      const currentSubject = data.subjectList[i]
      const relativeStartSlot = currentSubject.startSlot - data.startSlot + 1
      const relativeEndSlot = currentSubject.endSlot - data.startSlot + 1

      // Case #1: Has subject
      if (relativeStartSlot === curSlot) {
        const slotSpan = relativeEndSlot - relativeStartSlot + 1
        const newEndSlot = curSlot + slotSpan
        slot.push({
          slotSpan,
          subject: currentSubject,
        })
        curSlot = newEndSlot
      }
      // Case #2: No subject
      else {
        slot.push(null)
        curSlot += 1
      }
    }
    subjectSlot.push(slot)
  }
  return {
    subjectSlotList: subjectSlot,
    slotHeight: `${((100 / data.subjectList.length) * 60) / 100}px`,
  }
}

// ------------------
// Utilities function
// ------------------

function generateTimeSlot(start: number, end: number) {
  const slots = []
  for (let i = start; i <= end; i++) {
    const time = `${String(i).padStart(2, '0')}:00`
    slots.push(time)
  }
  return slots
}

function sortBySubjectStartTime(dayList: IDay[]) {
  return dayList.map((day) => ({
    ...day,
    subjectList: [...day.subjectList].sort((a, b) => a.startSlot - b.startSlot),
  }))
}
