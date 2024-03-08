import React, { useState } from "react";
import "./ShiftScheduler.css";

const ShiftScheduler = () => {
  // Initialize state variables for shifts and employees
  const [shifts, setShifts] = useState([
    { employee: "John", start: "9:00", end: "17:00" },
    { employee: "Jane", start: "10:00", end: "18:00" },
    { employee: "Mike", start: "12:00", end: "20:00" }
  ]);

  const [employees, setEmployees] = useState([
    { name: "John", id: 1 },
    { name: "Jane", id: 2 },
    { name: "Mike", id: 3 }
  ]);

  // Function to handle adding a new shift
  const addShift = (employeeId, start, end) => {
    setShifts([
      ...shifts,
      { employee: employees.find(e => e.id === employeeId).name, start, end }
    ]);
  };

  return (
    <div className="shift-scheduler">
      <h1>Employee Shift Schedule</h1>
      <div className="employee-selector">
        {employees.map(employee => (
          <button key={employee.id} onClick={() => addShift(employee.id, "9:00", "17:00")}>
            {employee.name}
          </button>
        ))}
        <div>
        <label for="start-date">Start Date:</label>
        <input type="date" id="start-date" name="start-date"/>
        <label for="start-time">Start Time:</label>
        <input type="time" id="start-time" name="start-time"/><br></br>

        <label for="end-date">End Date:</label>
        <input type="date" id="end-date" name="end-date"/>

        <label for="end-time">End Time:</label><br></br>
        <input type="time" id="end-time" name="end-time"/><br></br>
        </div>
      
        
      
      
        
      </div>
      <table className="shift-table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift, index) => (
            <tr key={index}>
              <td>{shift.employee}</td>
              <td>{shift.start}</td>
              <td>{shift.end}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftScheduler;