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
          {date}
          <Button
            shape="circle"
            type="text"
            icon={<FcSynchronize />}
            onClick={triggerWebScrap}
          />
        </time>
      </div>
    </>
  )
}
