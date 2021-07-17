import style from './Updated.module.scss'
import { useState } from 'react'
import { Menu, Button, Popconfirm, notification } from 'antd'
import { FcSynchronize } from 'react-icons/fc'

export const Updated = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [date, setDate] = useState('20 สิงหาคม 2563')

  function mockLoading() {
    if (isLoading) return

    setIsLoading(true)
    setShowConfirm(false)
    setTimeout(() => {
      setIsLoading(false)
      setDate(
        new Date().toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      )
      notification.success({
        message: 'อัปเดตข้อมูลสำเร็จ',
        placement: 'bottomLeft',
      })
    }, 2000)
  }

  return (
    <Menu.ItemGroup
      key="10"
      title="ข้อมูลตั้งแต่วันที่"
      className={style.title}
    >
      <time className={style.time}>
        {date}
        <Popconfirm
          title="อัปเดตข้อมูล"
          visible={showConfirm}
          onConfirm={mockLoading}
          onCancel={() => setShowConfirm(false)}
          okText="ตกลง"
          cancelText="ยกเลิก"
        >
          <Button
            shape="circle"
            type="text"
            icon={<FcSynchronize />}
            onClick={() => setShowConfirm(true)}
            loading={isLoading}
          />
        </Popconfirm>
      </time>
    </Menu.ItemGroup>
  )
}
