import React, { useState, useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { AppointmentsContext } from '../context/AppointmentsContext'
import { useNavigate } from 'react-router-dom'

export default function NewAppointment(){
  const { createAppointment } = useContext(AppointmentsContext)
  const [doctor, setDoctor] = useState('')
  const [date, setDate] = useState('')
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault()
    await createAppointment({ doctor, date })
    nav('/panel')
  }

  return (
    <div className='app-shell'>
      <Sidebar />
      <main className='main-panel'>
        <Navbar />
        <div style={{maxWidth:760}}>
          <div className='card'>
            <h3 style={{marginBottom: 12 }}>Nueva cita</h3>
            <form onSubmit={submit} className='login-form'>
              <input placeholder='Doctor (ej. Dr. Pérez)' value={doctor} onChange={e=>setDoctor(e.target.value)} required />
              <input type='datetime-local' value={date} onChange={e=>setDate(e.target.value)} required />
              <div style={{display:'flex',gap:8}}>
                <button className='btn-apple' type='submit'>Crear</button>
                <button type='button' className='btn-apple' onClick={()=>nav('/panel')}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
