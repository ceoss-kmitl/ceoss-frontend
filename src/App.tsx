import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { HomePage } from 'pages/HomePage'

// Start Example
import { DemoTimeTable } from 'examples/TimeTable'
import { DemoTable } from 'examples/Table'
// End Example

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* Start Example */}
        <Route exact path="/demo/time-table" component={DemoTimeTable} />
        <Route path="/demo/table" component={DemoTable} />
        {/* End Example */}
      </Switch>
    </BrowserRouter>
  )
}

export default App
