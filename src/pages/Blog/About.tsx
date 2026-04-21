import { Card, Avatar } from 'antd';

export default function About() {
  return (
    <div style={{ padding: 20 }}>
      <Card>
        <Avatar size={100} src="https://i.pravatar.cc/150" />
        <h2>Tạ Quang Đạt</h2>
        <p>Sinh viên CNTT PTIT</p>
        <p>Kỹ năng: React, JS, Node</p>
      </Card>
    </div>
  );
}