import { Form, Input, InputNumber, Divider } from 'antd'
import { FiSave, FiExternalLink } from 'react-icons/fi'

import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Loader } from 'components/Loader'

import { useMenuSetting } from './helper'
import { AdvanceDrawer } from './AdvanceDrawer'
import { useAdvanceSetting } from './AdvanceDrawerHelper'
import style from './style.module.scss'

export const MenuSettingPage = () => {
  const { form, data, editSetting, isLoading } = useMenuSetting()

  const {
    isOpen,
    updateWebList,
    openDrawer,
    closeDrawer,
    isLoading: isWebListLoading,
    form: webListForm,
  } = useAdvanceSetting()

  if (isLoading) return <Loader />

  return (
    <>
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
              ตำแหน่งรองคณบดี
            </Text>
            <Form.Item
              name="viceDeanName"
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
          <div className={style.subTopic2}>
            <Text size="normal" bold>
              ตำแหน่งผู้อำนวยการ SIIE
            </Text>
            <Form.Item
              name="directorSIIEName"
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
              ภาคทฤษฎี (หลักสูตรปกติ)
            </Text>
            <Form.Item
              name="lecturePayRateNormal"
              rules={[{ required: true, message: `กรุณากรอกข้อมูล` }]}
            >
              <InputNumber className={style.inputNumber} />
            </Form.Item>
          </div>
          <div className={style.subTopic2}>
            <Text size="normal" bold>
              ภาคปฏิบัติ (หลักสูตรปกติ)
            </Text>
            <Form.Item
              name="labPayRateNormal"
              rules={[{ required: true, message: `กรุณากรอกข้อมูล` }]}
            >
              <InputNumber className={style.inputNumber} />
            </Form.Item>
          </div>
          <div className={style.subTopic2}>
            <Text size="normal" bold>
              ภาคทฤษฎี (หลักสูตรนานาชาติ)
            </Text>
            <Form.Item
              name="lecturePayRateInter"
              rules={[{ required: true, message: `กรุณากรอกข้อมูล` }]}
            >
              <InputNumber className={style.inputNumber} />
            </Form.Item>
          </div>
          <div className={style.subTopic2}>
            <Text size="normal" bold>
              ภาคปฏิบัติ (หลักสูตรนานาชาติ)
            </Text>
            <Form.Item
              name="labPayRateInter"
              rules={[{ required: true, message: `กรุณากรอกข้อมูล` }]}
            >
              <InputNumber className={style.inputNumber} />
            </Form.Item>
          </div>
          <div className={style.subTopic2}>
            <Text size="normal" bold>
              ภาคทฤษฎี (อาจารย์ภายนอก)
            </Text>
            <Form.Item
              name="lecturePayRateExternal"
              rules={[{ required: true, message: `กรุณากรอกข้อมูล` }]}
            >
              <InputNumber className={style.inputNumber} />
            </Form.Item>
          </div>
          <div className={style.subTopic2}>
            <Text size="normal" bold>
              ภาคปฏิบัติ (อาจารย์ภายนอก)
            </Text>
            <Form.Item
              name="labPayRateExternal"
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
      </Form>

      <Divider />
      <Text className={style.advanceSetting} onClick={openDrawer}>
        การตั้งค่าขั้นสูง <FiExternalLink />
      </Text>
      <AdvanceDrawer
        isOpen={isOpen}
        isLoading={isWebListLoading}
        form={webListForm}
        onClose={closeDrawer}
        onSubmit={(formValue) => updateWebList(formValue, closeDrawer)}
      />
    </>
  )
}
