import css from 'classnames'
import style from './style.module.scss'
import { Logo } from './Logo'
import { Updated } from './Updated'
import { Layout, Menu, Divider } from 'antd'
import {
  FiCalendar,
  FiMonitor,
  FiBook,
  FiFileText,
  FiServer,
} from 'react-icons/fi'

const { Header, Sider, Content } = Layout
const { SubMenu, Item } = Menu

interface IProps {
  children: React.ReactNode
}

const MyLayout: React.FC<IProps> = ({ children }) => {
  return (
    <Layout className={style.layout}>
      <Header className={css(style.header, 'shadow')}>
        <Logo />
        <div className={style.headerText}>
          คณะวิศวกรรมศาสตร์ สาขาวิชาวิศวกรรมคอมพิวเตอร์
        </div>
      </Header>

      <Layout>
        <Sider className={css(style.sider, 'shadow')} theme="light" width={220}>
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Item
              key="1"
              className={style.item}
              icon={<FiCalendar className={style.icon} />}
            >
              จัดการภาระงาน
            </Item>
            <Item
              key="2"
              className={style.item}
              icon={<FiMonitor className={style.icon} />}
            >
              จัดห้องอัตโนมัติ
            </Item>
            <Item
              key="3"
              className={style.item}
              icon={<FiBook className={style.icon} />}
            >
              หนังสือสอนชดเชย
            </Item>
            <Item
              key="4"
              className={style.item}
              icon={<FiFileText className={style.icon} />}
            >
              เอกสาร TA
            </Item>

            <SubMenu
              key="5"
              title="เมนูการจัดการ"
              className={style.submenu}
              icon={<FiServer className={style.icon} />}
            >
              <Item key="6" className={style.item}>
                ข้อมูลอาจารย์
              </Item>
              <Item key="7" className={style.item}>
                ข้อมูลวิชา
              </Item>
              <Item key="8" className={style.item}>
                ข้อมูล TA
              </Item>
              <Item key="9" className={style.item}>
                ข้อมูลห้องเรียน
              </Item>
            </SubMenu>
            <Divider />

            <Updated />
          </Menu>
        </Sider>
        <Content className={style.content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export { MyLayout as Layout }
