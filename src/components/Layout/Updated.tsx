import { Button, Divider, Skeleton, Tooltip } from 'antd'
import { FcSynchronize } from 'react-icons/fc'

import style from './Updated.module.scss'
import { useWebScrap } from './helper'

export const Updated = () => {
  const { isLoading, date, triggerWebScrap } = useWebScrap()

  return (
    <>
      <Divider />
      <div className={style.wrapper}>
        {!isLoading && <div className={style.title}>ข้อมูลตั้งแต่วันที่</div>}
        <time className={style.time}>
          <Skeleton
            loading={isLoading}
            active
            paragraph={{ rows: 1, width: '80%' }}
          >
            {date}
          </Skeleton>

          {!isLoading && (
            <Tooltip title="อัปเดตข้อมูล">
              <Button
                className={style.updateBtn}
                shape="circle"
                type="text"
                icon={<FcSynchronize />}
                onClick={triggerWebScrap}
              />
            </Tooltip>
          )}
        </time>
      </div>
    </>
  )
}
