import { Input, Button } from 'antd';
import { useState } from 'react';

const ServiceManager = ({ services, setServices }: any) => {

  const [name, setName] = useState('');

  const addService = () => {
    const newService = {
      id: Date.now(),
      name,
      price: 100000,
      duration: 30,
    };

    setServices([...services, newService]);
    setName('');
  };

  return (
    <div>

      <h2>Quản lý dịch vụ</h2>

      <Input
        placeholder="Tên dịch vụ"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button onClick={addService}>
        Thêm dịch vụ
      </Button>

      {services?.map((s: any) => (
        <div key={s.id}>
          {s.name} - {s.price}
        </div>
      ))}

    </div>
  );
};

export default ServiceManager;