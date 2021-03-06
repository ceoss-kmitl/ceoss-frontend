import css from 'classnames'
import style from './style.module.scss'
import { useState, useEffect } from 'react'
import { clamp } from 'lodash'
import loadingGif from './loading.gif'
import { Modal, ModalFuncProps, Button } from 'antd'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { VscError } from 'react-icons/vsc'
import { useAuth } from 'contexts/AuthContext'

interface IModalConfig {
  title?: string
  description?: string
  okText?: string
  cancelText?: string
  loadingText?: string
  finishTitle?: string
  finishText?: string
  finishFailTitle?: string
  finishFailText?: string
  icon?: React.ReactNode
  width?: number
  onOk?: () => void
  onAsyncOk?: (nextStep: () => void) => Promise<void>
  onCancel?: () => void
  loader?: boolean
  loadingStep?: number
}

const defaultConfig: ModalFuncProps = {
  icon: null,
  centered: true,
  width: 305,
  keyboard: false,
  okButtonProps: { style: { display: 'none' } },
}

const Template = ({
  loader,
  title,
  description,
  okText,
  cancelText,
  loadingText,
  icon,
  onOk = () => {},
  onCancel = Modal.destroyAll,
  onAsyncOk,
  loadingStep = 0,
}: IModalConfig) => {
  const [isLoading, setIsLoading] = useState(loader ?? false)
  const [step, setStep] = useState(1)
  const { profile } = useAuth()

  useEffect(() => {
    if (loader && profile) {
      handleAsyncOk()
    }
  }, [loader, profile])

  async function handleAsyncOk() {
    if (onAsyncOk) {
      setIsLoading(true)
      setStep(1)
      await onAsyncOk(() =>
        setStep((_step) => clamp(_step + 1, 1, loadingStep))
      )
      Modal.destroyAll()
    } else {
      onOk()
    }
  }

  return (
    <main className={style.modal}>
      {isLoading && (
        <div className={css(style.overlayContentWrapper, style.loadingWrapper)}>
          <img src={loadingGif} alt="loading icon" />
          {loadingStep ? (
            <div
              className={style.overlayContentText}
            >{`ขั้นตอนที่ ${step}/${loadingStep}`}</div>
          ) : (
            ''
          )}
          <div className={style.overlayContentText}>{loadingText}</div>
        </div>
      )}
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
            disabled={isLoading}
          >
            {cancelText}
          </Button>
        )}
        {okText && (
          <Button
            className={style.okButton}
            type="primary"
            size="large"
            onClick={handleAsyncOk}
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
          loadingText="กรุณารอสักครู่"
          finishTitle="สำเร็จแล้ว"
          finishText="ตกลง"
          finishFailTitle="เกิดข้อผิดพลาด"
          finishFailText="ตกลง"
          icon={<FiCheckCircle className={css(style.icon, style.success)} />}
          {...config}
        />
      ),
      ...defaultConfig,
      width: config?.width || defaultConfig.width,
    }),
  warning: (config?: Partial<IModalConfig>) =>
    Modal.confirm({
      content: (
        <Template
          title="คำเตือน"
          okText="ยืนยัน"
          cancelText="ยกเลิก"
          loadingText="กรุณารอสักครู่"
          finishTitle="สำเร็จแล้ว"
          finishText="ตกลง"
          finishFailTitle="เกิดข้อผิดพลาด"
          finishFailText="ตกลง"
          icon={<FiAlertCircle className={css(style.icon, style.warning)} />}
          {...config}
        />
      ),
      ...defaultConfig,
      width: config?.width || defaultConfig.width,
    }),
  error: (config?: Partial<IModalConfig>) =>
    Modal.confirm({
      content: (
        <Template
          title="เกิดข้อผิดพลาด"
          okText="ปิด"
          onOk={Modal.destroyAll}
          loadingText="กรุณารอสักครู่"
          finishTitle="สำเร็จแล้ว"
          finishText="ตกลง"
          finishFailTitle="เกิดข้อผิดพลาด"
          finishFailText="ตกลง"
          icon={<VscError className={css(style.icon, style.error)} />}
          {...config}
        />
      ),
      ...defaultConfig,
      width: config?.width || defaultConfig.width,
    }),
  loading: (config?: Partial<IModalConfig>) =>
    Modal.confirm({
      content: (
        <Template
          loader
          loadingText="กรุณารอสักครู่"
          finishTitle="สำเร็จแล้ว"
          finishText="ตกลง"
          finishFailTitle="เกิดข้อผิดพลาด"
          finishFailText="ตกลง"
          icon={<FiCheckCircle className={css(style.icon, style.success)} />}
          {...config}
        />
      ),
      ...defaultConfig,
      width: config?.width || defaultConfig.width,
    }),
}

export { MyModal as Modal }
