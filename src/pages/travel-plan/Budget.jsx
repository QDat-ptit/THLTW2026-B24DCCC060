import React from 'react';
import { Pie } from '@ant-design/plots';
import { Card, Alert, Statistic, Row, Col } from 'antd';

const Budget = () => {
  const plan = JSON.parse(localStorage.getItem('my_plan') || '[]');
  const limit = 2500; // Ngân sách m tự định nghĩa

  const data = plan.reduce((acc, curr) => {
    acc[0].value += (curr.food_cost || 0);
    acc[1].value += (curr.stay_cost || 0);
    acc[2].value += (curr.move_cost || 0);
    return acc;
  }, [
    { type: 'Ăn uống', value: 0 },
    { type: 'Lưu trú', value: 0 },
    { type: 'Di chuyển', value: 0 },
  ]);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div style={{ padding: 10 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Phân bổ ngân sách">
            <Pie data={data} angleField="value" colorField="type" radius={0.7} label={{ type: 'inner' }} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Tổng quan chi tiêu">
            <Statistic title="Tổng ngân sách dự tính" value={total} suffix={`/ $${limit}`} />
            {total > limit && <Alert message="Cảnh báo: Bạn đã tiêu quá tay rồi!" type="error" showIcon style={{ marginTop: 20 }} />}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Budget;