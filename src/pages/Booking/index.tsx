import { Card } from 'antd';
import { useState } from 'react';
import { initEmployees, initServices } from './mockdata';

import EmployeeManager from './components/EmployeeManager';
import ServiceManager from './components/ServiceManager';
import BookingForm from './components/BookingForm';
import BookingTable from './components/BookingTable';
import RatingPanel from './components/RatingPanel';
import StatisticsPanel from './components/StatisticsPanel';

const Booking = () => {
  const [employees, setEmployees] = useState(initEmployees|| []);
  const [services, setServices] = useState(initServices|| []);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [ratings, setRatings] = useState<any[]>([]);

  return (
    <Card>

      <h1>Hệ thống đặt lịch dịch vụ</h1>

      <EmployeeManager
        employees={employees}
        setEmployees={setEmployees}
      />

      <ServiceManager
        services={services}
        setServices={setServices}
      />

      <BookingForm
        employees={employees}
        services={services}
        appointments={appointments}
        setAppointments={setAppointments}
      />

      <BookingTable
        appointments={appointments}
        employees={employees}
        services={services}
        setAppointments={setAppointments}
      />

      <RatingPanel
        employees={employees}
        ratings={ratings}
        setRatings={setRatings}
      />

      <StatisticsPanel
        appointments={appointments}
      />

    </Card>
  );
};

export default Booking;