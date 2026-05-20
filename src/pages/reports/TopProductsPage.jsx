import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const data = [
  { description: 'Office Chair', totalQty: 85, totalRevenue: 127500 },
  { description: 'Standing Desk', totalQty: 62, totalRevenue: 62000 },
  { description: 'Keyboard', totalQty: 120, totalRevenue: 60000 },
  { description: 'Mouse', totalQty: 110, totalRevenue: 29334 },
  { description: 'Monitor Stand', totalQty: 45, totalRevenue: 11250 },
]

function TopProductsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Top Products by Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="description" type="category" tick={{ fontSize: 11 }} width={100} />
            <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
            <Bar dataKey="totalRevenue" fill="#059669" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-center">Total Qty Sold</th>
              <th className="px-4 py-3 text-right">Total Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-bold text-gray-400">#{i + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-700">{row.description}</td>
                <td className="px-4 py-3 text-center">{row.totalQty}</td>
                <td className="px-4 py-3 text-right font-semibold text-green-600">₱{row.totalRevenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopProductsPage