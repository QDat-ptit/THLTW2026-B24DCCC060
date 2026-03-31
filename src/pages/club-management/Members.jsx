import React, { useState, useEffect } from 'react';
import { ProTable, ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { Button, message } from 'antd';

const Members = () => {
  const [apps, setApps] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    setApps(JSON.parse(localStorage.getItem('applications') || '[]'));
    setClubs(JSON.parse(localStorage.getItem('clubs') || '[]'));
  }, []);

  const members = apps.filter((a) => a.status === 'approved');

  const handleTransfer = (ids, targetId) => {
    const newData = apps.map((a) => (ids.includes(a.id) ? { ...a, club_id: targetId } : a));
    localStorage.setItem('applications', JSON.stringify(newData));
    setApps(newData);
    setSelectedRowKeys([]);
    message.success('Đã chuyển CLB');
  };

  return (
    <ProTable
      headerTitle="Danh sách Thành viên"
      dataSource={members}
      rowKey="id"
      columns={[
        { title: 'Họ tên', dataIndex: 'full_name' },
        { title: 'SĐT', dataIndex: 'phone' },
        { title: 'CLB hiện tại', dataIndex: 'club_id', render: (id) => clubs.find(c => c.id === id)?.name || 'N/A' },
      ]}
      rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
      toolBarRender={() => [
        selectedRowKeys.length > 0 && (
          <ModalForm
            title="Chuyển Câu lạc bộ"
            trigger={<Button type="primary">Chuyển CLB</Button>}
            onFinish={async (v) => { handleTransfer(selectedRowKeys, v.club_id); return true; }}
          >
            <ProFormSelect name="club_id" label="Chọn CLB đích" options={clubs.map(c => ({ label: c.name, value: c.id }))} />
          </ModalForm>
        ),
      ]}
    />
  );
};

export default Members;