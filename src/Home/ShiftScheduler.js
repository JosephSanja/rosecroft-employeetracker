import React, { useState, useEffect } from "react";

const ShiftSchedule = () => {
  // Initialize state variables for shifts, employees, and new shift
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newShift, setNewShift] = useState({
    employee: "",
    type:"",
    start_time: "",
    end_time: "",
  });

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
        type:"",
        date:"",
        start_time: "",
        end_time: "",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <th>Shift Type</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift, index) => (
            <tr key={index}>
              <td>{shift.employee}</td>
              <td>{shift.type}</td>
              <td>{shift.date}</td>
              <td>{shift.start_time}</td>
              <td>{shift.end_time}</td>
            </tr>
          ))}
          <tr>
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
                value={newShift.date}
                onChange={(e) =>
                  setNewShift({ ...newShift, date: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="time"
                value={newShift.start_time}
                onChange={(e) =>
                  setNewShift({ ...newShift, start_time: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="time"
                value={newShift.end_time}
                onChange={(e) =>
                  setNewShift({ ...newShift, end_time: e.target.value })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={addShift}>Add Shift</button>
    </div>
  );
};

export default ShiftSchedule;