import { Table, Button } from 'antd';

const BookingTable = ({ appointments, employees, services, setAppointments }: any) => {

  const changeStatus = (record: any, status: string) => {
    const updated = appointments.map((a: any) =>
      a.key === record.key ? { ...a, status } : a,
    );

    setAppointments(updated);
  };

  const columns = [
    { title: 'Khách', dataIndex: 'customer' },
    { title: 'Ngày', dataIndex: 'date' },
    { title: 'Giờ', dataIndex: 'time' },
    { title: 'Trạng thái', dataIndex: 'status' },
    {
      title: 'Action',
      render: (record: any) => (
        <>
          <Button onClick={() => changeStatus(record, 'Xác nhận')}>
            Xác nhận
          </Button>

          <Button onClick={() => changeStatus(record, 'Hoàn thành')}>
            Hoàn thành
          </Button>

          <Button danger onClick={() => changeStatus(record, 'Hủy')}>
            Hủy
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>

      <h2>Danh sách lịch hẹn</h2>

      <Table
        columns={columns}
        dataSource={appointments}
        pagination={false}
      />

    </div>
  );
};

export default BookingTable;