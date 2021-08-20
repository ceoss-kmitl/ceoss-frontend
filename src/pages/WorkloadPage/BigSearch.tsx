import css from 'classnames'
import style from './style.module.scss'
import { AutoComplete } from 'antd'
import { FiSearch } from 'react-icons/fi'
import { Loader } from 'components/Loader'
import { useBigSearch } from './helper'

interface IProps {
  onSearch: (id: string) => void
}

export const BigSearch: React.FC<IProps> = ({ onSearch }) => {
  const { teacherList, isLoading } = useBigSearch()

  if (isLoading) return <Loader />

  return (
    <div className={css(style.myInput, 'shadow')}>
      <FiSearch className={style.searchIcon} />
      <AutoComplete
        allowClear
        defaultActiveFirstOption
        options={teacherList.map((each) => ({
          key: each.id,
          value: each.value,
          label: (
            <div style={{ fontSize: 18, margin: '0.5rem' }}>{each.label}</div>
          ),
        }))}
        filterOption={(inputValue, option) =>
          option?.value.includes(inputValue)
        }
        notFoundContent={
          <div style={{ fontSize: 18, margin: '0.5rem' }}>
            ไม่พบรายชื่อดังกล่าว
          </div>
        }
        onSelect={(_, option) => onSearch(option.key as string)}
      >
        <input placeholder="ค้นหาอาจารย์..." spellCheck={false} />
      </AutoComplete>
    </div>
  )
}
