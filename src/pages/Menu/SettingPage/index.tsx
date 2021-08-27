import { Text } from 'components/Text'
import { useMenuSetting } from './helper'
import { Form, Input, InputNumber } from 'antd'
import style from './style.module.scss'
import { Button } from 'components/Button'
import { FiSave } from 'react-icons/fi'
import { Loader } from 'components/Loader'

export const MenuSettingPage = () => {
  const { form, data, editSetting, isLoading } = useMenuSetting()

  if (isLoading) return <Loader />

  return (
    <Form
      className={style.page}
      form={form}
      onFinish={editSetting}
      initialValues={data}
    >
      <div className={style.head}>
        <Text size="head" bold>
          การตั้งค่า
        </Text>
        <Button green htmlType="submit">
          <FiSave className={style.iconSave} />
          บันทึกการเปลี่ยนแปลง
        </Button>
      </div>
      <div className={style.topic}>
        <Text size="sub-head" bold>
          ผู้รับตำแหน่งต่าง ๆ
        </Text>
        <div className={style.subTopic1}>
          <Text size="normal" bold>
            ตำแหน่งคณบดี
          </Text>
          <Form.Item
            name="deanName"
            rules={[{ required: true, message: `กรุณากรอกข้อมูล` }]}
          >
            <Input className={style.inputWidth} />
          </Form.Item>
        </div>
        <div className={style.subTopic2}>
          <Text size="normal" bold>
            ตำแหน่งหัวหน้าภาควิชา
          </Text>
          <Form.Item
            name="headName"
            rules={[{ required: true, message: `กรุณากรอกข้อมูล` }]}
          >
            <Input className={style.inputWidth} />
          </Form.Item>
        </div>
      </div>
      <div className={style.topic}>
        <Text size="sub-head" bold>
          อัตราค่าสอน (บาท / ชม.)
        </Text>
        <div className={style.subTopic1}>
          <Text size="normal" bold>
            ภาคทฤษฎี
          </Text>
          <Form.Item
            name="lecturePayRate"
            rules={[{ required: true, message: `กรุณากรอกข้อมูล` }]}
          >
            <InputNumber className={style.inputNumber} />
          </Form.Item>
        </div>
        <div className={style.subTopic2}>
          <Text size="normal" bold>
            ภาคปฏิบัติ
          </Text>
          <Form.Item
            name="labPayRate"
            rules={[{ required: true, message: `กรุณากรอกข้อมูล` }]}
          >
            <InputNumber className={style.inputNumber} />
          </Form.Item>
        </div>
      </div>
      <div className={style.topic}>
        <Text size="sub-head" bold>
          จำนวนเงินสูงสุดที่เบิกได้ (บาท)
        </Text>
        <div className={style.subTopic1}>
          <Text size="normal" bold>
            หลักสูตรปกติ
          </Text>
          <Form.Item
            name="normalClaimLimit"
            rules={[{ required: true, message: `กรุณากรอกข้อมูล` }]}
          >
            <InputNumber className={style.inputNumber} />
          </Form.Item>
        </div>
        <div className={style.subTopic2}>
          <Text size="normal" bold>
            หลักสูตรนานาชาติ
          </Text>
          <Form.Item
            name="interClaimLimit"
            rules={[{ required: true, message: `กรุณากรอกข้อมูล` }]}
          >
            <InputNumber className={style.inputNumber} />
          </Form.Item>
        </div>
      </div>
      <div className={style.topic}>
        <Text size="sub-head" bold>
          การดึงข้อมูลจากเว็บไซต์
        </Text>
        <div className={style.subTopic1}>
          <Text size="normal" bold>
            ลิงค์เว็บไซต์
          </Text>
          <Form.Item
            name="webScrapUrl"
            rules={[{ required: true, message: `กรุณากรอกข้อมูล` }]}
          >
            <Input />
          </Form.Item>
        </div>
      </div>
    </Form>
  )
}
