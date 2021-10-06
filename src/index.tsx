import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
import buddhistEra from 'dayjs/plugin/buddhistEra'
import 'dayjs/locale/th'
import 'styles/global.css'

dayjs.locale('th')
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(buddhistEra)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
