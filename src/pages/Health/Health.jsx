import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Tag } from "antd";

export default function Health() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const stored = localStorage.getItem("health");
    if (stored) setData(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("health", JSON.stringify(data));
  }, [data]);

  const calcBMI = (w, h) => w / Math.pow(h / 100, 2);

  const getTag = (bmi) => {
    if (bmi < 18.5) return <Tag color="blue">Thiếu cân</Tag>;
    if (bmi < 25) return <Tag color="green">Bình thường</Tag>;
    if (bmi < 30) return <Tag color="gold">Thừa cân</Tag>;
    return <Tag color="red">Béo phì</Tag>;
  };

  const add = () => {
    form.validateFields().then(v => {
      const bmi = calcBMI(v.weight, v.height);
      setData([...data, { ...v, bmi, id: Date.now() }]);
      setOpen(false);
      form.resetFields();
    });
  };

  const columns = [
    { title: "Cân nặng", dataIndex: "weight" },
    { title: "Chiều cao", dataIndex: "height" },
    { title: "BMI", render: (_, r) => r.bmi.toFixed(2) },
    { title: "Phân loại", render: (_, r) => getTag(r.bmi) },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>Thêm</Button>
      <Table rowKey="id" dataSource={data} columns={columns} />

      <Modal open={open} onOk={add} onCancel={() => setOpen(false)}>
        <Form form={form}>
          <Form.Item name="weight" label="Cân nặng"><Input /></Form.Item>
          <Form.Item name="height" label="Chiều cao"><Input /></Form.Item>
        </Form>
      </Modal>
    </>
  );
}