import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Tag, Rate, Select, Empty, Space } from 'antd';

const Discovery = () => {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('destinations') || '[]');
    setList(data);
  }, []);

  const filtered = filter === 'all' ? list : list.filter(i => i.type === filter);

  return (
    <div style={{ padding: '10px' }}>
      <Space style={{ marginBottom: 20 }}>
        <span>Lọc: </span>
        <Select defaultValue="all" style={{ width: 120 }} onChange={setFilter}>
          <Select.Option value="all">Tất cả</Select.Option>
          <Select.Option value="beach">Biển</Select.Option>
          <Select.Option value="mountain">Núi</Select.Option>
          <Select.Option value="city">Thành phố</Select.Option>
        </Select>
      </Space>

      {filtered.length === 0 ? <Empty description="Chưa có điểm đến nào, hãy vào Tab Admin để thêm!" /> : (
        <Row gutter={[16, 16]}>
          {filtered.map(item => (
            <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
              <Card
                hoverable
                cover={<img alt="travel" src={item.image || 'https://via.placeholder.com/400x250'} style={{ height: 180, objectFit: 'cover' }} />}
              >
                <Card.Meta 
  title={item.name} 
  description={
    <Tag color="cyan">
      {}
      {(item.type || 'N/A').toUpperCase()}
    </Tag>
  } 
/>
                <div style={{ marginTop: 12 }}>
                  <Rate disabled defaultValue={item.rating} style={{ fontSize: 14 }} />
                  <div style={{ color: '#f5222d', fontWeight: 'bold', marginTop: 8 }}>
                    Dự kiến: ${(item.food_cost || 0) + (item.stay_cost || 0) + (item.move_cost || 0)}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Discovery;