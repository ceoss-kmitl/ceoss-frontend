import { useState, useEffect } from 'react'
import { Modal } from 'antd'
import { FiBox } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

import { useAuth } from 'contexts/AuthContext'
import { Button } from 'components/Button'

import style from './style.module.scss'

export const LoginModal = () => {
  const { profile, signInGoogle } = useAuth()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(profile ? false : true)
  }, [profile])

  return (
    <Modal
      width={360}
      visible={visible}
      closable={false}
      maskClosable={false}
      keyboard={false}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      <div className={style.content}>
        <div className={style.logoWrapper}>
          <FiBox className={style.logoIcon} />
          <span className={style.logoText}>
            CE
            <span>OSS</span>
          </span>
        </div>

        <Button
          white
          onClick={() => signInGoogle()}
          className={style.signInButton}
        >
          <FcGoogle className={style.googleIcon} />
          ลงชื่อเข้าใช้งาน
        </Button>
      </div>
    </Modal>
  )
}
