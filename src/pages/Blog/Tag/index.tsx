import { Table, Input, Button } from 'antd';
import { useState } from 'react';

export default function TagPage() {
  const [tags, setTags] = useState<any[]>([]);
  const [name, setName] = useState('');

  const add = () => {
    setTags([...tags, { id: Date.now(), name }]);
    setName('');
  };

  return (
    <div style={{ padding: 20 }}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={add}>Thêm</Button>

      <Table
        rowKey="id"
        dataSource={tags}
        columns={[{ title: 'Tên', dataIndex: 'name' }]}
      />
    </div>
  );
}