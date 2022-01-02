import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { Layout } from 'components/Layout'
import { AcademicYearProvider } from 'contexts/AcademicYearContext'

import { WorkloadPage } from 'pages/WorkloadPage'
import { AutomaticRoomPage } from 'pages/AutomaticRoomPage'
import { CompensationBookPage } from 'pages/CompensationBookPage'
import { AssistantDocumentPage } from 'pages/AssistantDocumentPage'
import { MenuTeacherPage } from 'pages/Menu/TeacherPage'
import { MenuSubjectPage } from 'pages/Menu/SubjectPage'
import { MenuAssistantPage } from 'pages/Menu/AssistantPage'
import { MenuRoomPage } from 'pages/Menu/RoomPage'
import { MenuSettingPage } from 'pages/Menu/SettingPage'

function App() {
  return (
    <AcademicYearProvider>
      <BrowserRouter basename="/ceoss">
        <Layout>
          <Switch>
            <Route path="/workload" component={WorkloadPage} />
            <Route path="/automatic-room" component={AutomaticRoomPage} />
            <Route path="/compensation-book" component={CompensationBookPage} />
            <Route
              path="/assistant-document"
              component={AssistantDocumentPage}
            />
            <Route path="/menu/teacher" component={MenuTeacherPage} />
            <Route path="/menu/subject" component={MenuSubjectPage} />
            <Route path="/menu/assistant" component={MenuAssistantPage} />
            <Route path="/menu/room" component={MenuRoomPage} />
            <Route path="/menu/setting" component={MenuSettingPage} />

            {/* Fallback route */}
            <Redirect to="/workload" />
          </Switch>
        </Layout>
      </BrowserRouter>
    </AcademicYearProvider>
  )
}

export default App
