import { useState } from "react";
import { Layout, Menu } from "antd";

// ❗ IMPORT ĐÚNG (KHÔNG CÓ {})
import Dashboard from "./Dashboard";
import Workouts from "./Workouts";
import Health from "./Health";
import Goals from "./Goals";
import Exercises from "./Exercises";

const { Header, Content, Sider } = Layout;

export default function IndexPage() {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard />;

      case "workouts":
        return <Workouts />;

      case "health":
        return <Health />;

      case "goals":
        return <Goals />;

      case "exercises":
        return <Exercises />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[page]}
          onClick={(e) => setPage(e.key)}
          items={[
            { key: "dashboard", label: "Dashboard" },
            { key: "workouts", label: "Nhật ký tập" },
            { key: "health", label: "Sức khỏe" },
            { key: "goals", label: "Mục tiêu" },
            { key: "exercises", label: "Bài tập" },
          ]}
        />
      </Sider>

      {/* MAIN */}
      <Layout>
        <Header style={{ background: "#fff", fontWeight: 600 }}>
          Fitness App
        </Header>

        <Content style={{ margin: 16 }}>
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
}