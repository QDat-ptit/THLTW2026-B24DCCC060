import { useState, useEffect } from "react";
import {
  Table, Button, Modal, Form,
  Input, Select, Popconfirm, Card, Timeline
} from "antd";

export default function Workouts() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const stored = localStorage.getItem("workouts");
    if (stored) setData(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(data));
  }, [data]);

  const submit = () => {
    form.validateFields().then((v) => {
      if (editing) {
        setData(data.map(d => d.id === editing.id ? { ...d, ...v } : d));
      } else {
        setData([...data, { ...v, id: Date.now() }]);
      }
      setOpen(false);
      setEditing(null);
      form.resetFields();
    });
  };

  const columns = [
    { title: "Ngày", dataIndex: "date" },
    { title: "Loại", dataIndex: "type" },
    { title: "Thời lượng", dataIndex: "duration" },
    { title: "Calo", dataIndex: "calories" },
    {
      title: "Action",
      render: (_, r) => (
        <>
          <Button onClick={() => {
            setEditing(r);
            form.setFieldsValue(r);
            setOpen(true);
          }}>Sửa</Button>

          <Popconfirm onConfirm={() =>
            setData(data.filter(i => i.id !== r.id))
          }>
            <Button danger>Xóa</Button>
          </Popconfirm>
        </>
      )
    }
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm buổi tập
      </Button>

      <Table rowKey="id" dataSource={data} columns={columns} />

      <Card title="Lịch sử gần đây" style={{ marginTop: 20 }}>
        <Timeline
          items={data.slice(-5).map(w => ({
            children: `${w.date} - ${w.type} (${w.calories} cal)`
          }))}
        />
      </Card>

      <Modal open={open} onOk={submit} onCancel={() => setOpen(false)}>
        <Form form={form}>
          <Form.Item name="date" label="Ngày"><Input /></Form.Item>
          <Form.Item name="type" label="Loại">
            <Select options={[
              { value: "Cardio" },
              { value: "Strength" },
              { value: "Yoga" }
            ]}/>
          </Form.Item>
          <Form.Item name="duration" label="Thời lượng"><Input /></Form.Item>
          <Form.Item name="calories" label="Calo"><Input /></Form.Item>
        </Form>
      </Modal>
    </>
  );
}