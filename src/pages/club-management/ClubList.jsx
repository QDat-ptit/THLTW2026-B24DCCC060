import React, { useState, useEffect } from 'react';
import { ProTable, ModalForm, ProFormText, ProFormDatePicker, ProFormRadio, ProFormTextArea } from '@ant-design/pro-components';
import { Button, Tag, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ClubList = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('clubs') || '[]');
    setClubs(data);
  }, []);

  const saveToLocal = (data) => {
    localStorage.setItem('clubs', JSON.stringify(data));
    setClubs(data);
  };

  const columns = [
    { title: 'Ảnh', dataIndex: 'avatar', valueType: 'avatar', hideInSearch: true },
    { title: 'Tên CLB', dataIndex: 'name', copyable: true, sorter: true },
    { title: 'Ngày lập', dataIndex: 'founded_date', valueType: 'date' },
    { title: 'Chủ nhiệm', dataIndex: 'leader_name' },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      hideInSearch: true,
      render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
    },
    {
      title: 'Hoạt động',
      dataIndex: 'is_active',
      valueEnum: {
        true: { text: 'Có', status: 'Success' },
        false: { text: 'Không', status: 'Error' },
      },
    },
    {
      title: 'Thao tác',
      valueType: 'option',
      render: (_, record) => [
        <Button key="edit" type="link" icon={<EditOutlined />}>Sửa</Button>,
        <Popconfirm
          key="delete"
          title="Xóa CLB này?"
          onConfirm={() => {
            const newData = clubs.filter((c) => c.id !== record.id);
            saveToLocal(newData);
            message.success('Đã xóa CLB');
          }}
        >
          <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
        </Popconfirm>,
      ],
    },

{
  title: 'Thao tác',
  render: (_, record) => (
    <ModalForm
      title={`Đăng ký tham gia: ${record.name}`}
      trigger={<Button type="link">Đăng ký</Button>}
      onFinish={async (values) => {
  try {
    // 1. Lấy dữ liệu cũ từ localStorage, nếu chưa có thì tạo mảng rỗng []
    const rawData = localStorage.getItem('applications');
    const oldApplications = rawData ? JSON.parse(rawData) : [];

    // 2. Tạo bản ghi mới với ID duy nhất (dùng Date.now())
    const newApp = {
      id: Date.now() + Math.random(), // Thêm random để tránh trùng nếu bấm quá nhanh
      ...values,
      club_id: record.id,
      club_name: record.name,
      status: 'pending',
      apply_date: new Date().toLocaleString(),
    };

    // 3. Cộng dồn vào mảng cũ thay vì ghi đè
    const updatedApplications = [...oldApplications, newApp];

    // 4. Lưu lại vào localStorage
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
    
    message.success(`Đã gửi đơn cho sinh viên ${values.full_name}!`);
    
    // Trả về true để Modal tự động đóng và RESET form
    return true; 
  } catch (error) {
    message.error('Có lỗi xảy ra khi lưu dữ liệu!');
    return false;
  }
}}
    >
      <ProFormText name="full_name" label="Họ tên" rules={[{ required: true }]} />
      <ProFormText name="student_id" label="MSSV" rules={[{ required: true }]} />
      <ProFormText name="phone" label="Số điện thoại" rules={[{ required: true }]} />
    </ModalForm>
  ),
},
  ];

  return (
    <ProTable
      headerTitle="Quản lý Câu lạc bộ"
      columns={columns}
      dataSource={clubs}
      rowKey="id"
      toolBarRender={() => [
        <ModalForm
          title="Thêm CLB"
          trigger={<Button type="primary" icon={<PlusOutlined />}>Thêm mới</Button>}
          onFinish={async (values) => {
            const newClub = { ...values, id: Date.now().toString() };
            saveToLocal([...clubs, newClub]);
            message.success('Thêm thành công');
            return true;
          }}
        >
          <ProFormText name="name" label="Tên CLB" rules={[{ required: true }]} />
          <ProFormText name="avatar" label="Link ảnh" />
          <ProFormDatePicker name="founded_date" label="Ngày thành lập" />
          <ProFormText name="leader_name" label="Chủ nhiệm" />
          <ProFormTextArea name="description" label="Mô tả (HTML)" />
          <ProFormRadio.Group
            name="is_active"
            label="Hoạt động"
            options={[{ label: 'Có', value: true }, { label: 'Không', value: false }]}
          />
        </ModalForm>,
      ]}
    />
  );
};

export default ClubList;