import { memo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ProgressChart({ data = [] }) {
  if (!data.length) return null;
  return (
    <div className="h-64 w-full mt-4" role="img" aria-label="Goal progress line chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 6, right: 8, left: -16, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E2A4A" vertical={false} />
          <XAxis dataKey="name" stroke="#6B7280" tick={{fill: '#6B7280'}} axisLine={false} tickLine={false} />
          <YAxis stroke="#6B7280" tick={{fill: '#6B7280'}} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#101935', borderColor: '#1E2A4A', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#8B7FFF' }}
          />
          <Line type="monotone" dataKey="value" stroke="#8B7FFF" strokeWidth={3} dot={{ fill: '#8B7FFF', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#06b6d4' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(ProgressChart);
