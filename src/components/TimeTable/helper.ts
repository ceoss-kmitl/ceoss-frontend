export const timeSlot = generateTimeSlot(8, 20)
export const dayInWeek = ['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา']

/**
 * Functions zone
 */

function generateTimeSlot(start: number, end: number) {
  const slots = []
  for (let i = start; i <= end; i++) {
    const time = `${String(i).padStart(2, '0')}:00`
    slots.push(time)
  }
  return slots
}
