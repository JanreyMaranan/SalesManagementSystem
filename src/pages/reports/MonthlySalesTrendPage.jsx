import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

const allData = [
  { saleMonth: '2024-01', label: 'Jan 2024', totalTransactions: 18, totalRevenue: 42000 },
  { saleMonth: '2024-02', label: 'Feb 2024', totalTransactions: 22, totalRevenue: 51000 },
  { saleMonth: '2024-03', label: 'Mar 2024', totalTransactions: 15, totalRevenue: 38000 },
  { saleMonth: '2024-04', label: 'Apr 2024', totalTransactions: 30, totalRevenue: 74000 },
  { saleMonth: '2024-05', label: 'May 2024', totalTransactions: 25, totalRevenue: 63000 },
  { saleMonth: '2024-06', label: 'Jun 2024', totalTransactions: 28, totalRevenue: 69000 },
]

function MonthlySalesTrendPage() {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const filtered = allData.filter(row => {
    const matchesFrom = dateFrom ? row.saleMonth >= dateFrom : true
    const matchesTo = dateTo ? row.saleMonth <= dateTo : true
    return matchesFrom && matchesTo
  })

  return (
    <div className="space-y-6">

      {/* Date Range Filter */}
      <div className="bg-white rounded-2xl shadow p-4 flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Month From</label>
          <input
            type="month"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Month To</label>
          <input
            type="month"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={() => { setDateFrom(''); setDateTo('') }}
          className="border border-gray-300 text-gray-500 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg transition"
        >
          Clear
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Monthly Sales Trend</h3>
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No data for this period.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filtered}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="totalRevenue" name="Revenue (₱)" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="totalTransactions" name="Transactions" fill="#93c5fd" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Month</th>
              <th className="px-4 py-3 text-center">Transactions</th>
              <th className="px-4 py-3 text-right">Total Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">{row.label}</td>
                <td className="px-4 py-3 text-center">{row.totalTransactions}</td>
                <td className="px-4 py-3 text-right font-semibold text-blue-600">₱{row.totalRevenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-8">No data for this period.</p>
        )}
      </div>
    </div>
  )
}

export default MonthlySalesTrendPage