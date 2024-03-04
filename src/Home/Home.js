import { useState } from 'react';

const shifts = [
  { id: 1, employee: 'John Doe', start: '9:00', end: '17:00' },
  { id: 2, employee: 'Jane Doe', start: '17:00', end: '23:00' },
  // add more shifts here
];

const Home = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Start</th>
          <th>End</th>
        </tr>
      </thead>
      <tbody>
        {shifts.map((shift) => (
          <tr key={shift.id}>
            <td>{shift.employee}</td>
            <td>{shift.start}</td>
            <td>{shift.end}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const AddShift = ({ addShift }) => {
  const [employee, setEmployee] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addShift({ employee, start, end });
    setEmployee('');
    setStart('');
    setEnd('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Employee"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
      />
      <input
        type="time"
        placeholder="Start"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="time"
        placeholder="End"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button type="submit">Add Shift</button>
    </form>
  );
};

const App = () => {
  const [shifts, setShifts] = useState(shifts);

  const addShift = (shift) => {
    setShifts([...shifts, { id: shifts.length + 1, ...shift }]);
  };

  return (
    <div>
      <h1>Employee Shift Schedule</h1>
      <AddShift addShift={addShift} />
      <Schedule shifts={shifts} />
    </div>
  );
};

export default Home;


