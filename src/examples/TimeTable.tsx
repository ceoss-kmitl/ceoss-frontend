import { TimeTable } from 'components/TimeTable'

interface Day {
  subjectList: Subject[]
  overlapSubjectList: Subject[][]
}

interface Subject {
  id: string
  code: string
  name: string
  section: number
  startSlot: number
  endSlot: number
  type: 'LECTURE' | 'LAB' | 'EDITING'
}

const data: Day[] = [
  {
    subjectList: [
      {
        id: '124',
        code: '01076001',
        name: 'INTRODUCTION TO COMPUTER ENGINEERING',
        section: 1,
        startSlot: 7,
        endSlot: 19,
        type: 'LECTURE',
      },
    ],
    overlapSubjectList: [],
  },
  {
    subjectList: [
      {
        id: '123',
        code: '01076001',
        name: 'INTRODUCTION TO COMPUTER ENGINEERING',
        section: 1,
        startSlot: 15,
        endSlot: 27,
        type: 'LAB',
      },
    ],
    overlapSubjectList: [],
  },
  {
    subjectList: [],
    overlapSubjectList: [],
  },
  {
    subjectList: [],
    overlapSubjectList: [],
  },
  {
    subjectList: [],
    overlapSubjectList: [],
  },
  {
    subjectList: [],
    overlapSubjectList: [],
  },
  {
    subjectList: [],
    overlapSubjectList: [],
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
