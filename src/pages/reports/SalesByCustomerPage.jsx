import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const data = [
  { custName: 'Juan dela Cruz', totalTransactions: 18, totalSpend: 42000 },
  { custName: 'Maria Santos', totalTransactions: 15, totalSpend: 38000 },
  { custName: 'Pedro Reyes', totalTransactions: 12, totalSpend: 29000 },
  { custName: 'Ana Garcia', totalTransactions: 9, totalSpend: 21000 },
  { custName: 'Jose Reyes', totalTransactions: 7, totalSpend: 15000 },
]

function SalesByCustomerPage() {
  const [sortField, setSortField] = useState('totalSpend')
  const [sortDir, setSortDir] = useState('desc')

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  const sorted = [...data].sort((a, b) => {
    if (sortDir === 'asc') return a[sortField] > b[sortField] ? 1 : -1
    return a[sortField] < b[sortField] ? 1 : -1
  })

  const arrow = (field) => sortField === field ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ' ↕'
  const topCustomer = [...data].sort((a, b) => b.totalSpend - a.totalSpend)[0]

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-400 uppercase">Top Customer</span>
          <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">
            ⭐ {topCustomer.custName} — ₱{topCustomer.totalSpend.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Spend by Customer</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sorted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="custName" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
            <Bar dataKey="totalSpend" fill="#7c3aed" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th
                className="px-4 py-3 text-left cursor-pointer hover:text-blue-600"
                onClick={() => handleSort('custName')}
              >
                Customer{arrow('custName')}
              </th>
              <th
                className="px-4 py-3 text-center cursor-pointer hover:text-blue-600"
                onClick={() => handleSort('totalTransactions')}
              >
                Transactions{arrow('totalTransactions')}
              </th>
              <th
                className="px-4 py-3 text-right cursor-pointer hover:text-blue-600"
                onClick={() => handleSort('totalSpend')}
              >
                Total Spend{arrow('totalSpend')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((row, i) => (
              <tr key={i} className={`hover:bg-gray-50 ${row.custName === topCustomer.custName ? 'bg-yellow-50' : ''}`}>
                <td className="px-4 py-3 font-medium text-gray-700">
                  {row.custName === topCustomer.custName && <span className="mr-1">⭐</span>}
                  {row.custName}
                </td>
                <td className="px-4 py-3 text-center">{row.totalTransactions}</td>
                <td className="px-4 py-3 text-right font-semibold text-purple-600">₱{row.totalSpend.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SalesByCustomerPage