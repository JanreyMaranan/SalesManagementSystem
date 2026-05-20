import AppShell from '../components/AppShell'

const dummyPrices = [
  { prodCode: 'PR0001', effDate: '2023-01-01', unitPrice: 1200.00 },
  { prodCode: 'PR0001', effDate: '2024-01-01', unitPrice: 1500.00 },
  { prodCode: 'PR0002', effDate: '2023-01-01', unitPrice: 800.00 },
  { prodCode: 'PR0002', effDate: '2024-01-01', unitPrice: 1000.00 },
  { prodCode: 'PR0003', effDate: '2023-06-01', unitPrice: 200.00 },
  { prodCode: 'PR0003', effDate: '2024-01-01', unitPrice: 250.00 },
  { prodCode: 'PR0004', effDate: '2023-01-01', unitPrice: 450.00 },
  { prodCode: 'PR0004', effDate: '2024-01-01', unitPrice: 500.00 },
  { prodCode: 'PR0005', effDate: '2024-01-01', unitPrice: 266.67 },
]

function LookupPricesPage() {
  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-6">Price History</h2>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Product Code</th>
              <th className="px-4 py-3 text-left">Effective Date</th>
              <th className="px-4 py-3 text-right">Unit Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyPrices.map((p, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{p.prodCode}</td>
                <td className="px-4 py-3 text-gray-500">{p.effDate}</td>
                <td className="px-4 py-3 text-right">₱{p.unitPrice.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  )
}

export default LookupPricesPage