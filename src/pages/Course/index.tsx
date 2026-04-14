import { Tabs } from 'antd';
import { useState } from 'react';
import List from './List';
import Form from './Form';
import Delete from './Delete';

export default function Course() {
  const [data, setData] = useState<any[]>([
    {
      id: 1,
      name: 'ReactJS cơ bản',
      teacher: 'Nguyễn Văn A',
      students: 25,
      status: 'Đang mở',
      desc: '<p>Học React từ đầu</p>',
    },
    {
      id: 2,
      name: 'NodeJS nâng cao',
      teacher: 'Trần Thị B',
      students: 0,
      status: 'Tạm dừng',
      desc: '<p>Backend chuyên sâu</p>',
    },
    {
      id: 3,
      name: 'HTML CSS',
      teacher: 'Nguyễn Văn A',
      students: 10,
      status: 'Đã kết thúc',
      desc: '<p>Nền tảng web</p>',
    },
  ]);

  
  const [editing, setEditing] = useState<any>(null);
  const [activeKey, setActiveKey] = useState('1');

  return (
    
    <Tabs activeKey={activeKey} onChange={setActiveKey}>
      <Tabs.TabPane tab="Danh sách" key="1">
        {}
        <List data={data} setEditing={setEditing} setActiveKey={setActiveKey} />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Thêm" key="2">
        {}
        <Form
          data={data}
          setData={setData}
          editing={editing}
          setEditing={setEditing}
        />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Xóa" key="3">
        <Delete data={data} setData={setData} />
      </Tabs.TabPane>
    </Tabs>
  );
}