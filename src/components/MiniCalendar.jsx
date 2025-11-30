import React, { useState } from "react";
import Calendar from "react-calendar";
import "../index.css"; 

export default function MiniCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="calendar-wrapper">
      <Calendar
        onChange={setValue}
        value={value}
        locale="es-ES"
      />
    </div>
  );
}
