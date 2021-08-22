import { useState } from 'react'
import {
  IDay,
  DAY_IN_WEEK,
  SUBJECT_TYPE,
  TimeTable,
} from 'components/TimeTable'

export const DemoTimeTable = () => {
  const [data, setData] = useState(MOCK_DATA)

  return (
    <main
      style={{
        width: '100%',
        margin: '2rem auto',
        padding: '2rem',
      }}
    >
      <TimeTable
        data={data}
        onOverlapSubjectClick={(subject) => {
          setData(
            data.map((d) => {
              return {
                ...d,
                subjectList: d.subjectList.filter((s) => s.id !== subject.id),
              }
            })
          )
        }}
      />
    </main>
  )
}

const MOCK_DATA: IDay[] = [
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
        workloadId: 'AA',
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
        id: 'W-2',
        code: '01296065',
        name: 'PROGRAMMING FUNDAMENTAL',
        section: 1,
        startSlot: 10,
        endSlot: 22,
        type: SUBJECT_TYPE.LECTURE,
        workloadId: 'AB',
      },
      {
        id: 'W-1',
        code: '01125001',
        name: 'COMPUTER PROGRAMMING',
        section: 43,
        startSlot: 7,
        endSlot: 19,
        type: SUBJECT_TYPE.LAB,
        workloadId: 'AC',
      },

      {
        id: 'W-3',
        code: '01296065',
        name: 'PROGRAMMING FUNDAMENTAL',
        section: 101,
        startSlot: 26,
        endSlot: 36,
        type: SUBJECT_TYPE.LAB,
        workloadId: 'AD',
      },
      {
        id: 'W-21',
        code: '01296065',
        name: 'PROGRAMMING FUNDAMENTAL',
        section: 1,
        startSlot: 1,
        endSlot: 6,
        type: SUBJECT_TYPE.LECTURE,
        workloadId: 'BE',
      },
    ],
  },
  {
    dayInWeek: DAY_IN_WEEK.THURSDAY,
    subjectList: [
      {
        id: 'THUR-1',
        code: '07035001',
        name: 'MIRACLE SUBJECT',
        section: 224236,
        startSlot: 36,
        endSlot: 48,
        type: SUBJECT_TYPE.LAB,
        isEditing: true, // This will be yellow color!
        workloadId: 'SC',
      },
    ],
  },
  {
    dayInWeek: DAY_IN_WEEK.FRIDAY,
    subjectList: [],
  },
  {
    dayInWeek: DAY_IN_WEEK.SATURDAY,
    subjectList: Array(4)
      .fill({
        code: '01125001',
        name: 'COMPUTER PROGRAMMING',
        section: 43,
        startSlot: 7,
        endSlot: 19,
        type: SUBJECT_TYPE.LAB,
      })
      .map((d, i) => ({ ...d, id: `SAT-${i}` })),
  },
  {
    dayInWeek: DAY_IN_WEEK.SUNDAY,
    subjectList: [],
  },
]
