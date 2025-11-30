import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NewAppointment from './pages/NewAppointment'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { AppointmentsProvider } from './context/AppointmentsContext'
import { useContext } from 'react'

function Protected({ children }) {
  const { user } = useContext(AuthContext)
  if (!user) return <Navigate to='/' replace />
  return children
}

export default function App(){
  return (
    <AuthProvider>
      <AppointmentsProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/panel' element={
              <Protected>
                <Dashboard />
              </Protected>
            } />
            <Route path='/nueva' element={
              <Protected>
                <NewAppointment />
              </Protected>
            } />
          </Routes>
        </BrowserRouter>
      </AppointmentsProvider>
    </AuthProvider>
  )
}
