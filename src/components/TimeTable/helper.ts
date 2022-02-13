import {
  IRawWorkloadOfTeacherWithDayjs,
  IWorkloadOfTeacherWithDayjs,
} from 'apis/teacher'

export interface ISlot {
  slotSpan: number
  startSlot: number
  endSlot: number
  workloadList: IRawWorkloadOfTeacherWithDayjs[]
}

export const timeSlot = generateTimeSlot(8, 20)

export const shortDayOfWeek = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา']

/**
 * Input 7 days data from backend and this hooks
 * will return 7 days data that ready to render
 */
export function useTimeSlot(dayList: IWorkloadOfTeacherWithDayjs[]) {
  const tableSlot = []
  const MAX_SLOT = 52 // 13 hours x 4 slot each hours (08:00 - 20:00)
  const sortedDayList = sortWorkloadStartTime(dayList)

  for (const day of sortedDayList) {
    const { workloadList } = day
    const daySlot: (ISlot | null)[] = []
    let workloadIndex = 0
    let currentSlot = 1

    while (currentSlot <= MAX_SLOT) {
      const currentWorkload = workloadList[workloadIndex] || { startSlot: 99 }

      // Case #1: Has workload
      if (currentWorkload.startSlot === currentSlot) {
        const slotSpan = currentWorkload.endSlot - currentWorkload.startSlot + 1
        const newEndSlot = currentSlot + slotSpan
        daySlot.push({
          slotSpan,
          startSlot: currentSlot,
          endSlot: newEndSlot - 1,
          workloadList: [currentWorkload],
        })
        currentSlot = newEndSlot
        workloadIndex += 1
      }
      // Case #2: Has workload BUT overlap time
      else if (currentWorkload.startSlot < currentSlot) {
        const prevDaySlot = daySlot.pop()!
        const prevFirstSubject = prevDaySlot.workloadList[0]
        const slotSpan = Math.max(
          currentWorkload.endSlot - prevFirstSubject.startSlot + 1,
          prevDaySlot.slotSpan
        )
        const newEndSlot = Math.max(currentWorkload.endSlot + 1, currentSlot)
        daySlot.push({
          slotSpan,
          startSlot: prevDaySlot.startSlot,
          endSlot: newEndSlot - 1,
          workloadList: [...prevDaySlot.workloadList, currentWorkload],
        })
        currentSlot = newEndSlot
        workloadIndex += 1
      }
      // Case #3: No workload
      else {
        currentSlot += 1
        daySlot.push(null)
      }
    }
    tableSlot.push(daySlot)
  }
  return tableSlot
}

/**
 * Convert data to view-model (Ready for render)
 */
export function useWorkloadSlot(data: ISlot) {
  interface IWorkloadSpan {
    slotSpan: number
    workload: IRawWorkloadOfTeacherWithDayjs
  }
  const workloadSlot: (IWorkloadSpan | null)[][] = []
  const MAX_SLOT = data.slotSpan

  for (let i = 0; i < data.workloadList.length; i++) {
    const slot: (IWorkloadSpan | null)[] = []
    let currentSlot = 1

    while (currentSlot <= MAX_SLOT) {
      const currentWorkload = data.workloadList[i]
      const relativeStartSlot = currentWorkload.startSlot - data.startSlot + 1
      const relativeEndSlot = currentWorkload.endSlot - data.startSlot + 1

      // Case #1: Has subject
      if (relativeStartSlot === currentSlot) {
        const slotSpan = relativeEndSlot - relativeStartSlot + 1
        const newEndSlot = currentSlot + slotSpan
        slot.push({
          slotSpan,
          workload: currentWorkload,
        })
        currentSlot = newEndSlot
      }
      // Case #2: No subject
      else {
        slot.push(null)
        currentSlot += 1
      }
    }
    workloadSlot.push(slot)
  }
  return {
    workloadSlotList: workloadSlot,
    slotHeight: `${((100 / data.workloadList.length) * 60) / 100}px`,
  }
}

/**
 * Custom hooks to use with <TimeTable />
 */

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

function sortWorkloadStartTime(
  dayList: IWorkloadOfTeacherWithDayjs[]
): IWorkloadOfTeacherWithDayjs[] {
  return dayList.map((day) => ({
    ...day,
    workloadList: [...day.workloadList].sort(
      (a, b) => a.startSlot - b.startSlot
    ),
  }))
}
