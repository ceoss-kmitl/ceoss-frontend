import React from 'react'
import { get } from 'lodash'

import { Checkbox } from 'components/Checkbox'

import style from './style.module.scss'
import { IColumn, IRecord } from './helper'

type IProps = IColumn & {
  record: IRecord
  children: React.ReactNode
}

export const CustomCell: React.FC<IProps> = ({
  type,
  dataIndex,
  record,
  children,
  ...props
}) => {
  const cell = (children: React.ReactNode) => {
    switch (type) {
      case 'checkbox':
        return (
          <Checkbox
            checked={record[dataIndex] as boolean}
            style={{ pointerEvents: 'none' }}
          />
        )
      case 'status':
        return record[dataIndex] ? (
          <div className={style.statusGreen}>ทำงาน</div>
        ) : (
          <div className={style.statusRed}>ไม่ทำงาน</div>
        )
      case 'credit':
        return (
          <span className={style.creditSymbol}>
            <span>{get(record, 'credit')}</span>
            <span>(</span>
            <span>{get(record, 'lectureHours')}</span>
            <span>-</span>
            <span>{get(record, 'labHours')}</span>
            <span>-</span>
            <span>{get(record, 'independentHours')}</span>
            <span>)</span>
          </span>
        )
      default:
        return children
    }
  }

  return <td {...props}>{cell(children)}</td>
}
