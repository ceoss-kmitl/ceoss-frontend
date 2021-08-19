import style from './style.module.scss'
import { Text } from 'components/Text'
import { BigSearch } from './BigSearch'
import { useWorkload } from './helper'
import { TimeTable } from 'components/TimeTable'

export const WorkloadPage = () => {
  const { isLoading, workload, getWorkloadByTeacherId } = useWorkload()

  return (
    <div className={style.page}>
      <Text size="head" bold>
        จัดการภาระงาน
      </Text>
      <BigSearch onSearch={getWorkloadByTeacherId} />
      {!isLoading && <TimeTable data={workload} />}
    </div>
  )
}
