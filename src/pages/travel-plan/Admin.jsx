import React, { useState, useEffect } from 'react';
import { ProTable, ModalForm, ProFormText, ProFormDigit, ProFormSelect, ProFormRate } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Image, Card, Row, Col, Statistic, Divider, Empty } from 'antd';
import { PlusOutlined, DeleteOutlined, BarChartOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { Column, Pie } from '@ant-design/plots';

const Admin = () => {
  const [destinations, setDestinations] = useState([]);
  const [plans, setPlans] = useState([]);

  
  const loadData = () => {
    setDestinations(JSON.parse(localStorage.getItem('destinations') || '[]'));
    setPlans(JSON.parse(localStorage.getItem('my_plan') || '[]'));
  };

  useEffect(() => {
    loadData();
  }, []);

  
  const saveDestinations = (newList) => {
    localStorage.setItem('destinations', JSON.stringify(newList));
    setDestinations(newList);
    message.success('Cập nhật danh sách thành công!');
  };

  
  const categoryStats = plans.reduce((acc, curr) => {
    acc[0].value += (Number(curr.food_cost) || 0);
    acc[1].value += (Number(curr.stay_cost) || 0);
    acc[2].value += (Number(curr.move_cost) || 0);
    return acc;
  }, [
    { type: 'Ăn uống', value: 0 },
    { type: 'Lưu trú', value: 0 },
    { type: 'Di chuyển', value: 0 },
  ]);

  
  const popularData = Object.values(plans.reduce((acc, curr) => {
    if (!acc[curr.name]) acc[curr.name] = { name: curr.name, count: 0 };
    acc[curr.name].count += 1;
    return acc;
  }, {})).sort((a, b) => b.count - a.count).slice(0, 5); 

 
  const totalRevenue = categoryStats.reduce((sum, item) => sum + item.value, 0);

  const columns = [
    { title: 'Tên địa điểm', dataIndex: 'name', copyable: true, ellipsis: true },
    { 
      title: 'Hình ảnh', 
      dataIndex: 'image', 
      render: (url) => <Image src={url} width={50} fallback="https://via.placeholder.com/50" /> 
    },
    { 
      title: 'Loại hình', 
      dataIndex: 'type', 
      valueEnum: {
        beach: { text: 'Biển', status: 'Default' },
        mountain: { text: 'Núi', status: 'Success' },
        city: { text: 'Thành phố', status: 'Processing' },
      } 
    },
    { title: 'Đánh giá', dataIndex: 'rating', valueType: 'rate' },
    {
      title: 'Thao tác',
      valueType: 'option',
      render: (_, record) => [
        <Popconfirm 
          key="delete"
          title="Xóa địa điểm này?" 
          onConfirm={() => saveDestinations(destinations.filter(i => i.id !== record.id))}
        >
          <Button type="link" danger icon={<DeleteOutlined />}>Xóa</Button>
        </Popconfirm>
      ],
    },
  ];

  return (
    <div style={{ background: '#f0f2f5', padding: '20px' }}>
      {}
      <ProTable
        headerTitle="Danh sách địa điểm hệ thống"
        dataSource={destinations}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <ModalForm
            title="Thêm địa điểm mới"
            trigger={<Button type="primary" icon={<PlusOutlined />}>Thêm địa điểm</Button>}
            onFinish={async (values) => {
              saveDestinations([...destinations, { ...values, id: Date.now() }]);
              return true;
            }}
          >
            <ProFormText name="name" label="Tên địa điểm" rules={[{ required: true }]} />
            <ProFormSelect 
              name="type" 
              label="Loại hình" 
              options={[{ label: 'Biển', value: 'beach' }, { label: 'Núi', value: 'mountain' }, { label: 'Thành phố', value: 'city' }]} 
              rules={[{ required: true }]}
            />
            <ProFormText name="image" label="Link hình ảnh (URL)" />
            <Row gutter={16}>
              <Col span={8}><ProFormDigit name="food_cost" label="Phí Ăn ($)" min={0} /></Col>
              <Col span={8}><ProFormDigit name="stay_cost" label="Phí Ở ($)" min={0} /></Col>
              <Col span={8}><ProFormDigit name="move_cost" label="Phí Đi ($)" min={0} /></Col>
            </Row>
            <ProFormRate name="rating" label="Xếp hạng" />
          </ModalForm>
        ]}
        columns={columns}
      />

      <Divider orientation="left"><BarChartOutlined /> BÁO CÁO & THỐNG KÊ</Divider>

      {}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic 
              title="Tổng giá trị lịch trình" 
              value={totalRevenue} 
              prefix={<DollarCircleOutlined />} 
              suffix="$"
              valueStyle={{ color: '#3f51b5' }}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic title="Số lịch trình đã tạo" value={plans.length} suffix="lượt" />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card bordered={false}>
            <Statistic title="Tổng số địa điểm" value={destinations.length} suffix="điểm" />
          </Card>
        </Col>
      </Row>

      {}
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col xs={24} lg={12}>
          <Card title="Phân bổ doanh thu theo hạng mục" bordered={false}>
            <Pie
              data={categoryStats}
              angleField="value"
              colorField="type"
              radius={0.8}
              label={{ type: 'inner', offset: '-30%', content: '{value}$' }}
              legend={{ position: 'bottom' }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Top 5 địa điểm phổ biến nhất" bordered={false}>
            {popularData.length > 0 ? (
              <Column
                data={popularData}
                xField="name"
                yField="count"
                label={{ position: 'top' }}
                color="#5B8FF9"
              />
            ) : (
              <Empty description="Chưa có dữ liệu lịch trình" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Admin;