import { Tooltip, Button } from 'antd'
import { FiLogOut } from 'react-icons/fi'

export const Logout = () => {
  return (
    <Tooltip title="ออกจากระบบ" placement="bottomRight" arrowPointAtCenter>
      <Button
        shape="circle"
        type="text"
        danger
        icon={<FiLogOut size={18} />}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </Tooltip>
  )
}
