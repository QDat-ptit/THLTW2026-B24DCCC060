import { Table, Button, Space, Popconfirm, Input, Select } from 'antd';
import { useState } from 'react';
import FormPost from './Form';

export default function Admin() {
  const [data, setData] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const filtered = data
    .filter((p) => p.title?.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (status ? p.status === status : true));

  const remove = (id: number) => {
    setData(data.filter((p) => p.id !== id));
  };

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title' },
    { title: 'Trạng thái', dataIndex: 'status' },
    { title: 'Views', dataIndex: 'views' },
    {
      title: 'Thao tác',
      render: (_: any, record: any) => (
        <Space>
          <Button onClick={() => setEditing(record)}>Sửa</Button>

          {/* ✅ FIX Ở ĐÂY */}
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => remove(record.id)}
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <FormPost
        data={data}
        setData={setData}
        editing={editing}
        setEditing={setEditing}
      />

      <Input
        placeholder="Tìm kiếm"
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: 20 }}
      />

      <Select
        style={{ width: 200, marginTop: 10 }}
        onChange={setStatus}
        defaultValue=""
      >
        <Select.Option value="">All</Select.Option>
        <Select.Option value="draft">Nháp</Select.Option>
        <Select.Option value="published">Đã đăng</Select.Option>
      </Select>

      <Table
        rowKey="id"
        dataSource={filtered}
        columns={columns}
        style={{ marginTop: 20 }}
      />
    </div>
  );
}