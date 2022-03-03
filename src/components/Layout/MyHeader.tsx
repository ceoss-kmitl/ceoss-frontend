import { FiBox, FiLogOut } from 'react-icons/fi'
import { Tooltip, Button, Select } from 'antd'

import { useAuth } from 'contexts/AuthContext'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { CEOSS_LOGOUT_BTN } from 'constants/common'

import { useSelectAcademicYear } from './helper'
import style from './MyHeader.module.scss'

export const MyHeader = () => {
  const { academicYearOptionList, currentAcademicYear } =
    useSelectAcademicYear()

  const { changeAcademicYear } = useAcademicYear()
  const { profile, signOutGoogle } = useAuth()

  return (
    <>
      <div className={style.logo}>
        <FiBox style={{ marginRight: '0.5rem', strokeWidth: '2.5px' }} />
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

      {profile && (
        <>
          <Tooltip title={profile.email} placement="bottomRight">
            <img src={profile.imageUrl} className={style.profileImg} />
          </Tooltip>

          <Tooltip
            title="ออกจากระบบ"
            placement="bottomRight"
            arrowPointAtCenter
          >
            <Button
              id={CEOSS_LOGOUT_BTN}
              shape="circle"
              type="text"
              danger
              icon={<FiLogOut size={18} />}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => signOutGoogle()}
            />
          </Tooltip>
        </>
      )}
    </>
  )
}
