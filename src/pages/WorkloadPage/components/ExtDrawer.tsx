import css from 'classnames'
import { Drawer, Collapse, List, Row, ConfigProvider } from 'antd'
import { FiX, FiDownload } from 'react-icons/fi'

import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { Calendar } from 'components/DatePicker'
import { Checkbox } from 'components/Checkbox'
import { Input } from 'components/Input'
import { Select } from 'components/Select'
import { Loader } from 'components/Loader'
import { IWorkloadOfTeacherWithDayjs } from 'apis/workload'
import { OptionList } from 'constants/option'

import style from './ExtDrawer.module.scss'
import { useDocumentDetail } from './ExtDrawerHelper'

interface IProps {
  isOpen: boolean
  isLoading?: boolean
  workloadList?: IWorkloadOfTeacherWithDayjs[]
  onClose?: () => void
  onDownload?: (formValue: any) => void
}

export const ExtDrawer: React.FC<IProps> = ({
  isOpen,
  isLoading = false,
  workloadList = [],
  onClose = () => {},
  onDownload = () => {},
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
    handleDownload,
    resetForm,
  } = useDocumentDetail(workloadList)

  return (
    <Drawer
      width={560}
      visible={isOpen}
      onClose={() => {
        onClose()
        resetForm()
      }}
      maskClosable={!isLoading}
      closable={false}
      keyboard={false}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: isLoading,
          })}
        >
          <FiX className={style.closeIcon} onClick={() => onClose()} />
          <Text size="sub-head" bold className={style.title}>
            ตั้งค่าเอกสาร (อาจารย์ภายนอก)
          </Text>
          <Button
            small
            onClick={() => handleDownload(onDownload)}
            disabled={isLoading}
          >
            <FiDownload className={style.submitIcon} />
            ดาวน์โหลด
          </Button>
        </div>
      }
    >
      <Loader loading={isLoading}>
        <Text className={style.labelMonthPicker}>เลือกเดือนที่จะทำรายการ</Text>
        <Select
          value={month}
          onChange={(value) => setMonth(value)}
          options={OptionList.month}
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
