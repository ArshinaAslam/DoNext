import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface StatusChartProps {
  pending: number;
  inProgress: number;
  completed: number;
}

const COLORS = ["#ffce4d", "#4d7fff", "#4dffb8"];

const StatusChart = ({ pending, inProgress, completed }: StatusChartProps) => {
  const data = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Completed", value: completed },
  ];

  const hasData = pending + inProgress + completed > 0;

  if (!hasData) {
    return <p className="chart-empty">No data yet — add a task to see your breakdown</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} stroke="none" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: "#1a1433", border: "1px solid #2a2147", borderRadius: 10 }}
          labelStyle={{ color: "#f1edf7" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatusChart;