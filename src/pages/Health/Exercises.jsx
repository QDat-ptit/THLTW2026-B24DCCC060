import { Card, Row, Col } from "antd";

export default function Exercises() {
  const data = [
    { name: "Push-up", level: "Dễ" },
    { name: "Squat", level: "Trung bình" },
    { name: "Plank", level: "Khó" },
  ];

  return (
    <Row gutter={16}>
      {data.map((e, i) => (
        <Col span={8} key={i}>
          <Card hoverable style={{ borderRadius: 12 }} title={e.name}>
            {e.level}
          </Card>
        </Col>
      ))}
    </Row>
  );
}