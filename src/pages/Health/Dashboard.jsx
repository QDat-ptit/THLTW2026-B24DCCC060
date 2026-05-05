import { useEffect, useState } from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line
} from "recharts";

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [health, setHealth] = useState([]);

  useEffect(() => {
    const w = localStorage.getItem("workouts");
    const h = localStorage.getItem("health");
    if (w) setWorkouts(JSON.parse(w));
    if (h) setHealth(JSON.parse(h));
  }, []);

  const total = workouts.length;
  const calories = workouts.reduce((s, w) => s + Number(w.calories || 0), 0);

  const chartData = workouts.map((w, i) => ({
    name: `Buổi ${i + 1}`,
    calories: Number(w.calories || 0),
  }));

  const weightData = health.map((h, i) => ({
    name: `Ngày ${i + 1}`,
    weight: Number(h.weight),
  }));

  return (
    <>
      <Row gutter={16}>
        <Col span={6}><Card><Statistic title="Buổi tập" value={total} /></Card></Col>
        <Col span={6}><Card><Statistic title="Calo" value={calories} /></Card></Col>
        <Col span={6}><Card><Statistic title="Streak" value={5} /></Card></Col>
        <Col span={6}><Card><Statistic title="Goal %" value={70} suffix="%" /></Card></Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Calo theo buổi">
            <BarChart width={400} height={250} data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calories" />
            </BarChart>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Cân nặng">
            <LineChart width={400} height={250} data={weightData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="weight" />
            </LineChart>
          </Card>
        </Col>
      </Row>
    </>
  );
}