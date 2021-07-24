import css from 'classnames'
import style from './style.module.scss'
import { useState } from 'react'
import { Modal, ModalFuncProps, Button } from 'antd'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { VscError } from 'react-icons/vsc'

interface IModalConfig {
  title: string
  description?: string
  okText?: string
  cancelText?: string
  width?: string
  icon?: React.ReactNode
  onOk?: () => void
  onAsyncOk?: () => Promise<void>
  onCancel?: () => void
}

const defaultConfig: ModalFuncProps = {
  icon: null,
  centered: true,
  width: 305,
  okButtonProps: { style: { display: 'none' } },
}

const Template = ({
  title,
  description,
  okText,
  cancelText,
  icon,
  onOk = () => {},
  onCancel = Modal.destroyAll,
  onAsyncOk,
}: IModalConfig) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <main className={style.modal}>
      {icon}
      <div className={style.title}>{title}</div>
      {description && <div className={style.description}>{description}</div>}
      <div className={style.buttonWrapper}>
        {cancelText && (
          <Button
            className={style.cancelButton}
            type="text"
            size="large"
            onClick={onCancel}
          >
            {cancelText}
          </Button>
        )}
        {okText && (
          <Button
            className={style.okButton}
            type="primary"
            size="large"
            onClick={async () => {
              if (onAsyncOk) {
                setIsLoading(true)
                await onAsyncOk()
                setIsLoading(false)
              } else {
                onOk()
              }
            }}
            loading={isLoading}
          >
            {okText}
          </Button>
        )}
      </div>
    </main>
  )
}

const MyModal = {
  success: (config?: Partial<IModalConfig>) =>
    Modal.confirm({
      content: (
        <Template
          title="สำเร็จ"
          okText="ตกลง"
          onOk={Modal.destroyAll}
          icon={<FiCheckCircle className={css(style.icon, style.success)} />}
          {...config}
        />
      ),
      ...defaultConfig,
      width: config?.width ?? defaultConfig.width,
    }),
  warning: (config?: Partial<IModalConfig>) =>
    Modal.confirm({
      content: (
        <Template
          title="คำเตือน"
          okText="ยืนยัน"
          cancelText="ยกเลิก"
          icon={<FiAlertCircle className={css(style.icon, style.warning)} />}
          {...config}
        />
      ),
      ...defaultConfig,
      width: config?.width ?? defaultConfig.width,
    }),
  error: (config?: Partial<IModalConfig>) =>
    Modal.confirm({
      content: (
        <Template
          title="เกิดข้อผิดพลาด"
          okText="ปิด"
          onOk={Modal.destroyAll}
          icon={<VscError className={css(style.icon, style.error)} />}
          {...config}
        />
      ),
      ...defaultConfig,
      width: config?.width ?? defaultConfig.width,
    }),
}

export { MyModal as Modal }
