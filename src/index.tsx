import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'styles/global.css'

import { AuthProvider } from 'contexts/AuthContext'
import { AcademicYearProvider } from 'contexts/AcademicYearContext'

import { ConfigProvider } from 'antd'
import th_TH from 'antd/lib/locale/th_TH'

import dayjs from 'dayjs'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import thLocale from 'dayjs/locale/th'

thLocale.weekStart = 1
dayjs.locale(thLocale)
dayjs.extend(localeData)
dayjs.extend(weekday)
dayjs.extend(buddhistEra)

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <AcademicYearProvider>
        <ConfigProvider locale={th_TH}>
          <App />
        </ConfigProvider>
      </AcademicYearProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
