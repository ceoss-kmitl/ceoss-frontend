import { IDay, ISlot } from 'types/TimeTable'

export const timeSlot = generateTimeSlot(8, 20)
export const dayInWeek = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา']

/**
 * Input 7 days data from backend and this hooks
 * will return 7 days data that ready to render
 */
export function useTimeTable(dayList: IDay[]) {
  const tableSlot = []
  const MAX_SLOT = 52 // 13 hours x 4 slot each hours (08:00 - 20:00)

  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const { subjectList } = dayList[dayIndex]
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
        const slotSpan = currentSubject.endSlot - prevFirstSubject.startSlot + 1
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
      const currentSubject = data.subjectList[i] || {}
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
  return subjectSlot
}

function generateTimeSlot(start: number, end: number) {
  const slots = []
  for (let i = start; i <= end; i++) {
    const time = `${String(i).padStart(2, '0')}:00`
    slots.push(time)
  }
  return slots
}
