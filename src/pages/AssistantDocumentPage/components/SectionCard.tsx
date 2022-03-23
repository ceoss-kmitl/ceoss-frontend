import css from 'classnames'
import { chain } from 'lodash'
import { Row, Divider, Button as AntdButton, Skeleton } from 'antd'
import { FiDownload, FiEdit } from 'react-icons/fi'

import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { ISection } from 'apis/subject'
import { DayOfWeekName } from 'constants/common'
import { useAcademicYear } from 'contexts/AcademicYearContext'
import { getCurrentAcademicYear } from 'libs/datetime'

import style from './SectionCard.module.scss'

interface IProps {
  data: ISection | null
  onEditClick?: (value: ISection) => void
  onDownloadClick?: (value: ISection) => void
}

export const SectionCard: React.FC<IProps> = ({
  data,
  onEditClick = () => {},
  onDownloadClick = () => {},
}) => {
  const { academicYear, semester } = useAcademicYear()

  const groupDateByMonth = (dateList: string[]) => {
    return chain(dateList)
      .map((d) => new Date(d))
      .filter((d) => {
        const { academicYear: a, semester: s } = getCurrentAcademicYear(d)
        return a === academicYear && s === semester
      })
      .groupBy((d) => d.getMonth())
      .toPairs()
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([_, dayList]) => {
        const date = dayList
          .map((d) => new Date(d).getDate())
          .sort((a, b) => a - b)
          .join(', ')
        const monthYear = new Date(dayList[0]).toLocaleDateString('th-TH', {
          month: 'long',
          year: 'numeric',
        })
        return `${date} ${monthYear}`
      })
      .value()
  }

  if (!data)
    return (
      <div className={css(style.card, 'shadow')}>
        <Row justify="space-between">
          <Skeleton.Input active style={{ width: 140 }} size="small" />
          <Skeleton.Button style={{ width: 90 }} size="small" />
        </Row>
        <Divider style={{ margin: '1rem 0' }} />
        <Skeleton active title={false} paragraph={{ rows: 4 }} />
      </div>
    )

  const dateList = groupDateByMonth(data.dayList)

  return (
    <div className={css(style.card, 'shadow')}>
      <Row justify="space-between">
        <Text bold size="sub-head">
          กลุ่มเรียน {data.section}
        </Text>

        <Button small blue onClick={() => onDownloadClick(data)}>
          <FiDownload className={style.downloadIcon} />
          ตั้งค่าเอกสาร
        </Button>
      </Row>
      <Row style={{ marginTop: '0.5rem' }}>
        <Text size="small" gray>
          {`${
            DayOfWeekName[data.datetime.dayOfWeek]
          } ${data.datetime.timeList.join(', ')}`}
        </Text>
      </Row>

      <Divider style={{ margin: '1rem 0' }} />
      <Text size="small" bold>
        วันปฏิบัติงาน
      </Text>
      <div className={style.assistantList}>
        {dateList.length ? (
          dateList.map((day) => (
            <Text className={style.assistantName}>{day}</Text>
          ))
        ) : (
          <Text gray size="small">
            - ไม่มีข้อมูล -
          </Text>
        )}
      </div>

      <Text size="small" bold>
        รายชื่อ TA
      </Text>
      <div className={style.assistantList}>
        {data.assistantList.length ? (
          data.assistantList.map((assistant) => (
            <Text className={style.assistantName}>
              {assistant.id} {assistant.name}
            </Text>
          ))
        ) : (
          <Text gray size="small">
            - ไม่มีข้อมูล -
          </Text>
        )}
      </div>
      <AntdButton block type="dashed" onClick={() => onEditClick(data)}>
        <FiEdit className={style.editIcon} size={16} />
        แก้ไขรายชื่อ/เวลาปฏิบัติงาน
      </AntdButton>
    </div>
  )
}
