'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const data = [
  { cause: 'Erro de especificação', total: 32 },
  { cause: 'Execução fora do projeto', total: 21 },
  { cause: 'Erro de compra', total: 18 },
  { cause: 'Compatibilização', total: 14 },
  { cause: 'Perda em obra', total: 9 }
];

export default function RootCausesChart() {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout='vertical'>
          <CartesianGrid strokeDasharray='3 3' />

          <XAxis type='number' />

          <YAxis type='category' dataKey='cause' width={160} />

          <Tooltip />

          <Bar dataKey='total' radius={[4, 4, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
