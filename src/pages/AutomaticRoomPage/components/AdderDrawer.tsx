import css from 'classnames'
import { Drawer as AntdDrawer, Form } from 'antd'
import { FiX, FiCheck } from 'react-icons/fi'

import { Button } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import { Loader } from 'components/Loader'
import { Text } from 'components/Text'
import { DayOfWeekName } from 'constants/common'

import style from './AdderDrawer.module.scss'
import { useUnAssignedWorkload } from './AdderDrawerHelper'

interface IProps {
  roomName: string
  isOpen: boolean
  onClose: () => void
  isLoading?: boolean
  onSubmit?: (workloadIdList: string[]) => void
  refetchWhenValueChange?: any[]
}

export const AdderDrawer: React.FC<IProps> = ({
  roomName,
  isOpen,
  onClose,
  isLoading: isApiLoading = false,
  onSubmit = () => {},
  refetchWhenValueChange = [],
}) => {
  const {
    isLoading: isWorkloadListLoading,
    workloadList,
    handleOnChange,
    handleOnSubmit,
    handleOnClose,
  } = useUnAssignedWorkload(refetchWhenValueChange)

  const isLoading = isApiLoading || isWorkloadListLoading

  return (
    <AntdDrawer
      width={560}
      visible={isOpen}
      onClose={() => handleOnClose(onClose)}
      maskClosable={!isLoading}
      closable={false}
      keyboard={false}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: isLoading,
          })}
        >
          <FiX
            className={style.closeIcon}
            onClick={() => handleOnClose(onClose)}
          />
          <Text size="sub-head" bold className={style.title}>
            ห้อง {roomName}
          </Text>
          <Button
            small
            onClick={() => handleOnSubmit(onSubmit)}
            disabled={isLoading || !workloadList.some((w) => w.checked)}
          >
            <FiCheck className={style.submitIcon} />
            เพิ่มวิชาสอนที่เลือก
          </Button>
        </div>
      }
    >
      <Loader loading={isLoading}>
        <Form layout="vertical">
          <Text size="sub-head" bold className={style.topic}>
            วิชาสอนที่ยังไม่มีห้องเรียน
          </Text>
          {!workloadList.length ? (
            <Text>- ทุกวิชาสอนมีห้องแล้ว -</Text>
          ) : (
            workloadList.map((workload) => (
              <div className={style.checkWrapper}>
                <Checkbox
                  style={{ padding: '0.5rem' }}
                  className={style.checkbox}
                  checked={workload.checked}
                  onChange={(e) =>
                    handleOnChange(workload.workloadId, e.target.checked)
                  }
                >
                  <div className={style.right}>
                    <div>
                      {`${workload.subjectCode} ${workload.subjectName} กลุ่ม ${workload.section}`}
                    </div>
                    <div>
                      {`${DayOfWeekName[workload.dayOfWeek]} เวลา ${
                        workload.startTime
                      } - ${workload.endTime}`}
                    </div>
                  </div>
                </Checkbox>
              </div>
            ))
          )}
        </Form>
      </Loader>
    </AntdDrawer>
  )
}
