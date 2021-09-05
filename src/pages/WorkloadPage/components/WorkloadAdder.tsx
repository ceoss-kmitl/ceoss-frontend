import css from 'classnames'
import { Form } from 'antd'

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
          <div className={css(style.row, style.between)}>
            <Form.Item
              name="subjectId"
              label="วิชา"
              className={style.subjectInput}
              rules={[{ required: true, message: 'กรุณาเลือกวิชา' }]}
            >
              <Select options={subjectOptionList} />
            </Form.Item>

            <Form.Item name="type" label="รูปแบบ" className={style.typeInput}>
              <Select options={typeOptionList} />
            </Form.Item>
          </div>

          <div className={style.row}>
            <Form.Item
              name="section"
              label="กลุ่มเรียน"
              className={style.sectionInput}
            >
              <Input type="number" min={1} />
            </Form.Item>

            <Form.Item
              name="classYear"
              label="ชั้นปี"
              className={style.classYearInput}
            >
              <Select options={classYearOptionList} />
            </Form.Item>

            <Form.Item
              name="fieldOfStudy"
              label="อักษรย่อสาขาวิชา"
              className={style.fieldOfStudyInput}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="roomId"
              label="ห้องเรียน"
              className={style.roomInput}
            >
              <Select options={roomOptionList} />
            </Form.Item>

            <Form.Item
              name="dayOfWeek"
              label="วันที่สอน"
              className={style.dayOfWeekInput}
            >
              <Select options={dayOfWeekOptionList} />
            </Form.Item>
          </div>

          <Form.List name="timeList">
            {(fields, { add, remove }) => (
              <div className={style.row}>
                {fields.map(({ key, name, ...rest }) => (
                  <Form.Item {...rest} name={[name, 'time']}>
                    <Input />
                  </Form.Item>
                ))}
              </div>
            )}
          </Form.List>

          <Button htmlType="submit">Yeah</Button>
        </Form>
      </div>
    </>
  )
}
