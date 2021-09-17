import style from './MyHeader.module.scss'
import { FiBox, FiLogOut } from 'react-icons/fi'
import { Tooltip, Button } from 'antd'
import { getCurrentAcademicYear } from 'libs/datetime'

const { academicYear, semester } = getCurrentAcademicYear()

export const MyHeader = () => {
  return (
    <>
      <div className={style.logo}>
        <FiBox style={{ marginRight: '0.5rem' }} />
        <span>CE</span>
        <span>OSS</span>
      </div>

      <div className={style.headerText}>
        คณะวิศวกรรมศาสตร์ สาขาวิชาวิศวกรรมคอมพิวเตอร์ ภาคเรียนที่ {semester}{' '}
        ปีการศึกษา {academicYear}
      </div>

      <Tooltip
        title="ออกจากระบบ"
        placement="bottomRight"
        arrowPointAtCenter
        color="#1F2937"
      >
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
