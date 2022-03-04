import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { Layout } from 'components/Layout'
import { WorkloadPage } from 'pages/WorkloadPage'
import { AutomaticRoomPage } from 'pages/AutomaticRoomPage'
import { CompensationBookPage } from 'pages/CompensationBookPage'
import { AssistantDocumentPage } from 'pages/AssistantDocumentPage'
import { MenuTeacherPage } from 'pages/Menu/TeacherPage'
import { MenuSubjectPage } from 'pages/Menu/SubjectPage'
import { MenuRoomPage } from 'pages/Menu/RoomPage'
import { MenuSettingPage } from 'pages/Menu/SettingPage'

function App() {
  return (
    <BrowserRouter basename="/ceoss">
      <Layout>
        <Switch>
          <Route path="/workload" component={WorkloadPage} />
          <Route path="/automatic-room" component={AutomaticRoomPage} />
          <Route path="/compensation-book" component={CompensationBookPage} />
          <Route path="/ta-document" component={AssistantDocumentPage} />
          <Route path="/menu/teacher" component={MenuTeacherPage} />
          <Route path="/menu/subject" component={MenuSubjectPage} />
          <Route path="/menu/room" component={MenuRoomPage} />
          <Route path="/menu/setting" component={MenuSettingPage} />

          {/* Fallback route */}
          <Redirect to="/workload" />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
