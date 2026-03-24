import { Input, Button, Table } from 'antd';
import { useState } from 'react';

export default ({ books, setBooks }: any) => {
  const [year, setYear] = useState('');

  const add = () => {
    if (!year) return;

    setBooks([
      ...books,
      { id: Date.now(), year, current: 0 }
    ]);
  };

  return (
    <>
      <Input placeholder="Năm" onChange={(e) => setYear(e.target.value)} />
      <Button onClick={add}>Thêm</Button>

      <Table
        dataSource={books}
        rowKey="id"
        columns={[
          { title: 'Năm', dataIndex: 'year' },
          { title: 'Số hiện tại', dataIndex: 'current' },
        ]}
      />
    </>
  );
};