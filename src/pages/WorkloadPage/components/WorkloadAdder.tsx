import css from 'classnames'
import { FiTrash2 } from 'react-icons/fi'
import { Form, Button as AntdButton, TimePicker } from 'antd'

import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Loader } from 'components/Loader'
import { Select } from 'components/Select'
import { Text } from 'components/Text'

import style from './WorkloadAdder.module.scss'
import { useAdderForm } from './WorkloadAdderHelper'

export const WorkloadAdder = () => {
  const {
    form,
    initialValues,
    isLoading,
    subjectOptionList,
    typeOptionList,
    classYearOptionList,
    dayOfWeekOptionList,
    roomOptionList,
  } = useAdderForm()

  if (isLoading) return <Loader />

  return (
    <>
      <Text size="sub-head" bold className={style.title}>
        เพิ่มภาระงานใหม่
      </Text>
      <div className={css(style.wrapper, 'shadow')}>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={initialValues}
          onFinish={(v) => console.log(v)}
        >
          {/* ===== Form part 1 ===== */}
          <Text bold className={style.title}>
            รายละเอียดวิชา
          </Text>
          <div className={css(style.row, style.between)}>
            <Form.Item
              name="subjectId"
              label="วิชา"
              className={style.subjectInput}
              rules={[{ required: true, message: '' }]}
              hasFeedback
            >
              <Select
                showSearch
                filterOption={(input, option) =>
                  String(option?.label)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={subjectOptionList}
              />
            </Form.Item>
          </div>

          <div className={style.row}>
            <Form.Item
              name="type"
              label="รูปแบบ"
              className={style.typeInput}
              rules={[{ required: true, message: '' }]}
              hasFeedback
            >
              <Select options={typeOptionList} />
            </Form.Item>

            <Form.Item
              name="section"
              label="กลุ่มเรียน"
              className={style.sectionInput}
              rules={[
                {
                  required: true,
                  message: '',
                },
                { pattern: /^\d+$/, message: 'ตัวเลขเท่านั้น' },
              ]}
              hasFeedback
            >
              <Input placeholder="123" />
            </Form.Item>

            <Form.Item
              name="classYear"
              label="ชั้นปี"
              className={style.classYearInput}
              rules={[{ required: true, message: '' }]}
              hasFeedback
            >
              <Select options={classYearOptionList} />
            </Form.Item>

            <Form.Item
              name="fieldOfStudy"
              label="อักษรย่อสาขาวิชา"
              className={style.fieldOfStudyInput}
              rules={[
                { required: true, message: '' },
                { pattern: /^[A-Z]+$/, message: 'ตัวพิมพ์ใหญ่เท่านั้น' },
              ]}
              hasFeedback
            >
              <Input placeholder="ABC" />
            </Form.Item>
          </div>

          {/* ===== Form part 2 ===== */}
          <Text bold className={style.title}>
            รายละเอียดการสอน
          </Text>
          <div className={style.row}>
            <Form.Item
              name="dayOfWeek"
              label="วันที่สอน"
              className={style.dayOfWeekInput}
              rules={[{ required: true, message: '' }]}
              hasFeedback
            >
              <Select options={dayOfWeekOptionList} />
            </Form.Item>

            <Form.Item
              name="roomId"
              label="ห้องเรียน"
              className={style.roomInput}
            >
              <Select options={roomOptionList} />
            </Form.Item>
          </div>

          <Text size="small">ช่วงเวลา</Text>
          <div className={style.row}>
            <Form.List name="timeList">
              {(fields, timeList) => (
                <div className={style.col}>
                  {fields.map(({ name, ...rest }) => (
                    <div className={style.row}>
                      <Form.Item
                        {...rest}
                        name={[name, 'time']}
                        className={style.timeInput}
                        rules={[{ required: true, message: '' }]}
                      >
                        <TimePicker.RangePicker
                          className={style.timePicker}
                          format="HH:mm"
                          placeholder={['เวลาเริ่ม', 'เวลาสิ้นสุด']}
                          disabledHours={() => [
                            0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23,
                          ]}
                          hideDisabledOptions
                          minuteStep={15}
                        />
                      </Form.Item>
                      {fields.length > 1 && (
                        <FiTrash2
                          className={style.removeTimeListIcon}
                          onClick={() => timeList.remove(name)}
                        />
                      )}
                    </div>
                  ))}

                  <AntdButton
                    block
                    type="dashed"
                    onClick={() => timeList.add()}
                  >
                    + คลิกเพื่อเพิ่มช่วงเวลา
                  </AntdButton>
                </div>
              )}
            </Form.List>
          </div>

          <div className={css(style.row, style.formFooter)}>
            <Button white onClick={() => form.resetFields()}>
              ล้างฟอร์มใหม่
            </Button>
            <Button htmlType="submit">เพิ่มภาระงาน</Button>
          </div>
        </Form>
      </div>
    </>
  )
}
