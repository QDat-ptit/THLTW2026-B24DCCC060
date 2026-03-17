const StatisticsPanel = ({ appointments }: any) => {

  const total = appointments.length;

  return (
    <div>

      <h2>Thống kê</h2>

      <div>
        Tổng số lịch: {total}
      </div>

    </div>
  );
};

export default StatisticsPanel;