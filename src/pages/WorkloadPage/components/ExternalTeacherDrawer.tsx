import css from 'classnames'
import localeTH from 'antd/es/date-picker/locale/th_TH'
import { Drawer, Collapse, Card, Row } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { FiX, FiDownload } from 'react-icons/fi'

import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { Calendar } from 'components/DatePicker'
import { Checkbox } from 'components/Checkbox'

import style from './ExternalTeacherDrawer.module.scss'
import { useDocumentDetail } from './ExternalTeacherDrawerHelper'

interface IProps {
  isDrawerVisible?: boolean
  onClose?: () => void
}

export const ExternalTeacherDrawer: React.FC<IProps> = ({
  isDrawerVisible,
  onClose,
}) => {
  const { day, setDay } = useDocumentDetail()

  return (
    <Drawer
      width={560}
      visible={isDrawerVisible}
      onClose={() => {
        onClose?.()
        setDay([])
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
      <Collapse accordion defaultActiveKey="1">
        <Collapse.Panel header="COMPUTER PROGRAMMING" key="1">
          eiei
        </Collapse.Panel>
        <Collapse.Panel header="Test2" key="2">
          <Row justify="center">
            <Text bold>เลือกวันที่สอน</Text>
          </Row>
          <Calendar
            className={style.calendar}
            locale={localeTH}
            fullscreen={false}
            onChange={(a) => setDay((d) => [...d, a])}
          />
          {day.map((d: Dayjs, index) => (
            <Card
              key={index}
              title={d.format('DD MMMM YYYY')}
              extra={
                <div
                  onClick={() =>
                    setDay((da) => da.filter((d2: Dayjs) => !d2.isSame(d)))
                  }
                >
                  X
                </div>
              }
            >
              <Checkbox />
            </Card>
          ))}
        </Collapse.Panel>
      </Collapse>
    </Drawer>
  )
}
