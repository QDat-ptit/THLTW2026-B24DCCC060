import { Table, Button, Popconfirm } from 'antd';

export default function Delete({ data, setData }: any) {
  const remove = (record: any) => {
    if (record.students > 0) {
      alert('Không thể xóa khóa học đã có học viên');
      return;
    }

    setData(data.filter((c: any) => c.id !== record.id));
  };

  const columns = [
    { title: 'Tên', dataIndex: 'name' },
    { title: 'Số học viên', dataIndex: 'students' },
    {
      title: 'Xóa',
      render: (_: any, record: any) => (
        <Popconfirm
          title="Bạn chắc chắn xóa?"
          onConfirm={() => remove(record)}
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return <Table rowKey="id" dataSource={data} columns={columns} />;
}