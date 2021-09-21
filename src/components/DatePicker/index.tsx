import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import generatePicker from 'antd/es/date-picker/generatePicker'
import { Dayjs } from 'dayjs'
import 'antd/es/date-picker/style/index'

export const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)
