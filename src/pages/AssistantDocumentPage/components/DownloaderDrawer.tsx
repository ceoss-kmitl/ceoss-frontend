import css from 'classnames'
import dayjs from 'dayjs'
import { Drawer as AntdDrawer, Form, FormInstance, Row, Col } from 'antd'
import { FiX, FiDownload } from 'react-icons/fi'
import { get } from 'lodash'

import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Loader } from 'components/Loader'
import { DatePicker } from 'components/DatePicker'
import { Select } from 'components/Select'
import { Input } from 'components/Input'
import { IOption, OptionList } from 'constants/option'
import { DocumentPattern } from 'constants/common'

import style from './DownloaderDrawer.module.scss'

interface IProps {
  form: FormInstance
  isOpen: boolean
  onClose: () => void
  onSubmit?: (formValue: any) => void
  teacherList: IOption[]
  isLoading?: boolean
}

export const DownloaderDrawer: React.FC<IProps> = ({
  form,
  isOpen,
  onClose,
  onSubmit = () => {},
  teacherList,
  isLoading,
}) => {
  return (
    <AntdDrawer
      width={560}
      visible={isOpen}
      maskClosable={!isLoading}
      closable={false}
      onClose={() => onClose()}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: isLoading,
          })}
        >
          <FiX className={style.closeIcon} onClick={() => onClose()} />
          <Text size="sub-head" bold className={style.title}>
            ตั้งค่าเอกสาร TA
          </Text>
          <Button small onClick={() => form.submit()}>
            <FiDownload className={style.submitIcon} />
            ดาวน์โหลด
          </Button>
        </div>
      }
    >
      <Loader loading={isLoading}>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={() => onSubmit(form.getFieldsValue())}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="เดือนที่จะทำเอกสาร"
                name="documentDate"
                initialValue={dayjs()}
                rules={[{ required: true, message: '' }]}
              >
                <DatePicker
                  picker="month"
                  format="MMMM BBBB"
                  className={style.datePicker}
                  allowClear={false}
                  dropdownClassName={style.datePickerWrapper}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="รูปแบบการสอน"
                name="documentPattern"
                initialValue={DocumentPattern.ONLINE}
                rules={[{ required: true, message: '' }]}
              >
                <Select options={OptionList.documentPattern} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="เลขที่หนังสืออนุมัติ"
                name="approvalNumber"
                rules={[{ required: true, message: '' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="วันที่อนุมัติ"
                name="approvalDate"
                initialValue={dayjs()}
                rules={[{ required: true, message: '' }]}
              >
                <DatePicker
                  format="DD MMM BBBB"
                  className={style.datePicker}
                  allowClear={false}
                  showToday={false}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="อาจารย์ผู้รับผิดชอบ"
                name="teacherId"
                initialValue={get(teacherList, '[0].value')}
                rules={[{ required: true, message: '' }]}
              >
                <Select options={teacherList} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Loader>
    </AntdDrawer>
  )
}
