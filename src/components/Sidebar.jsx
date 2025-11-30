import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { FiHome, FiCalendar, FiUsers, FiUserCheck, FiSettings } from 'react-icons/fi'

export default function Sidebar(){
  const loc = useLocation()
  const active = (path) => loc.pathname === path

  return (
    <aside className='sidebar'>
      {}
      <div className='logo'>
        <div className='glyph'>HC</div>
        <div>
          <h3>Hospital Curita</h3>
          <div style={{fontSize:12,color:'#9aa0a8'}}>Administración</div>
        </div>
      </div>

      <nav className='nav-items'>
        
        <Link 
          to='/panel'
          className={`nav-item ${active('/panel') ? 'active' : ''}`}
        >
          <FiHome size={18} />
          <span>Panel</span>
        </Link>

        <Link 
          to='/citas'
          className={`nav-item ${active('/citas') ? 'active' : ''}`}
        >
          <FiCalendar size={18} />
          <span>Citas</span>
        </Link>

        <Link 
          to='/doctores'
          className={`nav-item ${active('/doctores') ? 'active' : ''}`}
        >
          <FiUserCheck size={18} />
          <span>Doctores</span>
        </Link>

        <Link 
          to='/ajustes'
          className={`nav-item ${active('/ajustes') ? 'active' : ''}`}
        >
          <FiSettings size={18} />
          <span>Ajustes</span>
        </Link>

      </nav>
    </aside>
  )
}
