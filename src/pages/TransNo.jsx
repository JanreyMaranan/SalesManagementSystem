import EditLineItemModal from '../components/modals/EditLineItemModal'
import AddLineItemModal from '../components/modals/AddLineItemModal'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'

const dummySales = [
  { transNo: 'TR000001', salesDate: '2024-01-15', custName: 'Juan dela Cruz', empName: 'Santos, Maria' },
  { transNo: 'TR000002', salesDate: '2024-01-16', custName: 'Pedro Reyes', empName: 'Lopez, Carlos' },
]

const dummyDetails = {
  TR000001: [
    { prodCode: 'PR0001', description: 'Office Chair', quantity: 2, unitPrice: 1500.00, record_status: 'ACTIVE' },
    { prodCode: 'PR0002', description: 'Standing Desk', quantity: 1, unitPrice: 1000.00, record_status: 'ACTIVE' },
    { prodCode: 'PR0003', description: 'Monitor Stand', quantity: 2, unitPrice: 250.00, record_status: 'INACTIVE' },
  ],
  TR000002: [
    { prodCode: 'PR0004', description: 'Keyboard', quantity: 3, unitPrice: 500.00, record_status: 'ACTIVE' },
    { prodCode: 'PR0005', description: 'Mouse', quantity: 3, unitPrice: 266.67, record_status: 'ACTIVE' },
  ],
}

function SalesDetailPage() {
  const { transNo } = useParams()
  const navigate = useNavigate()
  const [showAddLineItem, setShowAddLineItem] = useState(false)
const [selectedItem, setSelectedItem] = useState(null)

  // Simulating user type — will come from context later
  const userType = 'ADMIN'

  const sale = dummySales.find(s => s.transNo === transNo)
  const details = dummyDetails[transNo] || []

  const visibleDetails = userType === 'USER'
    ? details.filter(d => d.record_status === 'ACTIVE')
    : details

  if (!sale) {
    return (
      <AppShell>
        <p className="text-gray-500">Transaction not found.</p>
      </AppShell>
    )
  }

  return (
    <AppShell>

      {/* Back button */}
      <button
        onClick={() => navigate('/sales')}
        className="text-sm text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Transactions
      </button>

      {/* Transaction Header */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Transaction <span className="text-blue-600">{sale.transNo}</span>
        </h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Date</p>
            <p className="text-gray-700 font-medium">{sale.salesDate}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Customer</p>
            <p className="text-gray-700 font-medium">{sale.custName}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Employee</p>
            <p className="text-gray-700 font-medium">{sale.empName}</p>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-700">Line Items</h3>
        <button
          onClick={() => setShowAddLineItem(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          + Add Line Item
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Product Code</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-center">Quantity</th>
              <th className="px-4 py-3 text-right">Unit Price</th>
              <th className="px-4 py-3 text-right">Total</th>
              {userType !== 'USER' && (
                <th className="px-4 py-3 text-left">Stamp</th>
              )}
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visibleDetails.map(item => (
              <tr
                key={item.prodCode}
                className={item.record_status === 'INACTIVE' ? 'bg-red-50 text-gray-400' : 'hover:bg-gray-50'}
              >
                <td className="px-4 py-3 font-medium text-blue-600">{item.prodCode}</td>
                <td className="px-4 py-3">{item.description}</td>
                <td className="px-4 py-3 text-center">{item.quantity}</td>
                <td className="px-4 py-3 text-right">₱{item.unitPrice.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-medium">
                  ₱{(item.quantity * item.unitPrice).toLocaleString()}
                </td>
                {userType !== 'USER' && (
                  <td className="px-4 py-3 text-xs text-gray-400">—</td>
                )}
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1 rounded-lg transition"
                    >
                      Edit
                    </button>
                    {userType === 'SUPERADMIN' && (
                      <button className="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-lg transition">
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleDetails.length === 0 && (
          <p className="text-center text-gray-400 py-8">No line items found.</p>
        )}
      </div>

      {showAddLineItem && (
        <AddLineItemModal
          transNo={transNo}
          onClose={() => setShowAddLineItem(false)}
        />
      )}

      {selectedItem && (
        <EditLineItemModal
          item={selectedItem}
          transNo={transNo}
          onClose={() => setSelectedItem(null)}
        />
      )}

    </AppShell>
  )
}

export default SalesDetailPage