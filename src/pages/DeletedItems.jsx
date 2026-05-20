import { useState } from 'react'
import AppShell from '../components/AppShell'

const dummyDeletedSales = [
  { transNo: 'TR000004', salesDate: '2024-01-18', custName: 'Ana Garcia', empName: 'Santos, Maria', totalAmount: 1200.00 },
  { transNo: 'TR000007', salesDate: '2024-01-22', custName: 'Jose Reyes', empName: 'Lopez, Carlos', totalAmount: 3400.00 },
]

const dummyDeletedDetails = [
  { transNo: 'TR000001', prodCode: 'PR0003', description: 'Monitor Stand', quantity: 2, unitPrice: 250.00 },
  { transNo: 'TR000002', prodCode: 'PR0001', description: 'Office Chair', quantity: 1, unitPrice: 1500.00 },
]

function DeletedItemsPage() {
  const [activeTab, setActiveTab] = useState('transactions')

  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-6">Deleted Items</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
            activeTab === 'transactions'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          Transactions
        </button>
        <button
          onClick={() => setActiveTab('lineitems')}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
            activeTab === 'lineitems'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          Line Items
        </button>
      </div>

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Trans No</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Employee</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dummyDeletedSales.map(sale => (
                <tr key={sale.transNo} className="bg-red-50 hover:bg-red-100">
                  <td className="px-4 py-3 font-medium text-red-500">{sale.transNo}</td>
                  <td className="px-4 py-3 text-gray-500">{sale.salesDate}</td>
                  <td className="px-4 py-3 text-gray-500">{sale.custName}</td>
                  <td className="px-4 py-3 text-gray-500">{sale.empName}</td>
                  <td className="px-4 py-3 text-right text-gray-500">₱{sale.totalAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => alert(`Recover ${sale.transNo}? (will connect to Supabase later)`)}
                      className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-lg transition font-medium"
                    >
                      Recover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {dummyDeletedSales.length === 0 && (
            <p className="text-center text-gray-400 py-8">No deleted transactions.</p>
          )}
        </div>
      )}

      {/* Line Items Tab */}
      {activeTab === 'lineitems' && (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Trans No</th>
                <th className="px-4 py-3 text-left">Product Code</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-center">Quantity</th>
                <th className="px-4 py-3 text-right">Unit Price</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dummyDeletedDetails.map((item, index) => (
                <tr key={index} className="bg-red-50 hover:bg-red-100">
                  <td className="px-4 py-3 font-medium text-red-500">{item.transNo}</td>
                  <td className="px-4 py-3 text-gray-500">{item.prodCode}</td>
                  <td className="px-4 py-3 text-gray-500">{item.description}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{item.quantity}</td>
                  <td className="px-4 py-3 text-right text-gray-500">₱{item.unitPrice.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => alert(`Recover ${item.prodCode} from ${item.transNo}? (will connect to Supabase later)`)}
                      className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-lg transition font-medium"
                    >
                      Recover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {dummyDeletedDetails.length === 0 && (
            <p className="text-center text-gray-400 py-8">No deleted line items.</p>
          )}
        </div>
      )}

    </AppShell>
  )
}

export default DeletedItemsPage