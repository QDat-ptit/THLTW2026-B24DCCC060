import React, { useState, useEffect } from 'react';
import { ProTable, ModalForm, ProFormTextArea } from '@ant-design/pro-components';
import { Button, Tag, Space, message, Modal, Timeline } from 'antd';
import { CheckOutlined, CloseOutlined, HistoryOutlined } from '@ant-design/icons';

const Applications = () => {
  // Đã xóa <any[]> và các ký tự lạ
  const [applications, setApplications] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [currentLogs, setCurrentLogs] = useState([]);

  useEffect(() => {
    setApplications(JSON.parse(localStorage.getItem('applications') || '[]'));
    setClubs(JSON.parse(localStorage.getItem('clubs') || '[]'));
  }, []);

  const saveToLocal = (data) => {
    localStorage.setItem('applications', JSON.stringify(data));
    setApplications(data);
    setSelectedRowKeys([]);
  };

  const handleAction = (ids, status, reason = '') => {
    const timeStr = new Date().toLocaleString();
    const newData = applications.map(item => {
      if (ids.includes(item.id)) {
        const log = { time: timeStr, action: status === 'approved' ? 'Approved' : 'Rejected', note: reason };
        return { ...item, status, reject_reason: reason, logs: [...(item.logs || []), log] };
      }
      return item;
    });
    saveToLocal(newData);
    message.success('Thao tác thành công!');
  };

  const columns = [
    { title: 'Họ tên', dataIndex: 'full_name' },
    { title: 'SĐT', dataIndex: 'phone' },
    {
      title: 'CLB',
      dataIndex: 'club_id',
      render: (id) => clubs.find(c => c.id === id)?.name || 'N/A',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueEnum: {
        pending: { text: 'Pending', status: 'Warning' },
        approved: { text: 'Approved', status: 'Success' },
        rejected: { text: 'Rejected', status: 'Error' },
      },
    },
    {
      title: 'Thao tác',
      render: (_, record) => (
        <Space>
          {record.status === 'pending' && (
            <>
              <Button type="link" onClick={() => handleAction([record.id], 'approved')}>Duyệt</Button>
              <ModalForm
                title="Lý do từ chối"
                trigger={<Button type="link" danger>Từ chối</Button>}
                onFinish={async (v) => { handleAction([record.id], 'rejected', v.reason); return true; }}
              >
                <ProFormTextArea name="reason" label="Ghi chú" rules={[{ required: true }]} />
              </ModalForm>
            </>
          )}
          <Button icon={<HistoryOutlined />} onClick={() => { setCurrentLogs(record.logs || []); setIsLogModalOpen(true); }} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        headerTitle="Đơn đăng ký"
        columns={columns}
        dataSource={applications}
        rowKey="id"
        rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
        toolBarRender={() => [
          selectedRowKeys.length > 0 && (
            <Space key="batch">
              <Button type="primary" onClick={() => handleAction(selectedRowKeys, 'approved')}>Duyệt {selectedRowKeys.length} đơn</Button>
              <Button danger onClick={() => handleAction(selectedRowKeys, 'rejected', 'Lý do hàng loạt')}>Từ chối {selectedRowKeys.length} đơn</Button>
            </Space>
          ),
        ]}
      />
      <Modal title="Lịch sử" open={isLogModalOpen} onCancel={() => setIsLogModalOpen(false)} footer={null}>
        <Timeline items={(currentLogs || []).map(l => ({ children: `${l.time}: ${l.action} - ${l.note || ''}` }))} />
      </Modal>
    </>
  );
};

export default Applications;