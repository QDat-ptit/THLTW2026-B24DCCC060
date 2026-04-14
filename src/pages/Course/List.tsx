import { Table, Input, Select, Row, Col, Card, Button, Space} from 'antd';
import { useState } from 'react';

export default function List({ data, setData, setEditing, setActiveKey }: any) {
  const [search, setSearch] = useState('');
  const [teacher, setTeacher] = useState('');
  const [status, setStatus] = useState('');

  
  const teachers = [...new Set(data.map((c: any) => c.teacher))];

  
  const filtered = data
    .filter((c: any) =>
      c.name.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((c: any) =>
      teacher ? c.teacher === teacher : true,
    )
    .filter((c: any) =>
      status ? c.status === status : true,
    );

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Tên khóa học', dataIndex: 'name' },
    { title: 'Giảng viên', dataIndex: 'teacher' },
    {
      title: 'Số học viên',
      dataIndex: 'students',
      sorter: (a: any, b: any) => a.students - b.students,
    },
    { title: 'Trạng thái', dataIndex: 'status' },
    {
  title: 'Thao tác',
  render: (_: any, record: any) => (
    <Space>
      <Button
  type="primary"
  onClick={() => {
    setEditing(record);
    setActiveKey('2'); 
  }}
>
  Sửa
</Button>
    </Space>
  ),
}
  ];

  return (
    <Card title="Danh sách khóa học">
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="🔍 Tìm theo tên khóa học"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col span={8}>
          <Select
            placeholder="Lọc theo giảng viên"
            onChange={setTeacher}
            allowClear
            style={{ width: '100%' }}
          >
            {teachers.map((t: any) => (
              <Select.Option key={t} value={t}>
                {t}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col span={8}>
          <Select
            placeholder="Lọc theo trạng thái"
            onChange={setStatus}
            allowClear
            style={{ width: '100%' }}
          >
            <Select.Option value="Đang mở">Đang mở</Select.Option>
            <Select.Option value="Đã kết thúc">Đã kết thúc</Select.Option>
            <Select.Option value="Tạm dừng">Tạm dừng</Select.Option>
          </Select>
        </Col>
      </Row>

      <Table
        rowKey="id"
        dataSource={filtered}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
}