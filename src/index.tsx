import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import 'styles/global.css'

dayjs.locale('th')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
