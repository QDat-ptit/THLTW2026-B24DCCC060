import { Card, Row, Col, Statistic } from "antd";

export default function Dashboard({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === "done").length;
  const overdue = tasks.filter(
    t => t.deadline && new Date(t.deadline) < new Date() && t.status !== "done"
  ).length;

  return (
    <Row gutter={16}>
      {[ 
        { title: "Tổng Task", value: total },
        { title: "Hoàn thành", value: done },
        { title: "Quá hạn", value: overdue },
      ].map((item, i) => (
        <Col span={8} key={i}>
          <Card
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <Statistic title={item.title} value={item.value} />
          </Card>
        </Col>
      ))}
    </Row>
  );
}