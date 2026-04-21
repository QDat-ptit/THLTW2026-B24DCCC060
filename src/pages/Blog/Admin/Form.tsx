import { Form, Input, Button, Select, Card } from 'antd';
import { useEffect } from 'react';

export default function FormPost({
  data,
  setData,
  editing,
  setEditing,
}: any) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editing) form.setFieldsValue(editing);
  }, [editing]);

  const onFinish = (values: any) => {
    if (editing) {
      setData(
        data.map((p: any) =>
          p.id === editing.id ? { ...p, ...values } : p,
        ),
      );
    } else {
      setData([
        ...data,
        { id: Date.now(), views: 0, ...values },
      ]);
    }

    form.resetFields();
    setEditing(null);
  };

  return (
    <Card title="Thêm / Sửa bài viết">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="slug" label="Slug">
          <Input />
        </Form.Item>

        <Form.Item name="image" label="Ảnh">
          <Input />
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Select mode="tags" />
        </Form.Item>

        <Form.Item name="status" label="Trạng thái">
          <Select>
            <Select.Option value="draft">Nháp</Select.Option>
            <Select.Option value="published">Đã đăng</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="content" label="Nội dung">
          <Input.TextArea rows={5} />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form>
    </Card>
  );
}