import { useState } from "react";
import { Card, Progress, Button, Drawer, Input } from "antd";

export default function Goals() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const add = () => {
    setData([...data, {
      id: Date.now(),
      name,
      current: 0,
      target: 10
    }]);
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Thêm mục tiêu</Button>

      {data.map(g => (
        <Card key={g.id} title={g.name} style={{ marginTop: 10, borderRadius: 12 }}>
          <p>{g.current} / {g.target}</p>
          <Progress percent={(g.current / g.target) * 100} />
        </Card>
      ))}

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Input onChange={(e) => setName(e.target.value)} />
        <Button onClick={add}>Lưu</Button>
      </Drawer>
    </>
  );
}