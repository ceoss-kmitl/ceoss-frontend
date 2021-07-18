import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'components/Layout'
import { WorkloadPage } from 'pages/WorkloadPage'
import { AutomaticRoomPage } from 'pages/AutomaticRoomPage'
import { CompensationBookPage } from 'pages/CompensationBookPage'
import { AssistantDocumentPage } from 'pages/AssistantDocumentPage'
import { MenuTeacherPage } from 'pages/Menu/TeacherPage'
import { MenuSubjectPage } from 'pages/Menu/SubjectPage'
import { MenuAssistantPage } from 'pages/Menu/AssistantPage'
import { MenuRoomPage } from 'pages/Menu/RoomPage'

// Start Example
import { DemoTimeTable } from 'examples/TimeTable'
// End Example

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/workload" />
        <Layout>
          <Route exact path="/workload" component={WorkloadPage} />
          <Route exact path="/automatic-room" component={AutomaticRoomPage} />
          <Route
            exact
            path="/compensation-book"
            component={CompensationBookPage}
          />
          <Route
            exact
            path="/assistant-document"
            component={AssistantDocumentPage}
          />
          <Route exact path="/menu/teacher" component={MenuTeacherPage} />
          <Route exact path="/menu/subject" component={MenuSubjectPage} />
          <Route exact path="/menu/assistant" component={MenuAssistantPage} />
          <Route exact path="/menu/room" component={MenuRoomPage} />

          {/* Start Example */}
          <Route exact path="/demo/time-table" component={DemoTimeTable} />
          {/* End Example */}
        </Layout>
      </Switch>
    </BrowserRouter>
  )
}

export default App
