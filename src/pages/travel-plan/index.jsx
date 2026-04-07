import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Tabs } from 'antd';
import Discovery from './Discovery';
import Planning from './Planning';
import Budget from './Budget';
import Admin from './Admin';

const TravelPlan = () => {
  return (
    <PageContainer title="Ứng dụng Lập kế hoạch Du lịch">
      <Card>
        <Tabs defaultActiveKey="1" type="card">
          <Tabs.TabPane tab="🌍 Khám phá" key="1"><Discovery /></Tabs.TabPane>
          <Tabs.TabPane tab="📅 Lập lịch trình" key="2"><Planning /></Tabs.TabPane>
          <Tabs.TabPane tab="💰 Ngân sách" key="3"><Budget /></Tabs.TabPane>
          <Tabs.TabPane tab="⚙️ Quản trị" key="4"><Admin /></Tabs.TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};
export default TravelPlan;