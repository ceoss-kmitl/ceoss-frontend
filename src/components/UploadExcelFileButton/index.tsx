import { VscFileSymlinkFile } from 'react-icons/vsc'

import { Button } from 'components/Button'

import { useUploadFile } from './helper'
import style from './style.module.scss'

interface IProps {
  className?: string
  headers: string[]
  onUpload?: (data: Record<string, string>[]) => void
}

const ACCEPT_FILE_TYPE = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]

export const UploadExcelFileButton: React.FC<IProps> = ({
  className,
  headers,
  onUpload = () => {},
}) => {
  const { inputRef, handleClick, handleChange } = useUploadFile({
    headers,
    onUpload,
  })

  return (
    <>
      <Button className={className} white onClick={handleClick}>
        <VscFileSymlinkFile className={style.excelIcon} />
        นำเข้าข้อมูลจาก Excel
      </Button>

      <input
        type="file"
        accept={ACCEPT_FILE_TYPE.join(',')}
        className={style.hiddenInput}
        ref={inputRef}
        onChange={(e) => handleChange(e.target.files)}
      />
    </>
  )
}
