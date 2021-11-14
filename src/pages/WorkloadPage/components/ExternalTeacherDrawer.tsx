import css from 'classnames'
import { Drawer, Collapse, List, Row, ConfigProvider } from 'antd'
import { FiX, FiDownload } from 'react-icons/fi'

import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { Calendar } from 'components/DatePicker'
import { Checkbox } from 'components/Checkbox'
import { Input } from 'components/Input'
import { Select } from 'components/Select'

import style from './ExternalTeacherDrawer.module.scss'
import { useDocumentDetail } from './ExternalTeacherDrawerHelper'
import { Loader } from 'components/Loader'

interface IProps {
  isDrawerVisible?: boolean
  isDownloading: boolean
  onClose?: () => void
  workload: any[]
  onDownload: (config: any) => void
}

export const ExternalTeacherDrawer: React.FC<IProps> = ({
  isDrawerVisible,
  isDownloading,
  onClose,
  workload,
  onDownload,
}) => {
  const {
    detail,
    isDaySelected,
    addDay,
    removeDay,
    toggleIsCompensated,
    onRemarkChange,
    currentDate,
    month,
    setMonth,
    monthOptionList,
    handleDownload,
  } = useDocumentDetail(workload)

  return (
    <Drawer
      width={560}
      visible={isDrawerVisible}
      onClose={() => onClose?.()}
      maskClosable={!isDownloading}
      closable={false}
      keyboard={false}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: isDownloading,
          })}
        >
          <FiX className={style.closeIcon} onClick={onClose} />
          <Text size="sub-head" bold className={style.title}>
            ตั้งค่าเอกสาร (อาจารย์ภายนอก)
          </Text>
          <Button
            small
            onClick={() => handleDownload(onDownload)}
            disabled={isDownloading}
          >
            <FiDownload className={style.submitIcon} />
            ดาวน์โหลด
          </Button>
        </div>
      }
    >
      <Loader loading={isDownloading}>
        <Text className={style.labelMonthPicker}>เลือกเดือนที่จะทำรายการ</Text>
        <Select
          value={month}
          onChange={(value) => setMonth(value)}
          options={monthOptionList}
        />

        <Text className={style.labelCalendarPicker}>รายชื่อวิชาที่สอน</Text>
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
                onSelect={(value) =>
                  isDaySelected(subject.id, value)
                    ? removeDay(subject.id, value)
                    : addDay(subject.id, value)
                }
              />
              <ConfigProvider renderEmpty={() => 'คลิกปฎิทินเพื่อเลือกวันสอน'}>
                <List
                  itemLayout="vertical"
                  dataSource={subject.dayList}
                  renderItem={(item) => (
                    <List.Item>
                      <Row>
                        <Text>{item.day.format('DD MMMM BBBB')}</Text>
                        <Checkbox
                          className={style.listCheckbox}
                          checked={item.isCompensated}
                          onChange={() =>
                            toggleIsCompensated(subject.id, item.day)
                          }
                        >
                          สอนชดเชย
                        </Checkbox>
                      </Row>
                      {item.isCompensated && (
                        <Input
                          placeholder="หมายเหตุ"
                          className={style.listRemark}
                          value={item.remark}
                          onChange={(e) =>
                            onRemarkChange(subject.id, item.day, e.target.value)
                          }
                        />
                      )}
                    </List.Item>
                  )}
                />
              </ConfigProvider>
            </Collapse.Panel>
          ))}
        </Collapse>
      </Loader>
    </Drawer>
  )
}
