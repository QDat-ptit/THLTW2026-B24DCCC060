import { Input, Button } from 'antd';
import { useState } from 'react';

const EmployeeManager = ({ employees, setEmployees }: any) => {
  const [name, setName] = useState('');

  const addEmployee = () => {
    const newEmp = {
      id: Date.now(),
      name,
      maxPerDay: 5,
      workTime: '09:00-17:00',
    };
    setEmployees([...employees, newEmp]);
    setName('');
  };

  return (
    <div>
      <h2>Quản lý nhân viên</h2>

      <Input
        placeholder="Tên nhân viên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button onClick={addEmployee}>
        Thêm nhân viên
      </Button>

      {employees?.map((e: any) => (
        <div key={e.id}>
          {e.name} ({e.workTime})
        </div>
      ))}
    </div>
  );
};

export default EmployeeManager;