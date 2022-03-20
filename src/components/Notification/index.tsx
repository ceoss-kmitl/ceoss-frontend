import css from 'classnames'
import { notification, Typography, Modal } from 'antd'
import { FiX } from 'react-icons/fi'
import { HiCheckCircle, HiXCircle } from 'react-icons/hi'
import { AiOutlineLoading } from 'react-icons/ai'
import ReactJson from 'react-json-view'

import style from './style.module.scss'

interface IProps {
  key?: string
  message: string
  seeMore?: any
  duration?: number
}

notification.config({
  placement: 'bottomLeft',
  bottom: 72,
  closeIcon: <FiX size={18} style={{ marginBottom: -5, opacity: 0.4 }} />,
})

const SeeMore = (props: { payload: any }) => {
  return (
    <Typography.Link
      onClick={() => {
        Modal.destroyAll()
        Modal.info({
          centered: true,
          closable: true,
          title: 'รายละเอียด',
          content: (
            <div
              style={{
                whiteSpace: 'pre-wrap',
                maxHeight: 400,
                overflowY: 'auto',
              }}
            >
              <ReactJson
                src={props.payload}
                name={null}
                theme="summerfruit:inverted"
                iconStyle="circle"
                indentWidth={2}
                enableClipboard={false}
                displayDataTypes={false}
              />
            </div>
          ),
        })
      }}
    >
      ดูรายละเอียด
    </Typography.Link>
  )
}

export const Notification = {
  success: (props: IProps) =>
    notification.success({
      ...props,
      className: css(style.wrapper, style.success),
      icon: <HiCheckCircle />,
      description: props.seeMore && <SeeMore payload={props.seeMore} />,
    }),

  error: (props: IProps) =>
    notification.error({
      ...props,
      className: css(style.wrapper, style.error),
      icon: <HiXCircle />,
      description: props.seeMore && <SeeMore payload={props.seeMore} />,
      duration: props.duration ?? 10,
    }),

  loading: (props: IProps) =>
    notification.info({
      ...props,
      className: css(style.wrapper, style.loading),
      icon: <AiOutlineLoading className={style.loadingIcon} />,
    }),

  close: (key: string) => notification.close(key),
  closeAll: notification.destroy,
}
