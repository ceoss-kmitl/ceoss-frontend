import css from 'classnames'
import { Divider } from 'antd'

import { Text } from 'components/Text'

import style from './CompensatedList.module.scss'

interface IProps {
  list: {
    section: number
    compensatedList: {
      compensatedId: string
      originalDate: string
      originalTimeList: { start: string; end: string }[]
      compensatedDate: string
      compensatedTimeList: { start: string; end: string }[]
      room: string
    }[]
  }[]
}

export const CompensatedList: React.FC<IProps> = ({ list }) => {
  return (
    <div className={css(style.wrapper, 'shadow')}>
      {!list.length ? (
        <Text>ไม่มีข้อมูลการสอนชดเชย</Text>
      ) : (
        list.map((li) => (
          <div className={style.sectionWrapper}>
            <Text size="sub-head" bold className={style.sectionHeader}>
              กลุ่มเรียน {li.section}
            </Text>
            {!li.compensatedList.length ? (
              <div className={css(style.item, style.itemNoData)}>
                <Text>- ไม่มีประวัติ -</Text>
              </div>
            ) : (
              li.compensatedList.map((cp) => (
                <div className={style.item}>
                  <Text>
                    {cp.compensatedDate} : ห้องเรียน {cp.room}
                  </Text>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  )
}
