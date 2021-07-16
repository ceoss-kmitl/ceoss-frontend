import { TimeTable } from 'components/TimeTable'
import { IDay, DAY_IN_WEEK, SUBJECT_TYPE } from 'types/TimeTable'

const data: IDay[] = [
  {
    dayInWeek: DAY_IN_WEEK.MONDAY,
    subjectList: [
      {
        id: 'M-1',
        code: '01076001',
        name: 'INTRODUCTION TO COMPUTER ENGINEERING',
        section: 1,
        startSlot: 1,
        endSlot: 12,
        type: SUBJECT_TYPE.LECTURE,
      },
    ],
  },
  {
    dayInWeek: DAY_IN_WEEK.TUESDAY,
    subjectList: [],
  },
  {
    dayInWeek: DAY_IN_WEEK.WEDNESDAY,
    subjectList: [
      {
        id: 'W-1',
        code: '01125001',
        name: 'COMPUTER PROGRAMMING',
        section: 43,
        startSlot: 7,
        endSlot: 19,
        type: SUBJECT_TYPE.LAB,
      },
      {
        id: 'W-2',
        code: '01296065',
        name: 'PROGRAMMING FUNDAMENTAL',
        section: 1,
        startSlot: 10,
        endSlot: 22,
        type: SUBJECT_TYPE.LECTURE,
      },
    ],
  },
  {
    dayInWeek: DAY_IN_WEEK.THURSDAY,
    subjectList: [],
  },
  {
    dayInWeek: DAY_IN_WEEK.FRIDAY,
    subjectList: [],
  },
  {
    dayInWeek: DAY_IN_WEEK.SATURDAY,
    subjectList: [],
  },
  {
    dayInWeek: DAY_IN_WEEK.SUNDAY,
    subjectList: [],
  },
]

export const DemoTimeTable = () => {
  return (
    <main
      style={{
        width: '100%',
        margin: '2rem auto',
        padding: '2rem',
      }}
    >
      <TimeTable data={data} />
    </main>
  )
}
