import css from 'classnames'
import { Row, Divider, Button as AntdButton, Skeleton } from 'antd'
import { FiDownload, FiEdit } from 'react-icons/fi'

import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { ISection } from 'apis/subject'

import style from './SectionCard.module.scss'

interface IProps {
  data: ISection | null
  onEditClick?: (value: ISection) => void
  onDownloadClick?: (value: ISection) => void
}

export const SectionCard: React.FC<IProps> = ({
  data,
  onEditClick = () => {},
  onDownloadClick = () => {},
}) => {
  if (!data)
    return (
      <div className={css(style.card, 'shadow')}>
        <Row justify="space-between">
          <Skeleton.Input active style={{ width: 140 }} size="small" />
          <Skeleton.Button style={{ width: 90 }} size="small" />
        </Row>
        <Divider style={{ margin: '1rem 0' }} />
        <Skeleton active title={false} paragraph={{ rows: 4 }} />
      </div>
    )

  return (
    <div className={css(style.card, 'shadow')}>
      <Row justify="space-between">
        <Text bold size="sub-head">
          กลุ่มเรียน {data.section}
        </Text>
        <Button small blue onClick={() => onDownloadClick(data)}>
          <FiDownload className={style.downloadIcon} />
          ดาวน์โหลด
        </Button>
      </Row>

      <Divider style={{ margin: '1rem 0' }} />
      <div className={style.assistantList}>
        {data.assistantList.map((assistant) => (
          <Text className={style.assistantName}>
            {assistant.id} {assistant.name}
          </Text>
        ))}
      </div>

      <AntdButton block type="dashed" onClick={() => onEditClick(data)}>
        <FiEdit className={style.editIcon} size={16} />
        แก้ไขรายชื่อ/เวลาปฏิบัติงาน
      </AntdButton>
    </div>
  )
}
