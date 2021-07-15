import { TimeTable } from 'components/TimeTable'

interface Day {
  subjectList: Subject[]
  overlapSubjectList: Subject[][]
}

interface Subject {
  id: string
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
        name: 'test',
        section: 203,
        startSlot: 7,
        endSlot: 19,
        type: 'LECTURE',
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
        minWidth: '1024px',
        margin: '2rem auto',
        padding: '2rem',
      }}
    >
      <TimeTable data={data} />
    </main>
  )
}
