import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'
import { AuthContext } from './AuthContext'

export const AppointmentsContext = createContext()

export function AppointmentsProvider({ children }){
  const { user } = useContext(AuthContext)
  const [appointments, setAppointments] = useState([])

  useEffect(()=>{
    if (user) loadAppointments()
    else setAppointments([])
  }, [user])

  async function loadAppointments(){
    const res = await api.get(`/appointments?userId=${user.id}`)
    setAppointments(res.data || [])
  }

  async function createAppointment(data){
    const res = await api.post('/appointments', { ...data, userId: user.id, status: 'scheduled' })
    setAppointments(prev => [...prev, res.data])
  }

  async function deleteAppointment(id){
    await api.delete(`/appointments/${id}`)
    setAppointments(prev => prev.filter(p => p.id !== id))
  }

  return (
    <AppointmentsContext.Provider value={{ appointments, loadAppointments, createAppointment, deleteAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  )
}
