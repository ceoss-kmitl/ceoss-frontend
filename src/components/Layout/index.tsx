import css from 'classnames'
import style from './style.module.scss'
import { MyHeader } from './MyHeader'
import { Updated } from './Updated'
import { pathList, subPathList } from './helper'
import { NavLink, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { FiServer } from 'react-icons/fi'

const { Header, Sider, Content } = Layout
const { SubMenu, Item } = Menu

interface IProps {
  children: React.ReactNode
}

const MyLayout: React.FC<IProps> = ({ children }) => {
  const { pathname } = useLocation()

  return (
    <Layout className={style.layout}>
      <Header className={css(style.header, 'shadow')}>
        <MyHeader />
      </Header>

      <Layout>
        <Sider className={css(style.sider, 'shadow')} theme="light" width={220}>
          <Menu mode="inline" selectedKeys={[pathname]}>
            {pathList.map(({ path, text, Icon }) => (
              <Item
                key={path}
                className={style.item}
                icon={Icon && <Icon className={style.icon} />}
              >
                <NavLink to={path} className={style.link}>
                  {text}
                </NavLink>
              </Item>
            ))}

            <SubMenu
              key="/menu"
              title="เมนูการจัดการ"
              className={style.submenu}
              icon={<FiServer className={style.icon} />}
            >
              {subPathList.map(({ path, text, Icon }) => (
                <Item
                  key={path}
                  className={style.item}
                  icon={Icon && <Icon className={style.icon} />}
                >
                  <NavLink to={path} className={style.link}>
                    {text}
                  </NavLink>
                </Item>
              ))}
            </SubMenu>

            <Updated />
          </Menu>
        </Sider>
        <Content className={style.content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export { MyLayout as Layout }
