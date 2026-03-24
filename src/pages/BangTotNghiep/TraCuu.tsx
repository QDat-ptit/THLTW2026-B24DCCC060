import { Input, Button, Table } from 'antd';
import { useState } from 'react';

export default ({ certificates, decisions, setDecisions }: any) => {

  const [filters, setFilters] = useState<any>({});
  const [result, setResult] = useState([]);

  const search = () => {

    const filled = Object.values(filters).filter(Boolean);

    if (filled.length < 2) {
      alert('Nhập ít nhất 2 điều kiện');
      return;
    }

    const res = certificates.filter((c: any) =>
      (!filters.msv || c.msv.includes(filters.msv)) &&
      (!filters.name || c.name.includes(filters.name))
    );

    // tăng lượt tra cứu
    const newDecisions = decisions.map((d: any) => {
      if (res.find((c: any) => c.decisionId === d.id)) {
        return { ...d, count: d.count + 1 };
      }
      return d;
    });

    setDecisions(newDecisions);
    setResult(res);
  };

  return (
    <>
      <Input placeholder="MSV" onChange={(e) => setFilters({ ...filters, msv: e.target.value })} />
      <Input placeholder="Họ tên" onChange={(e) => setFilters({ ...filters, name: e.target.value })} />

      <Button onClick={search}>Tra cứu</Button>

      <Table
        dataSource={result}
        rowKey="id"
        columns={[
          { title: 'MSV', dataIndex: 'msv' },
          { title: 'Họ tên', dataIndex: 'name' },
        ]}
      />
    </>
  );
};