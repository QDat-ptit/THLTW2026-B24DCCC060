import { Rate, Button, Select } from 'antd';
import { useState } from 'react';

const RatingPanel = ({ employees, ratings, setRatings }: any) => {

  const [employeeId, setEmployeeId] = useState();
  const [value, setValue] = useState(0);

  const addRating = () => {
    setRatings([...ratings, { employeeId, value }]);
  };

  return (
    <div>

      <h2>Đánh giá nhân viên</h2>

      <Select
        style={{ width: 150 }}
        onChange={setEmployeeId}
      >
        {employees.map((e: any) => (
          <Select.Option key={e.id} value={e.id}>
            {e.name}
          </Select.Option>
        ))}
      </Select>

      <Rate onChange={setValue} />

      <Button onClick={addRating}>
        Gửi
      </Button>

    </div>
  );
};

export default RatingPanel;
