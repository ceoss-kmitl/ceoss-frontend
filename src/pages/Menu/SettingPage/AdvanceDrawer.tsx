import css from 'classnames'
import {
  Drawer as AntdDrawer,
  Button as AntdButton,
  Form,
  FormInstance,
  Row,
  Col,
} from 'antd'
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi'
import { AiFillEdit } from 'react-icons/ai'

import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Loader } from 'components/Loader'
import { IUpsertWeb } from 'apis/web'

import style from './AdvanceDrawer.module.scss'

interface IProps {
  form: FormInstance
  isOpen: boolean
  onClose: () => void
  isLoading?: boolean
  onSubmit?: (formValue: IUpsertWeb) => void
}

export const AdvanceDrawer: React.FC<IProps> = ({
  form,
  isOpen,
  onClose,
  isLoading = false,
  onSubmit = () => {},
}) => {
  return (
    <AntdDrawer
      width={560}
      visible={isOpen}
      maskClosable={!isLoading}
      closable={false}
      onClose={() => {
        onClose()
      }}
      title={
        <div
          className={css(style.titleWrapper, {
            [style.disabled]: isLoading,
          })}
        >
          <FiX
            className={style.closeIcon}
            onClick={() => {
              onClose()
            }}
          />
          <Text size="sub-head" bold className={style.title}>
            การตั้งค่าขั้นสูง
          </Text>
          <Button small onClick={() => form.submit()}>
            <AiFillEdit className={style.submitIcon} />
            บันทึกข้อมูล
          </Button>
        </div>
      }
    >
      <Loader loading={isLoading}>
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={onSubmit}
          scrollToFirstError
        >
          <Row className={style.header}>
            <Text bold>เว็บไซต์ที่จะดึงข้อมูล</Text>
          </Row>
          <Form.List name="webList">
            {(fields, webListAction) => (
              <Col span={24}>
                {fields.length > 0 && (
                  <Row gutter={16} align="middle">
                    <Col span={4}>
                      <Text size="small">หลักสูตร</Text>
                    </Col>
                    <Col span={20}>
                      <Text size="small">เว็บไซต์</Text>
                    </Col>
                  </Row>
                )}
                {fields.map(({ name, ...rest }) => (
                  <div className={style.webItem}>
                    <Row gutter={16}>
                      <Col span={4}>
                        <Form.Item
                          name={[name, 'id']}
                          rules={[{ required: true, message: '' }]}
                          normalize={(value) => String(value).toUpperCase()}
                          {...rest}
                        >
                          <Input maxLength={8} placeholder="CE" />
                        </Form.Item>
                      </Col>
                      <Col span={19}>
                        <Form.Item
                          name={[name, 'url']}
                          rules={[
                            { required: true, message: '' },
                            {
                              pattern:
                                /^(https\:\/\/new\.reg\.kmitl\.ac\.th\/reg\/#\/teach_table\?)/,
                              message: 'เว็บสำนักทะเบียนเท่านั้น',
                            },
                          ]}
                          {...rest}
                        >
                          <Input placeholder="https://new.reg.kmitl.ac.th/reg/#/teach_table?" />
                        </Form.Item>
                      </Col>
                      <Col span={1}>
                        <FiTrash2
                          className={style.trashIcon}
                          onClick={() => webListAction.remove(name)}
                        />
                      </Col>
                    </Row>
                  </div>
                ))}
                <AntdButton
                  type="dashed"
                  block
                  icon={<FiPlus className={style.plusIcon} />}
                  style={{ height: 40, fontSize: 16 }}
                  onClick={() => webListAction.add()}
                >
                  คลิกเพื่อเพิ่มเว็บไซต์
                </AntdButton>
              </Col>
            )}
          </Form.List>
        </Form>
      </Loader>
    </AntdDrawer>
  )
}
