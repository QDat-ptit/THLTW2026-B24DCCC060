import { Select, Input, Button, DatePicker, TimePicker } from 'antd';
import { useState } from 'react';

const BookingForm = ({ employees, services, appointments, setAppointments }: any) => {

  const [customer, setCustomer] = useState('');
  const [employeeId, setEmployeeId] = useState<number | undefined>();
  const [serviceId, setServiceId] = useState<number | undefined>();
  const [date, setDate] = useState<any>();
  const [time, setTime] = useState<any>();

  const book = () => {
    if (!date || !time || !employeeId || !serviceId || !customer) {
      alert('Thiếu thông tin');
      return;
    }

    const d = date.format('YYYY-MM-DD');
    const t = time.format('HH:mm');

    const duplicate = appointments.find(
      (a: any) =>
        a.employeeId === employeeId &&
        a.date === d &&
        a.time === t,
    );

    if (duplicate) {
      alert('Trùng lịch');
      return;
    }

    setAppointments([
      ...appointments,
      {
        key: Date.now(),
        customer,
        employeeId,
        serviceId,
        date: d,
        time: t,
        status: 'Chờ duyệt',
      },
    ]);
  };

  return (
    <div>

      <h2>Đặt lịch</h2>

      <Input
        placeholder="Tên khách"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />

      {/* SELECT NHÂN VIÊN */}
      <Select
        style={{ width: 150 }}
        placeholder="Chọn nhân viên"
        onChange={(value) => setEmployeeId(value)}
        options={employees?.map((e: any) => ({
          label: e.name,
          value: e.id,
        }))}
      />

      {/* SELECT DỊCH VỤ */}
      <Select
        style={{ width: 150 }}
        placeholder="Chọn dịch vụ"
        onChange={(value) => setServiceId(value)}
        options={services?.map((s: any) => ({
          label: s.name,
          value: s.id,
        }))}
      />

      <DatePicker onChange={(value) => setDate(value)} />

      <TimePicker onChange={(value) => setTime(value)} />

      <Button type="primary" onClick={book}>
        Đặt
      </Button>

    </div>
  );
};

export default BookingForm;