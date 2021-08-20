import css from 'classnames'
import { Space } from 'antd'

import { TimeTable } from 'components/TimeTable'
import { Text } from 'components/Text'
import { Select } from 'components/Select'
import { Button } from 'components/Button'

import style from './style.module.scss'
import { BigSearch } from './BigSearch'
import { useWorkload } from './helper'

export const WorkloadPage = () => {
  const { isLoading, isError, workload, getWorkloadByTeacherId } = useWorkload()

  return (
    <div className={style.page}>
      <Text size="head" bold>
        จัดการภาระงาน
      </Text>
      <BigSearch onSearch={getWorkloadByTeacherId} />
      {!isLoading && !isError ? (
        <>
          <div className={style.timeTableHeader}>
            <Text size="sub-head" bold>
              ตารางการปฏิบัติงานสอน
            </Text>
            <div className={style.headerRight}>
              <Space size="middle">
                <span>
                  <Text>ปีการศึกษา</Text>
                  <Select value="2564" />
                </span>
                <span>
                  <Text>ภาคเรียน</Text>
                  <Select value="1" />
                </span>
                <Button small>ดาวน์โหลดเอกสาร</Button>
              </Space>
            </div>
          </div>

          <TimeTable data={workload} />
          <div className={style.timeTableFooter}>
            <label className={style.label}>
              <span className={css(style.labelIcon, style.green)} />
              วิชาทฤษฎี
            </label>
            <label className={style.label}>
              <span className={css(style.labelIcon, style.blue)} />
              วิชาปฏิบัติ
            </label>
            <label className={style.label}>
              <span className={css(style.labelIcon, style.red)} />
              วิชาที่ทับซ้อน
            </label>
          </div>
        </>
      ) : (
        <h1>eiei</h1>
      )}
    </div>
  )
}
