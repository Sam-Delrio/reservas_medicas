import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import { FiBell, FiUser, FiLogOut } from 'react-icons/fi'

export default function Navbar(){
  const { user, logout } = useContext(AuthContext)

  return (
    <div className='topbar'>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{fontSize:18,fontWeight:700}}>Panel</div>
        <div style={{color:'var(--muted)'}}>Bienvenido, {user?.name}</div>
      </div>

      <div className='header-actions'>
        <div className='icon-btn' title='Notificaciones'>
          <FiBell size={18} />
        </div>

        <div className='icon-btn' title='Perfil'>
          <FiUser size={18} />
        </div>

        <button className='icon-btn' onClick={logout} title='Cerrar sesión'>
          <FiLogOut size={18} />
        </button>
      </div>
    </div>
  )
}
