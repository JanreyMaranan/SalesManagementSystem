import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const data = [
  { empName: 'Santos, M.', totalTransactions: 42, totalRevenue: 85000 },
  { empName: 'Lopez, C.', totalTransactions: 35, totalRevenue: 72000 },
  { empName: 'Reyes, A.', totalTransactions: 28, totalRevenue: 61000 },
  { empName: 'Cruz, M.', totalTransactions: 19, totalRevenue: 43000 },
]

function SalesByEmployeePage() {
  const [sortField, setSortField] = useState('totalRevenue')
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Revenue by Employee</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sorted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="empName" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
            <Bar dataKey="totalRevenue" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th
                className="px-4 py-3 text-left cursor-pointer hover:text-blue-600"
                onClick={() => handleSort('empName')}
              >
                Employee{arrow('empName')}
              </th>
              <th
                className="px-4 py-3 text-center cursor-pointer hover:text-blue-600"
                onClick={() => handleSort('totalTransactions')}
              >
                Transactions{arrow('totalTransactions')}
              </th>
              <th
                className="px-4 py-3 text-right cursor-pointer hover:text-blue-600"
                onClick={() => handleSort('totalRevenue')}
              >
                Total Revenue{arrow('totalRevenue')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sorted.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">{row.empName}</td>
                <td className="px-4 py-3 text-center">{row.totalTransactions}</td>
                <td className="px-4 py-3 text-right font-semibold text-blue-600">₱{row.totalRevenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SalesByEmployeePage