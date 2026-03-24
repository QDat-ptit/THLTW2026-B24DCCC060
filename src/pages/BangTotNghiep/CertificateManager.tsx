import { Form, Input, Button, Select, DatePicker, Table } from 'antd';

export default ({
  books,
  setBooks,
  decisions,
  fields,
  certificates,
  setCertificates
}: any) => {

  const onFinish = (values: any) => {

    const bookIndex = books.findIndex((b: any) => b.id === values.bookId);
    if (bookIndex === -1) return;

    const newBooks = [...books];
    newBooks[bookIndex].current += 1;

    const soVaoSo = newBooks[bookIndex].current;

    const newItem = {
      id: Date.now(),
      ...values,
      soVaoSo,
    };

    setCertificates([...certificates, newItem]);
    setBooks(newBooks);
  };

  const dynamicColumns = fields.map((f: any) => ({
    title: f.name,
    dataIndex: f.name,
  }));

  return (
    <>
      <Form onFinish={onFinish}>

        <Form.Item name="msv" label="MSV" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="name" label="Họ tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="bookId" label="Sổ" rules={[{ required: true }]}>
          <Select>
            {books.map((b: any) => (
              <Select.Option key={b.id} value={b.id}>
                {b.year}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="decisionId" label="Quyết định">
          <Select>
            {decisions.map((d: any) => (
              <Select.Option key={d.id} value={d.id}>
                {d.soQD}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* FIELD ĐỘNG */}
        {fields.map((f: any) => (
          <Form.Item key={f.id} name={f.name} label={f.name}>
            {f.type === 'string' && <Input />}
            {f.type === 'number' && <Input type="number" />}
            {f.type === 'date' && <DatePicker />}
          </Form.Item>
        ))}

        <Button type="primary" htmlType="submit">
          Thêm
        </Button>

      </Form>

      <Table
        dataSource={certificates}
        rowKey="id"
        columns={[
          { title: 'MSV', dataIndex: 'msv' },
          { title: 'Họ tên', dataIndex: 'name' },
          { title: 'Số vào sổ', dataIndex: 'soVaoSo' },
          ...dynamicColumns,
        ]}
      />
    </>
  );
};