import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'styles/global.css'

import { ConfigProvider } from 'antd'
import th_TH from 'antd/lib/locale-provider/th_TH'

import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import thLocale from 'dayjs/locale/th'

// NOTE: If this config has changed we also need to
// apply changes to the file `/components/DatePicker`
thLocale.weekStart = 1
dayjs.locale(thLocale)
dayjs.extend(weekday)
dayjs.extend(buddhistEra)

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={th_TH}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
