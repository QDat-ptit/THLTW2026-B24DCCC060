import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Tabs } from 'antd';
import ClubList from './ClubList';
import Applications from './Applications';
import Members from './Members';
import Statistics from './Statistics';

const ClubManagement = () => {
  return (
    <PageContainer title="Hệ thống Quản lý Câu lạc bộ">
      <Card>
        <Tabs defaultActiveKey="1" type="card">
          <Tabs.TabPane tab="Danh sách CLB" key="1">
            <ClubList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đơn đăng ký" key="2">
            <Applications />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thành viên" key="3">
            <Members />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Thống kê" key="4">
            <Statistics />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  );
};

export default ClubManagement;