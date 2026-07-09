import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProfileProvider } from './context/UserProfileContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'

export default function App() {
  return (
    <UserProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProfileProvider>
  )
}
