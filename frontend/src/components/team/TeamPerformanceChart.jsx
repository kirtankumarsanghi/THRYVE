import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', Engineering: 40, Product: 24, Design: 24 },
  { name: 'Week 2', Engineering: 30, Product: 13, Design: 22 },
  { name: 'Week 3', Engineering: 20, Product: 58, Design: 22 },
  { name: 'Week 4', Engineering: 27, Product: 39, Design: 20 },
  { name: 'Week 5', Engineering: 18, Product: 48, Design: 21 },
  { name: 'Week 6', Engineering: 23, Product: 38, Design: 25 },
  { name: 'Week 7', Engineering: 34, Product: 43, Design: 21 },
];

export default function TeamPerformanceChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B7FFF" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8B7FFF" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34D399" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2e303e" vertical={false} />
          <XAxis dataKey="name" stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
          <YAxis stroke="#6b7280" tick={{fill: '#6b7280', fontSize: 12}} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1a1b26', borderColor: '#2e303e', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#e5e7eb' }}
          />
          <Area type="monotone" dataKey="Engineering" stroke="#8B7FFF" fillOpacity={1} fill="url(#colorEng)" />
          <Area type="monotone" dataKey="Product" stroke="#34D399" fillOpacity={1} fill="url(#colorProd)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
