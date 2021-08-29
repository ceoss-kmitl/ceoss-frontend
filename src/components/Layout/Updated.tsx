import { Button, Divider } from 'antd'
import { FcSynchronize } from 'react-icons/fc'

import style from './Updated.module.scss'
import { useWebScrap } from './helper'

export const Updated = () => {
  const { date, triggerWebScrap } = useWebScrap()

  return (
    <>
      <Divider />
      <div className={style.wrapper}>
        <span className={style.title}>ข้อมูลตั้งแต่วันที่</span>
        <time className={style.time}>
          {date === null ? (
            <span className={style.text}>กำลังโหลด...</span>
          ) : date.length ? (
            <>
              {date}
              <Button
                shape="circle"
                type="text"
                icon={<FcSynchronize />}
                onClick={triggerWebScrap}
              />
            </>
          ) : (
            <span className={style.text}>เกิดข้อผิดพลาด</span>
          )}
        </time>
      </div>
    </>
  )
}
