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
  const { subjectList, isLoading } = useBigSearch()

  return (
    <div className={css(style.myInput, 'shadow')}>
      <FiSearch className={style.searchIcon} />
      <AutoComplete
        allowClear
        defaultActiveFirstOption
        options={subjectList.map((subject) => ({
          key: subject.id,
          value: `${subject.code} - ${subject.name}`,
          label: (
            <div style={{ fontSize: 18, margin: '0.5rem' }}>
              {`${subject.code} - ${subject.name}`}
            </div>
          ),
        }))}
        filterOption={(inputValue, option) =>
          String(option?.value).toLowerCase().includes(inputValue.toLowerCase())
        }
        notFoundContent={
          isLoading ? (
            <div className={style.loaderWrapper}>
              <Loader />
            </div>
          ) : (
            <div style={{ fontSize: 18, margin: '0.5rem' }}>
              ไม่พบรายวิชาดังกล่าว
            </div>
          )
        }
        onSelect={(_, option) => onSearch(option)}
      >
        <input placeholder="ค้นหารายวิชา..." spellCheck={false} />
      </AutoComplete>
    </div>
  )
}
