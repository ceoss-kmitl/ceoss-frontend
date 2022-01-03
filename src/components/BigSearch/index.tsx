import css from 'classnames'
import { Select, Skeleton } from 'antd'
import { FiSearch } from 'react-icons/fi'
import { range } from 'lodash'

import style from './style.module.scss'

interface IProps {
  isLoading?: boolean
  placeholder?: string
  notFoundText?: string
  options?: (Record<string, any> & { label: string; value: any })[]
  onSelect?: (option: any) => void
}

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 18,
  margin: '0.5rem',
}

export const BigSearch: React.FC<IProps> = ({
  isLoading = false,
  placeholder = 'ค้นหาข้อมูล...',
  notFoundText = 'ไม่พบข้อมูลดังกล่าว',
  options = [],
  onSelect = () => {},
}) => {
  return (
    <div className={css(style.myInput, 'shadow')}>
      <FiSearch className={style.searchIcon} />
      <Select
        bordered={false}
        showArrow={false}
        showSearch
        placeholder={placeholder}
        onSelect={(_, option) => onSelect(option)}
        optionFilterProp="label"
        notFoundContent={
          isLoading ? (
            <>
              {range(3).map((i) => (
                <Skeleton
                  active
                  title={false}
                  paragraph={{
                    rows: 1,
                    width: `${100 - i * 10}%`,
                    className: style.loadingOption,
                  }}
                />
              ))}
            </>
          ) : (
            <div style={LABEL_STYLE}>{notFoundText}</div>
          )
        }
      >
        {options.map((opt) => (
          <Select.Option {...opt}>
            <div style={LABEL_STYLE}>{opt.label}</div>
          </Select.Option>
        ))}
      </Select>
    </div>
  )
}
