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
import { DemoTable } from 'examples/Table'
// End Example

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/workload" component={WorkloadPage} />
          <Route path="/automatic-room" component={AutomaticRoomPage} />
          <Route path="/compensation-book" component={CompensationBookPage} />
          <Route path="/assistant-document" component={AssistantDocumentPage} />
          <Route path="/menu/teacher" component={MenuTeacherPage} />
          <Route path="/menu/subject" component={MenuSubjectPage} />
          <Route path="/menu/assistant" component={MenuAssistantPage} />
          <Route path="/menu/room" component={MenuRoomPage} />

          {/* Start Example */}
          <Route path="/demo/time-table" component={DemoTimeTable} />
          <Route path="/demo/table" component={DemoTable} />
          {/* End Example */}

          <Redirect to="/workload" />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
