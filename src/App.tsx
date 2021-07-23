import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { HomePage } from 'pages/HomePage'

// Start Example
import { DemoTimeTable } from 'examples/TimeTable'
// End Example

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* Start Example */}
        <Route exact path="/demo/time-table" component={DemoTimeTable} />
        {/* End Example */}
      </Switch>
    </BrowserRouter>
  )
}

export default App
