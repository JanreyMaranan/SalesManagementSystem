import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import AppShell from '../components/AppShell'
import AddSaleModal from '../components/modals/AddSaleModal'
import EditSaleModal from '../components/modals/EditSaleModal'
import DeleteSaleDialog from '../components/modals/DeleteSaleDialog'
import Toast from '../components/Toast'
import LoadingSkeleton from '../components/LoadingSkeleton'

function SalesPage() {
  const { currentUser } = useAuth()
  const userType = currentUser?.user_type || 'USER'
  const navigate = useNavigate()

  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedSale, setSelectedSale] = useState(null)
  const [saleToDelete, setSaleToDelete] = useState(null)
  const [filterCustomer, setFilterCustomer] = useState('')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')

  const fetchSales = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('sales')
      .select(`
        transno, salesdate, record_status,
        customer:custno ( custname ),
        employee:empno ( lastname, firstname )
      `)
      .order('transno', { ascending: false })

    if (error) { console.error(error); setLoading(false); return }

    const mapped = await Promise.all(data.map(async (s) => {
      const { count } = await supabase
        .from('salesdetail')
        .select('*', { count: 'exact', head: true })
        .eq('transno', s.transno)
        .eq('record_status', 'ACTIVE')

      const { data: details } = await supabase
        .from('salesdetail')
        .select('quantity, unitprice')
        .eq('transno', s.transno)
        .eq('record_status', 'ACTIVE')

      const total = details?.reduce((sum, d) => sum + d.quantity * d.unitprice, 0) || 0

      return {
        transNo: s.transno,
        salesDate: s.salesdate,
        custName: s.customer?.custname || '—',
        empName: s.employee ? `${s.employee.lastname}, ${s.employee.firstname}` : '—',
        lineItemCount: count || 0,
        totalAmount: total,
        record_status: s.record_status,
      }
    }))

    setSales(mapped)
    setLoading(false)
  }

  useEffect(() => { fetchSales() }, [])

  const visibleSales = userType === 'USER'
    ? sales.filter(s => s.record_status === 'ACTIVE')
    : sales

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

      <div className="bg-white rounded-2xl shadow p-4 mb-4 flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Customer Name</label>
          <input type="text" value={filterCustomer} onChange={e => setFilterCustomer(e.target.value)}
            placeholder="Search customer..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Date From</label>
          <input type="date" value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Date To</label>
          <input type="date" value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <button onClick={() => { setFilterCustomer(''); setFilterDateFrom(''); setFilterDateTo('') }}
          className="border border-gray-300 text-gray-500 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg transition">
          Clear
        </button>
      </div>

      {loading ? <LoadingSkeleton /> : (
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
                {userType !== 'USER' && <th className="px-4 py-3 text-left">Status</th>}
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSales.map(sale => (
                <tr key={sale.transNo}
                  className={sale.record_status === 'INACTIVE' ? 'bg-red-50 text-gray-400' : 'hover:bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-blue-600 cursor-pointer hover:underline"
                    onClick={() => navigate(`/sales/${sale.transNo}`)}>
                    {sale.transNo}
                  </td>
                  <td className="px-4 py-3">{sale.salesDate}</td>
                  <td className="px-4 py-3">{sale.custName}</td>
                  <td className="px-4 py-3">{sale.empName}</td>
                  <td className="px-4 py-3 text-center">{sale.lineItemCount}</td>
                  <td className="px-4 py-3 text-right">₱{sale.totalAmount.toLocaleString()}</td>
                  {userType !== 'USER' && (
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${sale.record_status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {sale.record_status}
                      </span>
                    </td>
                  )}
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => setSelectedSale(sale)}
                        className="text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1 rounded-lg transition">
                        Edit
                      </button>
                      {userType === 'SUPERADMIN' && (
                        <button onClick={() => setSaleToDelete(sale)}
                          className="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-lg transition">
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
      )}

      {showAddModal && (
        <AddSaleModal onClose={() => { setShowAddModal(false); fetchSales(); setToast({ message: 'Transaction added!', type: 'success' }) }} />
      )}
      {selectedSale && (
        <EditSaleModal sale={selectedSale} onClose={() => { setSelectedSale(null); fetchSales(); setToast({ message: 'Transaction updated!', type: 'success' }) }} />
      )}
      {saleToDelete && (
        <DeleteSaleDialog sale={saleToDelete} onClose={() => { setSaleToDelete(null); fetchSales(); setToast({ message: 'Transaction deleted!', type: 'success' }) }} />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AppShell>
  )
}

export default SalesPage
