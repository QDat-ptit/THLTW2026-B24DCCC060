import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { Column } from '@ant-design/plots';

const Statistics = () => {
  const [apps, setApps] = useState([]);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    setApps(JSON.parse(localStorage.getItem('applications') || '[]'));
    setClubs(JSON.parse(localStorage.getItem('clubs') || '[]'));
  }, []);

  const data = [];
  clubs.forEach((c) => {
    const clubApps = apps.filter((a) => a.club_id === c.id);
    ['pending', 'approved', 'rejected'].forEach((s) => {
      data.push({ 
        club: c.name, 
        status: s.toUpperCase(), 
        count: clubApps.filter((a) => a.status === s).length 
      });
    });
  });

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}><Card><Statistic title="CLB" value={clubs.length} /></Card></Col>
        <Col span={6}><Card><Statistic title="Đang chờ" value={apps.filter(a => a.status === 'pending').length} /></Card></Col>
        <Col span={6}><Card><Statistic title="Thành viên" value={apps.filter(a => a.status === 'approved').length} /></Card></Col>
      </Row>
      <Card title="Thống kê đơn theo CLB">
        <Column data={data} xField="club" yField="count" seriesField="status" isGroup={true} color={['#faad14', '#52c41a', '#ff4d4f']} />
      </Card>
    </div>
  );
};

export default Statistics;