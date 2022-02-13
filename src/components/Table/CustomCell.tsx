import React from 'react'

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
  function extractCredit(input: any) {
    const result = String(input).match(/\d{1}/g) || ['0', '0', '0', '0']
    return {
      credit: result[0],
      lectureHours: result[1],
      labHours: result[2],
      independentHours: result[3],
    }
  }

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
        const result = extractCredit(record[dataIndex])

        return (
          <span className={style.creditSymbol}>
            <span>{result.credit}</span>
            <span>(</span>
            <span>{result.lectureHours}</span>
            <span>-</span>
            <span>{result.labHours}</span>
            <span>-</span>
            <span>{result.independentHours}</span>
            <span>)</span>
          </span>
        )
      default:
        return children
    }
  }

  return <td {...props}>{cell(children)}</td>
}
