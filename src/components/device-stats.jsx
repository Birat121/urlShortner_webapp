import { Pie, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DeviceStats({ stats }) {
  const deviceCount = stats.reduce((acc, item) => {
    if (acc[item.city]) {
      acc[item.city] += 1;
    } else {
      acc[item.city] = 1;
    }
    return acc;
  }, {});

  const result = Object.entries(deviceCount).map((device) => ({
    device,
    count: deviceCount[device],
  }));
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <Pie width={700} height={400}>
          <Pie
            data={result}
            dataKey="count"
            labelLine={false}
            label={({ device, percent }) =>
              `${device} (${(percent * 100).toFixed(0)}%)`
            }
          />
          {result.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </ResponsiveContainer>
    </div>
  );
}
