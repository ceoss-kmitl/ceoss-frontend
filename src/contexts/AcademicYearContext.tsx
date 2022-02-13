import { createContext, useContext, useState, useEffect } from 'react'

import { getCurrentAcademicYear } from 'libs/datetime'

interface IAcademicYearContext {
  academicYear: number
  semester: number
  changeAcademicYear: (academicYearAndSemester: string) => void
}

const AcademicYearContext = createContext<IAcademicYearContext>({
  academicYear: 0,
  semester: 0,
  changeAcademicYear: () => {},
})

export const AcademicYearProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({ academicYear: 0, semester: 0 })

  useEffect(() => {
    const { academicYear, semester } = getCurrentAcademicYear()
    setData({ academicYear, semester })
  }, [])

  const changeAcademicYear = (academicYearAndSemester: string) => {
    const [a, s] = academicYearAndSemester.split('/')
    setData({
      academicYear: Number(a),
      semester: Number(s),
    })
  }

  return (
    <AcademicYearContext.Provider
      value={{
        academicYear: data.academicYear,
        semester: data.semester,
        changeAcademicYear,
      }}
    >
      {children}
    </AcademicYearContext.Provider>
  )
}

export const useAcademicYear = () => useContext(AcademicYearContext)
