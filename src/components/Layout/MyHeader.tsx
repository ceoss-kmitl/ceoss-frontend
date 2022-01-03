import { FiBox, FiLogOut } from 'react-icons/fi'
import { Tooltip, Button, Select } from 'antd'

import { useAcademicYear } from 'contexts/AcademicYearContext'

import { useSelectAcademicYear } from './helper'
import style from './MyHeader.module.scss'

export const MyHeader = () => {
  const { academicYearOptionList, currentAcademicYear } =
    useSelectAcademicYear()

  const { changeAcademicYear } = useAcademicYear()

  return (
    <>
      <div className={style.logo}>
        <FiBox style={{ marginRight: '0.5rem' }} />
        <span>CE</span>
        <span>OSS</span>
      </div>

      <div className={style.headerText}>
        คณะวิศวกรรมศาสตร์ สาขาวิชาวิศวกรรมคอมพิวเตอร์
        <Select
          bordered={false}
          defaultValue={currentAcademicYear}
          options={academicYearOptionList}
          onChange={(value) => changeAcademicYear(value)}
        />
      </div>

      <Tooltip title="ออกจากระบบ" placement="bottomRight" arrowPointAtCenter>
        <Button
          shape="circle"
          type="text"
          danger
          icon={<FiLogOut size={18} />}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </Tooltip>
    </>
  )
}
