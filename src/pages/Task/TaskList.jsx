import { useState } from "react";
import { Table, Input, Button } from "antd";
import TaskForm from "./TaskForm";

export default function TaskList({ tasks, setTasks }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { title: "Tên", dataIndex: "title" },
    { title: "Deadline", dataIndex: "deadline" },
    { title: "Trạng thái", dataIndex: "status" },
  ];

  return (
    <>
      <Input
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 200, marginRight: 10 }}
      />

      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm
      </Button>

      <Table rowKey="id" dataSource={filtered} columns={columns} />

      <TaskForm open={open} setOpen={setOpen} setTasks={setTasks} />
    </>
  );
}