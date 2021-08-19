import style from './style.module.scss'
import { Text } from 'components/Text'
import { BigSearch } from './BigSearch'

export const WorkloadPage = () => {
  return (
    <div className={style.page}>
      <Text size="head" bold>
        จัดการภาระงาน
      </Text>
      <BigSearch />
    </div>
  )
}
