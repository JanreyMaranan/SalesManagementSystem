import AppShell from '../components/AppShell'

const dummyCustomers = [
  { custNo: 'C0001', custName: 'Juan dela Cruz', address: '123 Rizal St, Manila', payterm: 'COD' },
  { custNo: 'C0002', custName: 'Pedro Reyes', address: '456 Mabini Ave, Quezon City', payterm: '30 days' },
  { custNo: 'C0003', custName: 'Maria Santos', address: '789 Bonifacio Blvd, Makati', payterm: '15 days' },
  { custNo: 'C0004', custName: 'Ana Garcia', address: '321 Luna St, Pasig', payterm: 'COD' },
  { custNo: 'C0005', custName: 'Jose Reyes', address: '654 Aguinaldo Ave, Taguig', payterm: '60 days' },
]

function LookupCustomersPage() {
  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-6">Customers</h2>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Cust No</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Pay Term</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyCustomers.map(c => (
              <tr key={c.custNo} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{c.custNo}</td>
                <td className="px-4 py-3">{c.custName}</td>
                <td className="px-4 py-3 text-gray-500">{c.address}</td>
                <td className="px-4 py-3">{c.payterm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  )
}

export default LookupCustomersPage