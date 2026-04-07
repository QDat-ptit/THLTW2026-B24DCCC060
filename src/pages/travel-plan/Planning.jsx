import React, { useState, useEffect } from 'react';
import { ProTable, ModalForm, ProFormSelect, ProFormDigit } from '@ant-design/pro-components';
import { Button, message, Tag, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const Planning = () => {
  const [plan, setPlan] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    setDestinations(JSON.parse(localStorage.getItem('destinations') || '[]'));
    setPlan(JSON.parse(localStorage.getItem('my_plan') || '[]'));
  }, []);

  const save = (newPlan) => {
    localStorage.setItem('my_plan', JSON.stringify(newPlan));
    setPlan(newPlan);
  };

  const columns = [
    { title: 'Thứ tự', valueType: 'indexBorder', width: 50 },
    { title: 'Điểm đến', dataIndex: 'name' },
    { title: 'Ngày', dataIndex: 'day', render: (d) => <Tag color="blue">Ngày {d}</Tag> },
    { title: 'Tổng phí', render: (_, r) => <b>${(r.food_cost || 0) + (r.stay_cost || 0) + (r.move_cost || 0)}</b> },
    {
      title: 'Xóa',
      render: (_, r) => (
        <Popconfirm title="Xóa?" onConfirm={() => save(plan.filter(i => i.pId !== r.pId))}>
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <ProTable
      headerTitle="Lịch trình chi tiết"
      dataSource={plan}
      rowKey="pId"
      search={false}
      toolBarRender={() => [
        <ModalForm
          title="Thêm vào lịch trình"
          trigger={<Button type="primary" icon={<PlusOutlined />}>Thêm điểm dừng</Button>}
          onFinish={async (v) => {
            const dest = destinations.find(d => d.id === v.destId);
            save([...plan, { ...dest, pId: Date.now(), day: v.day }]);
            message.success('Đã thêm!');
            return true;
          }}
        >
          <ProFormSelect name="destId" label="Địa điểm" options={destinations.map(d => ({ label: d.name, value: d.id }))} rules={[{required: true}]} />
          <ProFormDigit name="day" label="Ngày thứ mấy" min={1} initialValue={1} />
        </ModalForm>
      ]}
      columns={columns}
    />
  );
};

export default Planning;