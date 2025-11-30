import React, { useContext, useMemo } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import StatCard from '../components/StatCard'
import AppointmentCard from '../components/AppointmentCard'
import { AppointmentsContext } from '../context/AppointmentsContext'
import { useNavigate, useLocation } from 'react-router-dom'
import MiniCalendar from "../components/MiniCalendar";


export default function Dashboard(){

  const navigate = useNavigate()
  const location = useLocation()

  const active = (path) => location.pathname === path

  const { appointments, deleteAppointment } = useContext(AppointmentsContext)

  const total = appointments.length
  const today = appointments.filter(a => {
    const d = new Date(a.date)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  }).length

  const next = useMemo(()=>{
    if (!appointments || appointments.length === 0) return null
    return appointments.slice().sort((a,b)=> new Date(a.date) - new Date(b.date))[0]
  }, [appointments])

  return (
    <div className='app-shell'>
      <Sidebar />

      <main className='main-panel'>
        <Navbar />

        <div className='content-grid'>

          <div className='card'>
            <h3 style={{marginBottom:12}}>Resumen</h3>
            <div style={{display:'flex',gap:12}}>
              <div style={{flex:1}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  <StatCard title='Total citas' value={total} />
                  <StatCard title='Citas hoy' value={today} />
                </div>
              </div>
              <div style={{width:220}}>
                <div style={{fontSize:13,color:'var(--muted)'}}>Próxima cita</div>
                {next ? (
                  <div style={{marginTop:8}} className='card'>
                    <div style={{fontWeight:700}}>{next.doctor}</div>
                    <div style={{color:'var(--muted)',fontSize:13}}>
                      {new Date(next.date).toLocaleString()}
                    </div>
                  </div>
                ) : (
                  <div style={{color:'var(--muted)',marginTop:8}}>No hay citas</div>
                )}
              </div>
            </div>
          </div>

          <div className='card'>
            <h3 style={{marginBottom:12}}>Calendario</h3>
            <MiniCalendar />
          </div>


          <div className='card'>
            <h3 style={{marginBottom:12}}>Acciones rápidas</h3>

            <button
              className={`btn-primary ${active('/nueva') ? 'active' : ''}`}
              onClick={() => navigate('/nueva')}
            >
              Nueva cita
            </button>
          </div>

          <div className='app-list'>
            {appointments.length === 0 ? (
              <div className='card'>No tienes citas programadas.</div>
            ) : (
              appointments.map(a=> (
                <AppointmentCard
                  key={a.id}
                  appointment={a}
                  onDelete={deleteAppointment}
                />
              ))
            )}
          </div>

        </div>
      </main>
    </div>
  )
}
