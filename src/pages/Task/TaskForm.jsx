import { Modal, Form, Input, DatePicker, Select } from "antd";
import { v4 as uuid } from "uuid";

export default function TaskForm({ open, setOpen, setTasks }) {
  const [form] = Form.useForm();

  const submit = () => {
    form.validateFields().then(v => {
      setTasks(prev => [
        ...prev,
        {
          id: uuid(),
          title: v.title,
          deadline: v.deadline?.format("YYYY-MM-DD"),
          status: "todo",
          priority: v.priority,
        },
      ]);

      setOpen(false);
      form.resetFields();
    });
  };

  return (
    <Modal open={open} onOk={submit} onCancel={() => setOpen(false)}>
      <Form form={form}>
        <Form.Item name="title" label="Tên task" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="deadline" label="Deadline">
          <DatePicker />
        </Form.Item>

        <Form.Item name="priority" label="Ưu tiên">
          <Select
            options={[
              { value: "high", label: "Cao" },
              { value: "medium", label: "Trung bình" },
              { value: "low", label: "Thấp" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}