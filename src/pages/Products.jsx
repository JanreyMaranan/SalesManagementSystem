import AppShell from '../components/AppShell'

const dummyProducts = [
  { prodCode: 'PR0001', description: 'Office Chair', unit: 'pc', currentPrice: 1500.00 },
  { prodCode: 'PR0002', description: 'Standing Desk', unit: 'pc', currentPrice: 1000.00 },
  { prodCode: 'PR0003', description: 'Monitor Stand', unit: 'pc', currentPrice: 250.00 },
  { prodCode: 'PR0004', description: 'Keyboard', unit: 'pc', currentPrice: 500.00 },
  { prodCode: 'PR0005', description: 'Mouse', unit: 'pc', currentPrice: 266.67 },
]

function LookupProductsPage() {
  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-6">Products</h2>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Product Code</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Unit</th>
              <th className="px-4 py-3 text-right">Current Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyProducts.map(p => (
              <tr key={p.prodCode} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{p.prodCode}</td>
                <td className="px-4 py-3">{p.description}</td>
                <td className="px-4 py-3">{p.unit}</td>
                <td className="px-4 py-3 text-right">₱{p.currentPrice.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  )
}

export default LookupProductsPage