import { Form, Input, Select, Button, Card, Row, Col } from 'antd';
import { useEffect } from 'react';

export default function CourseForm({ data, setData, editing, setEditing }: any) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editing) {
      form.setFieldsValue(editing);
    }
  }, [editing]);

  const onFinish = (values: any) => {
    if (values.name.length > 100) {
      return alert('Tên tối đa 100 ký tự');
    }

    const duplicate = data.find(
      (c: any) => c.name === values.name && c.id !== editing?.id,
    );

    if (duplicate) return alert('Tên bị trùng');

    if (editing) {
  setData(
    data.map((c: any) =>
      c.id === editing.id ? { ...c, ...values } : c
    )
  );
} else {
  setData([
    ...data,
    { id: Date.now(), ...values }
  ]);
}

setEditing(null);
form.resetFields();
    };

  return (
    <Card title={editing ? 'Sửa khóa học' : 'Thêm khóa học'} style={{ marginBottom: 20 }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tên khóa học" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
                label="Giảng viên"
                name="teacher"
                rules={[{ required: true, message: 'Không được để trống' }]} >
               <Input placeholder="Nhập tên giảng viên" />
            </Form.Item>
</Col>

          <Col span={12}>
            <Form.Item label="Số học viên" name="students">
              <Input type="number" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Trạng thái" name="status" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="Đang mở">Đang mở</Select.Option>
                <Select.Option value="Đã kết thúc">Đã kết thúc</Select.Option>
                <Select.Option value="Tạm dừng">Tạm dừng</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Mô tả" name="desc">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit">
          {editing ? 'Cập nhật' : 'Thêm'}
        </Button>
      </Form>
    </Card>
  );
}