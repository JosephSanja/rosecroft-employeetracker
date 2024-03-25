import React, { useState, useEffect } from "react";
import './ShiftScheduler.css';

const ShiftSchedule = () => {
  // Initialize state variables for shifts, employees, and new shift
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newShift, setNewShift] = useState({
    employee: "",
    type:"",
    date:"",
    start_time: "",
    end_time: "",
  });
  const [nameFilter, setNameFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState(new Date());

  const fetchData = async () => {
    const shiftsResponse = await fetch("https://rosecroft-employee-tracker-data.onrender.com/shift");
    const shiftsData = await shiftsResponse.json();
    setShifts(shiftsData);

    const employeesResponse = await fetch("https://rosecroft-employee-tracker-data.onrender.com/user");
    const employeesData = await employeesResponse.json();
    setEmployees(employeesData);
  };

  const addShift = async () => {
    const response = await fetch("https://rosecroft-employee-tracker-data.onrender.com/shift", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShift),
    });

    if (response.ok) {
      const newShiftData = await response.json();
      setShifts([...shifts, newShiftData]);
      setNewShift({
        employee: "",
        level:"",
        type:"",
        date:"",
        start_time: "",
        end_time: "",
      });
    }
  };

  const deleteShift = async (shiftToDelete) => {
    const confirmation = window.confirm("Do you want to delete this shift?");
  
    if (confirmation) {
      const response = await fetch(`https://rosecroft-employee-tracker-data.onrender.com/shift/${shiftToDelete.id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        const newShifts = shifts.filter((shift) => shift.id !== shiftToDelete.id);
        setShifts(newShifts);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  

//...

const filteredShifts = shifts.filter((shift) =>
nameFilter === "" || (!nameFilter && shift.employee.toLowerCase() === shift.employee.toLowerCase()) || shift.employee.toLowerCase().includes(nameFilter.toLowerCase()) &&
  new Date(shift.date).toDateString() >=
    new Date(dateFilter.setHours(0, 0, 0, 0)).toDateString() &&
  new Date(shift.date).toDateString() <=
    new Date(dateFilter.setHours(23, 59, 59, 999)).toDateString()
);
  

  return (
    <div className="shift-schedule">
      <h1>Shift Schedule</h1>
      <div className="employee-selector">
        {employees.map((employee) => (
          <button key={employee.id}>{employee.name}</button>
        ))}
      </div>
      <table className="shift-table">
        <thead>
          <tr>
           
            <th>Employee</th>
            <th>Employee Level</th>
            <th>Shift Type</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <button class="shift-button" onClick={addShift}>Add Shift</button>
          </tr>
          
          
        </thead>
        <tbody>
          
          
            <td>
              <select
                value={newShift.employee}
                onChange={(e) =>
                  setNewShift({ ...newShift, employee: e.target.value })
                }
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select
                value={newShift.employee}
                onChange={(e) =>
                  setNewShift({ ...newShift, employee: e.target.value })
                }
              >
                <option value="">Select Level</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.level}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select
                value={newShift.type}
                onChange={(e) =>
                  setNewShift({ ...newShift, type: e.target.value })
                }
              >
                <option value="">Select Type</option>
                <option value="Night Shift">Night Shift</option>
                <option value="Day Shift">Day Shift</option>
                
                
              </select>
            </td>
            <td>
              <input
                type="Date"
                class ="i"
                value={newShift.date}
                onChange={(e) =>
                  setNewShift({ ...newShift, date: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="time"
                class ="i"
                value={newShift.start_time}
                onChange={(e) =>
                  setNewShift({ ...newShift, start_time: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="time"
                calss = "i"
                value={newShift.end_time}
                onChange={(e) =>
                  setNewShift({ ...newShift, end_time: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Filter by name..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </td>
            <td>
            <input
              type="date"
              value={dateFilter.toISOString().split("T")[0]}
              onChange={(e) => setDateFilter(new Date(e.target.value))}
            />
            </td>
            
            
            
                  
                  {filteredShifts.map((shift, index) => (
                  <tr key={shift.id}>
                    <td>{shift.employee}</td>
                    <td>{shift.level}</td>
                    <td>{shift.type}</td>
                    <td>{shift.date}</td>
                    <td>{shift.start_time}</td>
                    <td>{shift.end_time}</td>
                    <td>
                  
                      <button onClick={() => deleteShift(shift)}>Delete</button>
                    </td>
                  </tr>
                ))}
          
           
        </tbody>
      </table>
    </div>
  );
};

export default ShiftSchedule;