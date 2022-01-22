import css from 'classnames'
import { Row, Divider, Button as AntdButton } from 'antd'
import { FiDownload, FiEdit } from 'react-icons/fi'

import { Button } from 'components/Button'
import { Text } from 'components/Text'

import style from './SectionCard.module.scss'

export const SectionCard: React.FC = () => {
  return (
    <div className={css(style.card, 'shadow')}>
      <Row justify="space-between">
        <Text bold size="sub-head">
          กลุ่มเรียน 1
        </Text>
        <Button small blue>
          <FiDownload className={style.downloadIcon} />
          ดาวน์โหลด
        </Button>
      </Row>

      <Divider className={style.divider} />
      <div className={style.assistantList}>
        <Text className={style.assistantName}>
          61010497 นายธัญธร พรสวัสดิ์ชัย
        </Text>
        <Text className={style.assistantName}>
          61010479 นางสาวธมน เนตรวิเชียรนางสาวธมน เนตรวิเชียร
        </Text>
        <Text className={style.assistantName}>
          61010497 นายธัญธร พรสวัสดิ์ชัย
        </Text>
      </div>

      <AntdButton block type="dashed">
        <FiEdit className={style.editIcon} size={16} />
        แก้ไขรายชื่อ/เวลาปฏิบัติงาน
      </AntdButton>
    </div>
  )
}
