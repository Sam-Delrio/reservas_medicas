import React from 'react'

export default function AppointmentCard({ appointment, onDelete }){
  return (
    <div className='appointment-card'>
      <div className='app-left'>
        <div className='avatar'>{appointment.doctor.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
        <div className='app-meta'>
          <div className='title'>{appointment.doctor}</div>
          <div className='muted'>{new Date(appointment.date).toLocaleString()}</div>
        </div>
      </div>

      <div className='app-actions'>
        <button className='btn-ghost' onClick={()=>navigator.clipboard?.writeText(appointment.date)}>Copiar Fecha</button>
        <button className='btn-primary' onClick={()=> onDelete(appointment.id)}>Cancelar</button>
      </div>
    </div>
  )
}
