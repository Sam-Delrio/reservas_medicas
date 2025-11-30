import React from 'react'

export default function StatCard({ title, value }) {
  return (
    <div className='card stat'>
      <div className='num'>{value}</div>
      <div className='label'>{title}</div>
    </div>
  )
}
