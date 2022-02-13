import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import generatePicker from 'antd/es/date-picker/generatePicker'
import generateCalendar from 'antd/es/calendar/generateCalendar'
import 'antd/es/date-picker/style/index'

import { Dayjs } from 'dayjs'
import './style.scss'

export const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig as any)
export const Calendar = generateCalendar<Dayjs>(dayjsGenerateConfig as any)
