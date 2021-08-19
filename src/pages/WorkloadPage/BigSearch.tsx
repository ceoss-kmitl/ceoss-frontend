import css from 'classnames'
import style from './style.module.scss'
import { AutoComplete } from 'antd'
import { FiSearch } from 'react-icons/fi'

const mockData = [
  'รศ.ดร.ธัญธร พรสวัสดิ์ชัย',
  'ดร.บีม ซ่า',
  'ดร.บีม ซ่า2',
  'อ.อิอิ ไม่รู้',
  'รศ.ดร.ธัญธร พรสวัสดิ์ชัย2',
  'ดร.บีม ซ่า3',
  'ดร.บีม ซ่า4',
  'อ.อิอิ ไม่รู้2',
]

export const BigSearch = () => {
  return (
    <div className={css(style.myInput, 'shadow')}>
      <FiSearch className={style.searchIcon} />
      <AutoComplete
        notFoundContent="ไม่พบรายชื่อดังกล่าว"
        defaultActiveFirstOption
        dropdownRender={(menu) => <h1>ei</h1>}
        options={mockData.map((v) => ({
          value: v,
          label: <div className={style.item}>{v}</div>,
        }))}
        filterOption={(inputValue, option) =>
          option?.value.includes(inputValue)
        }
      >
        <input placeholder="ค้นหาอาจารย์..." spellCheck={false} />
      </AutoComplete>
    </div>
  )
}
