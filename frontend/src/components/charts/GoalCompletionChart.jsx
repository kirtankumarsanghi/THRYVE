import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { goalCompletionData } from '../../data/mockData';

const COLORS = ['#22D3EE', '#8B7FFF', '#f59e0b', '#ef4444'];

export default function GoalCompletionChart() {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={goalCompletionData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={85}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {goalCompletionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#101935', borderColor: '#1E2A4A', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
