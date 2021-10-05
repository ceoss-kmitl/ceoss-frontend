import css from 'classnames'
import { Drawer, Collapse, Card, Row, Col, Form } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { FiX, FiDownload } from 'react-icons/fi'

import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { Calendar } from 'components/DatePicker'
import { Checkbox } from 'components/Checkbox'

import style from './ExternalTeacherDrawer.module.scss'
import { useDocumentDetail } from './ExternalTeacherDrawerHelper'
import { Select } from 'components/Select'

interface IProps {
  isDrawerVisible?: boolean
  onClose?: () => void
  workload: any[]
}

export const ExternalTeacherDrawer: React.FC<IProps> = ({
  isDrawerVisible,
  onClose,
  workload,
}) => {
  const {
    detail,
    isDaySelected,
    addDay,
    removeDay,
    resetDetail,
    currentDate,
    month,
    setMonth,
    monthOptionList,
  } = useDocumentDetail(workload)

  return (
    <Drawer
      width={560}
      visible={isDrawerVisible}
      onClose={() => {
        onClose?.()
        resetDetail()
      }}
      maskClosable={true}
      closable={false}
      keyboard={false}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: false,
          })}
        >
          <FiX className={style.closeIcon} onClick={onClose} />
          <Text size="sub-head" bold className={style.title}>
            รายละเอียดเอกสาร
          </Text>
          <Button small onClick={undefined} disabled={false}>
            <FiDownload className={style.submitIcon} />
            ดาวน์โหลด
          </Button>
        </div>
      }
    >
      <Text bold>เลือกเดือนที่จะทำรายการ</Text>
      <Select
        value={month}
        onChange={(value) => setMonth(value)}
        options={monthOptionList}
      />

      <Text bold>รายชื่อวิชาที่สอน</Text>
      <Collapse accordion defaultActiveKey={0}>
        {detail.subjectList.map((subject, index) => (
          <Collapse.Panel header={subject.name} key={index}>
            <Calendar
              className={style.calendar}
              fullscreen={false}
              dateCellRender={(date) =>
                isDaySelected(subject.id, date) && (
                  <div className={style.daySelected} />
                )
              }
              value={currentDate.startOf('month')}
              validRange={[
                currentDate.startOf('month'),
                currentDate.endOf('month'),
              ]}
              onChange={(value) =>
                isDaySelected(subject.id, value)
                  ? removeDay(subject.id, value)
                  : addDay(subject.id, value)
              }
            />
            {subject.dayList.map(({ day }, index) => (
              <Card key={index} title={day.format('DD MMMM BBBB')}>
                <Checkbox />
              </Card>
            ))}
          </Collapse.Panel>
        ))}
      </Collapse>
    </Drawer>
  )
}
