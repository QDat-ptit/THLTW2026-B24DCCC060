import React, { useState } from "react";

const AppointmentManager = () => {

  const [employees] = useState([
    { id: 1, name: "Anh Tuấn", max: 10 },
    { id: 2, name: "Chị Lan", max: 8 }
  ]);

  const [services] = useState([
    { id: 1, name: "Cắt tóc", price: 100000, duration: 30 },
    { id: 2, name: "Spa mặt", price: 300000, duration: 60 }
  ]);

  const [appointments, setAppointments] = useState([]);

  const [form, setForm] = useState({
    customer: "",
    employeeId: "",
    serviceId: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const bookAppointment = () => {

    const isDuplicate = appointments.find(
      (a) =>
        a.employeeId === form.employeeId &&
        a.date === form.date &&
        a.time === form.time
    );

    if (isDuplicate) {
      alert("Lịch này đã được đặt!");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      ...form,
      status: "pending"
    };

    setAppointments([...appointments, newAppointment]);

    setForm({
      customer: "",
      employeeId: "",
      serviceId: "",
      date: "",
      time: ""
    });
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Quản lý lịch hẹn</h2>

      <h3>Đặt lịch</h3>

      <input
        placeholder="Tên khách"
        name="customer"
        value={form.customer}
        onChange={handleChange}
      />

      <br /><br />

      <select name="employeeId" value={form.employeeId} onChange={handleChange}>
        <option value="">Chọn nhân viên</option>
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>

      <br /><br />

      <select name="serviceId" value={form.serviceId} onChange={handleChange}>
        <option value="">Chọn dịch vụ</option>
        {services.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} - {s.price}đ
          </option>
        ))}
      </select>

      <br /><br />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={bookAppointment}>
        Đặt lịch
      </button>

      <hr />

      <h3>Danh sách lịch hẹn</h3>

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>Khách</th>
            <th>Nhân viên</th>
            <th>Dịch vụ</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Trạng thái</th>
          </tr>
        </thead>

        <tbody>

          {appointments.map((a) => {

            const emp = employees.find((e) => e.id == a.employeeId);
            const ser = services.find((s) => s.id == a.serviceId);

            return (
              <tr key={a.id}>
                <td>{a.customer}</td>
                <td>{emp?.name}</td>
                <td>{ser?.name}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.status}</td>
              </tr>
            );

          })}

        </tbody>

      </table>

    </div>
  );
};

export default AppointmentManager;