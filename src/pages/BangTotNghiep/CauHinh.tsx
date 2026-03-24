import { Input, Button, Select, Table } from 'antd';
import { useState } from 'react';

export default ({ fields, setFields }: any) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('string');

  const add = () => {
    if (!name) return;

    setFields([
      ...fields,
      { id: Date.now(), name, type }
    ]);
  };

  return (
    <>
      <Input placeholder="Tên field" onChange={(e) => setName(e.target.value)} />

      <Select defaultValue="string" onChange={setType}>
        <Select.Option value="string">String</Select.Option>
        <Select.Option value="number">Number</Select.Option>
        <Select.Option value="date">Date</Select.Option>
      </Select>

      <Button onClick={add}>Thêm</Button>

      <Table
        dataSource={fields}
        rowKey="id"
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Kiểu', dataIndex: 'type' },
        ]}
      />
    </>
  );
};