import Toast from '../components/Toast'
import { useNavigate } from 'react-router-dom'
import DeleteSaleDialog from '../components/modals/DeleteSaleDialog'
import EditSaleModal from '../components/modals/EditSaleModal'
import { useState } from 'react'
import AddSaleModal from '../components/modals/AddSaleModal'
import AppShell from '../components/AppShell'

const dummySales = [
  { transNo: 'TR000001', salesDate: '2024-01-15', custName: 'Juan dela Cruz', empName: 'Santos, Maria', lineItemCount: 3, totalAmount: 4500.00, record_status: 'ACTIVE' },
  { transNo: 'TR000002', salesDate: '2024-01-16', custName: 'Pedro Reyes', empName: 'Lopez, Carlos', lineItemCount: 2, totalAmount: 2300.00, record_status: 'ACTIVE' },
  { transNo: 'TR000003', salesDate: '2024-01-17', custName: 'Maria Santos', empName: 'Reyes, Ana', lineItemCount: 5, totalAmount: 8750.00, record_status: 'ACTIVE' },
  { transNo: 'TR000004', salesDate: '2024-01-18', custName: 'Ana Garcia', empName: 'Santos, Maria', lineItemCount: 1, totalAmount: 1200.00, record_status: 'INACTIVE' },
]

function SalesPage() {
  // Simulating user type — we'll get this from context later
  const [toast, setToast] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedSale, setSelectedSale] = useState(null)
  const [saleToDelete, setSaleToDelete] = useState(null)
  const navigate = useNavigate()
  const userType = 'SUPERADMIN'
const [filterCustomer, setFilterCustomer] = useState('')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')

  const visibleSales = userType === 'USER'
    ? dummySales.filter(s => s.record_status === 'ACTIVE')
    : dummySales

  

  const filteredSales = visibleSales.filter(sale => {
    const matchesCustomer = sale.custName.toLowerCase().includes(filterCustomer.toLowerCase())
    const matchesDateFrom = filterDateFrom ? sale.salesDate >= filterDateFrom : true
    const matchesDateTo = filterDateTo ? sale.salesDate <= filterDateTo : true
    return matchesCustomer && matchesDateFrom && matchesDateTo
  })

  return (
    <AppShell>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700">Sales Transactions</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
        >
          + Add Transaction
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-4 mb-4 flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Customer Name</label>
          <input
            type="text"
            value={filterCustomer}
            onChange={e => setFilterCustomer(e.target.value)}
            placeholder="Search customer..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Date From</label>
          <input
            type="date"
            value={filterDateFrom}
            onChange={e => setFilterDateFrom(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Date To</label>
          <input
            type="date"
            value={filterDateTo}
            onChange={e => setFilterDateTo(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={() => { setFilterCustomer(''); setFilterDateFrom(''); setFilterDateTo('') }}
          className="border border-gray-300 text-gray-500 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg transition"
        >
          Clear
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Trans No</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Employee</th>
              <th className="px-4 py-3 text-center">Items</th>
              <th className="px-4 py-3 text-right">Total</th>
              {userType !== 'USER' && (
                <th className="px-4 py-3 text-left">Stamp</th>
              )}
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredSales.map(sale => (
              <tr
                key={sale.transNo}
                className={sale.record_status === 'INACTIVE' ? 'bg-red-50 text-gray-400' : 'hover:bg-gray-50'}
              >
                <td
                  className="px-4 py-3 font-medium text-blue-600 cursor-pointer hover:underline"
                  onClick={() => navigate(`/sales/${sale.transNo}`)}
                >
                  {sale.transNo}
                </td>
                <td className="px-4 py-3">{sale.salesDate}</td>
                <td className="px-4 py-3">{sale.custName}</td>
                <td className="px-4 py-3">{sale.empName}</td>
                <td className="px-4 py-3 text-center">{sale.lineItemCount}</td>
                <td className="px-4 py-3 text-right">₱{sale.totalAmount.toLocaleString()}</td>
                {userType !== 'USER' && (
                  <td className="px-4 py-3 text-xs text-gray-400">—</td>
                )}
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedSale(sale)}
                      className="text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1 rounded-lg transition"
                    >
                      Edit
                    </button>
                    {userType === 'SUPERADMIN' && (
                      <button
                        onClick={() => setSaleToDelete(sale)}
                        className="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-lg transition"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSales.length === 0 && (
          <p className="text-center text-gray-400 py-8">No transactions found.</p>
        )}
      </div>

      {showAddModal && (
        <AddSaleModal
          onClose={() => {
            setShowAddModal(false)
            setToast({ message: 'Transaction added successfully!', type: 'success' })
          }}
        />
      )}
      {selectedSale && <EditSaleModal sale={selectedSale} onClose={() => setSelectedSale(null)} />}
      {saleToDelete && <DeleteSaleDialog sale={saleToDelete} onClose={() => setSaleToDelete(null)} />}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </AppShell>
  )
}

export default SalesPage
