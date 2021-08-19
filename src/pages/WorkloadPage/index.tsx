import style from './style.module.scss'
import { Space } from 'antd'
import { Text } from 'components/Text'
import { TimeTable } from 'components/TimeTable'
import { Button } from 'components/Button'
import { Select } from 'components/Select'
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
              <Space>
                <Text>ปีการศึกษา</Text>
                <Select value="2564" />
                <Text>ภาคเรียน</Text>
                <Select value="1" />
                <Button small>ดาวน์โหลดเอกสาร</Button>
              </Space>
            </div>
          </div>

          <TimeTable data={workload} />
        </>
      ) : (
        <h1>eiei</h1>
      )}
    </div>
  )
}
