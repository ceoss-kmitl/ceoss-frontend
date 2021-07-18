import css from 'classnames'
import style from './style.module.scss'
import { Logo } from './Logo'
import { Updated } from './Updated'
import { Logout } from './Logout'
import { Link } from 'react-router-dom'
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
        <Logout />
      </Header>

      <Layout>
        <Sider className={css(style.sider, 'shadow')} theme="light" width={220}>
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <Item
              key="1"
              className={style.item}
              icon={<FiCalendar className={style.icon} />}
            >
              <Link to="/workload" className={style.link}>
                จัดการภาระงาน
              </Link>
            </Item>
            <Item
              key="2"
              className={style.item}
              icon={<FiMonitor className={style.icon} />}
            >
              <Link to="/automatic-room" className={style.link}>
                จัดห้องอัตโนมัติ
              </Link>
            </Item>
            <Item
              key="3"
              className={style.item}
              icon={<FiBook className={style.icon} />}
            >
              <Link to="/compensation-book" className={style.link}>
                หนังสือสอนชดเชย
              </Link>
            </Item>
            <Item
              key="4"
              className={style.item}
              icon={<FiFileText className={style.icon} />}
            >
              <Link to="/assistant-document" className={style.link}>
                เอกสาร TA
              </Link>
            </Item>

            <SubMenu
              key="5"
              title="เมนูการจัดการ"
              className={style.submenu}
              icon={<FiServer className={style.icon} />}
            >
              <Item key="6" className={style.item}>
                <Link to="/menu/teacher" className={style.link}>
                  ข้อมูลอาจารย์
                </Link>
              </Item>
              <Item key="7" className={style.item}>
                <Link to="/menu/subject" className={style.link}>
                  ข้อมูลวิชา
                </Link>
              </Item>
              <Item key="8" className={style.item}>
                <Link to="/menu/assistant" className={style.link}>
                  ข้อมูล TA
                </Link>
              </Item>
              <Item key="9" className={style.item}>
                <Link to="/menu/room" className={style.link}>
                  ข้อมูลห้องเรียน
                </Link>
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
