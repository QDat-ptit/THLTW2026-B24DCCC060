import { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";

import Dashboard from "./Dashboard";
import Board from "./Board";
import TaskList from "./TaskList";

const { Header, Content, Sider } = Layout;

export default function TaskApp() {
  const [page, setPage] = useState("dashboard");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) setTasks(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard tasks={tasks} />;
      case "board": return <Board tasks={tasks} setTasks={setTasks} />;
      case "list": return <TaskList tasks={tasks} setTasks={setTasks} />;
      default: return <Dashboard tasks={tasks} />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="dark">
        <div style={{
          color: "#fff",
          padding: 16,
          fontWeight: 600,
          fontSize: 18
        }}>
          🚀 Task App
        </div>

        <Menu
          theme="dark"
          selectedKeys={[page]}
          onClick={(e) => setPage(e.key)}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard"
            },
            {
              key: "board",
              icon: <AppstoreOutlined />,
              label: "Kanban"
            },
            {
              key: "list",
              icon: <UnorderedListOutlined />,
              label: "Task List"
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{
          background: "#fff",
          fontSize: 20,
          fontWeight: 600,
          paddingLeft: 20
        }}>
          📋 Task Management
        </Header>

        <Content style={{
          margin: 16,
          padding: 20,
          background: "#f5f7fa",
          borderRadius: 10
        }}>
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
}