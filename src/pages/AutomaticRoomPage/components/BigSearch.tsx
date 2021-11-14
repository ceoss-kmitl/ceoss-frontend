import css from 'classnames'
import { Select } from 'antd'
import { FiSearch } from 'react-icons/fi'

import { Loader } from 'components/Loader'

import style from './BigSearch.module.scss'
import { useBigSearch } from './BigSearchHelper'

interface IProps {
  onSearch: (record: Record<string, any>) => void
}

export const BigSearch: React.FC<IProps> = ({ onSearch }) => {
  const { roomList, isLoading } = useBigSearch()

  return (
    <div className={css(style.myInput, 'shadow')}>
      <FiSearch className={style.searchIcon} />
      <Select
        bordered={false}
        showArrow={false}
        placeholder="ค้นหาห้อง..."
        showSearch
        options={roomList.map((room) => ({
          key: room.id,
          value: `${room.name}`,
          label: (
            <div style={{ fontSize: 18, margin: '0.5rem' }}>{room.name}</div>
          ),
          name: room.name,
        }))}
        filterOption={(inputValue, option) =>
          option?.value.includes(inputValue)
        }
        notFoundContent={
          isLoading ? (
            <div className={style.loaderWrapper}>
              <Loader />
            </div>
          ) : (
            <div style={{ fontSize: 18, margin: '0.5rem' }}>
              ไม่พบห้องดังกล่าว
            </div>
          )
        }
        onSelect={(_, option) => onSearch(option)}
      />
    </div>
  )
}
