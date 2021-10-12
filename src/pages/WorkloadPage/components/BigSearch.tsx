import css from 'classnames'
import { AutoComplete } from 'antd'
import { FiSearch } from 'react-icons/fi'

import { Loader } from 'components/Loader'

import style from './BigSearch.module.scss'
import { useBigSearch } from './BigSearchHelper'

interface IProps {
  onSearch: (record: Record<string, any>) => void
}

export const BigSearch: React.FC<IProps> = ({ onSearch }) => {
  const { teacherList, isLoading } = useBigSearch()

  return (
    <div className={css(style.myInput, 'shadow')}>
      <FiSearch className={style.searchIcon} />
      <AutoComplete
        allowClear
        defaultActiveFirstOption
        options={teacherList.map((teacher) => ({
          key: teacher.id,
          value: `${teacher.title}${teacher.name}`,
          label: (
            <div style={{ fontSize: 18, margin: '0.5rem' }}>
              {teacher.title}
              {teacher.name}
            </div>
          ),
          name: teacher.name,
          isExternal: teacher.isExternal,
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
              ไม่พบรายชื่อดังกล่าว
            </div>
          )
        }
        onSelect={(_, option) => onSearch(option)}
      >
        <input placeholder="ค้นหาอาจารย์..." spellCheck={false} />
      </AutoComplete>
    </div>
  )
}
