import { Input, Button, Select, Table } from 'antd';
import { useState } from 'react';

export default ({ books, decisions, setDecisions }: any) => {
  const [soQD, setSoQD] = useState('');
  const [bookId, setBookId] = useState();

  const add = () => {
    if (!soQD || !bookId) return;

    setDecisions([
      ...decisions,
      { id: Date.now(), soQD, bookId, count: 0 }
    ]);
  };

  return (
    <>
      <Input placeholder="Số quyết định" onChange={(e) => setSoQD(e.target.value)} />

      <Select style={{ width: 200 }} onChange={setBookId}>
        {books.map((b: any) => (
          <Select.Option key={b.id} value={b.id}>
            {b.year}
          </Select.Option>
        ))}
      </Select>

      <Button onClick={add}>Thêm</Button>

      <Table
        dataSource={decisions}
        rowKey="id"
        columns={[
          { title: 'Số QĐ', dataIndex: 'soQD' },
          { title: 'Lượt tra cứu', dataIndex: 'count' },
        ]}
      />
    </>
  );
};