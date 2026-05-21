import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import AppShell from '../components/AppShell'
import AddLineItemModal from '../components/modals/AddLineItemModal'
import EditLineItemModal from '../components/modals/EditLineItemModal'
import LoadingSkeleton from '../components/LoadingSkeleton'
import Toast from '../components/Toast'

function TransNo() {
  const { transNo } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const userType = currentUser?.user_type || 'USER'

  const [sale, setSale] = useState(null)
  const [details, setDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddLineItem, setShowAddLineItem] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [toast, setToast] = useState(null)

  const fetchSale = async () => {
    const { data } = await supabase
      .from('sales')
      .select(`transno, salesdate, customer:custno(custname), employee:empno(lastname, firstname)`)
      .eq('transno', transNo)
      .single()
    setSale(data)
  }

  const fetchDetails = async () => {
    const { data } = await supabase
      .from('salesdetail')
      .select(`transno, prodcode, quantity, record_status, product:prodcode(description)`)
      .eq('transno', transNo)

    // Get price for each product
    const withPrices = await Promise.all((data || []).map(async (d) => {
      const { data: ph } = await supabase
        .from('pricehist')
        .select('unitprice')
        .eq('prodcode', d.prodcode)
        .order('effdate', { ascending: false })
        .limit(1)
      return { ...d, unitprice: ph?.[0]?.unitprice || 0 }
    }))

    setDetails(withPrices)
    setLoading(false)
  }

  useEffect(() => { fetchSale(); fetchDetails() }, [transNo])

  const visibleDetails = userType === 'USER'
    ? details.filter(d => d.record_status === 'ACTIVE')
    : details

  const handleDeleteLineItem = async (prodCode) => {
    await supabase.from('salesdetail')
      .update({ record_status: 'INACTIVE' })
      .eq('transno', transNo)
      .eq('prodcode', prodCode)
    fetchDetails()
    setToast({ message: 'Line item deleted!', type: 'success' })
  }

  if (loading) return <AppShell><LoadingSkeleton /></AppShell>
  if (!sale) return <AppShell><p className="text-gray-500">Transaction not found.</p></AppShell>

  const total = visibleDetails.reduce((sum, d) => sum + d.quantity * d.unitprice, 0)

  return (
    <AppShell>
      <button onClick={() => navigate('/sales')}
        className="text-sm text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Transactions
      </button>

      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Transaction <span className="text-blue-600">{sale.transno}</span>
        </h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Date</p>
            <p className="text-gray-700 font-medium">{sale.salesdate}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Customer</p>
            <p className="text-gray-700 font-medium">{sale.customer?.custname}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase font-semibold mb-1">Employee</p>
            <p className="text-gray-700 font-medium">{sale.employee ? `${sale.employee.lastname}, ${sale.employee.firstname}` : '—'}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-700">Line Items</h3>
        <button onClick={() => setShowAddLineItem(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
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
              {userType !== 'USER' && <th className="px-4 py-3 text-left">Status</th>}
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {visibleDetails.map(item => (
              <tr key={item.prodcode}
                className={item.record_status === 'INACTIVE' ? 'bg-red-50 text-gray-400' : 'hover:bg-gray-50'}>
                <td className="px-4 py-3 font-medium text-blue-600">{item.prodcode}</td>
                <td className="px-4 py-3">{item.product?.description}</td>
                <td className="px-4 py-3 text-center">{item.quantity}</td>
                <td className="px-4 py-3 text-right">₱{item.unitprice.toLocaleString()}</td>
                <td className="px-4 py-3 text-right font-medium">₱{(item.quantity * item.unitprice).toLocaleString()}</td>
                {userType !== 'USER' && (
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.record_status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {item.record_status}
                    </span>
                  </td>
                )}
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => setSelectedItem(item)}
                      className="text-xs bg-yellow-100 text-yellow-700 hover:bg-yellow-200 px-3 py-1 rounded-lg transition">
                      Edit
                    </button>
                    {userType === 'SUPERADMIN' && item.record_status === 'ACTIVE' && (
                      <button onClick={() => handleDeleteLineItem(item.prodcode)}
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
        {visibleDetails.length === 0 && (
          <p className="text-center text-gray-400 py-8">No line items found.</p>
        )}
        {visibleDetails.length > 0 && (
          <div className="px-4 py-3 bg-gray-50 text-right text-sm font-bold text-gray-700">
            Grand Total: ₱{total.toLocaleString()}
          </div>
        )}
      </div>

      {showAddLineItem && (
        <AddLineItemModal transNo={transNo} onClose={() => { setShowAddLineItem(false); fetchDetails(); setToast({ message: 'Line item added!', type: 'success' }) }} />
      )}
      {selectedItem && (
        <EditLineItemModal item={selectedItem} transNo={transNo} onClose={() => { setSelectedItem(null); fetchDetails(); setToast({ message: 'Line item updated!', type: 'success' }) }} />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AppShell>
  )
}

export default TransNo
