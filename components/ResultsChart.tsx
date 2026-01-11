import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { YearlyData } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ResultsChartProps {
  data: YearlyData[];
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ data }) => {
  return (
    <div className="h-80 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="year" 
            tick={{fontSize: 12, fill: '#64748b'}} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => `€${value/1000}k`} 
            tick={{fontSize: 12, fill: '#64748b'}}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend iconType="circle" />
          
          <Area 
            type="monotone" 
            dataKey="invested" 
            name="Capitale" 
            stackId="1" 
            stroke="#94a3b8" 
            fill="url(#colorInvested)" 
          />
          <Area 
            type="monotone" 
            dataKey="interest" 
            name="Interesse Netto" 
            stackId="1" 
            stroke="#4f46e5" 
            fill="url(#colorInterest)" 
          />
           <Area 
            type="monotone" 
            dataKey="tax" 
            name="Tasse" 
            stackId="1" 
            stroke="#ef4444" 
            fill="url(#colorTax)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};