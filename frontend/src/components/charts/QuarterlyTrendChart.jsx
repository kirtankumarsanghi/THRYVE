import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Q1', achieved: 85, planned: 100 },
  { name: 'Q2', achieved: 92, planned: 100 },
  { name: 'Q3', achieved: 78, planned: 100 },
  { name: 'Q4', achieved: 0, planned: 100 },
];

export default function QuarterlyTrendChart() {
  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2A4A" vertical={false} />
          <XAxis dataKey="name" stroke="#6B7280" tick={{fill: '#6B7280'}} axisLine={false} tickLine={false} />
          <YAxis stroke="#6B7280" tick={{fill: '#6B7280'}} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#101935', borderColor: '#1E2A4A', borderRadius: '8px', color: '#fff' }}
            cursor={{fill: '#1E2A4A', opacity: 0.4}}
          />
          <Bar dataKey="planned" fill="#1E2A4A" radius={[4, 4, 0, 0]} />
          <Bar dataKey="achieved" fill="#06b6d4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
