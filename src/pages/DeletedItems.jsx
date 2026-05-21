import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AppShell from '../components/AppShell'
import Toast from '../components/Toast'
import LoadingSkeleton from '../components/LoadingSkeleton'

function DeletedItems() {
  const [activeTab, setActiveTab] = useState('transactions')
  const [deletedSales, setDeletedSales] = useState([])
  const [deletedDetails, setDeletedDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const fetchDeleted = async () => {
    setLoading(true)
    const { data: sales } = await supabase
      .from('sales')
      .select(`transno, salesdate, customer:custno(custname), employee:empno(lastname, firstname)`)
      .eq('record_status', 'INACTIVE')
    setDeletedSales(sales || [])

    const { data: details } = await supabase
      .from('salesdetail')
      .select(`transno, prodcode, quantity, unitprice, product:prodcode(description)`)
      .eq('record_status', 'INACTIVE')
    setDeletedDetails(details || [])
    setLoading(false)
  }

  useEffect(() => { fetchDeleted() }, [])

  const recoverSale = async (transno) => {
    await supabase.from('sales').update({ record_status: 'ACTIVE' }).eq('transno', transno)
    fetchDeleted()
    setToast({ message: `Transaction ${transno} recovered!`, type: 'success' })
  }

  const recoverDetail = async (transno, prodcode) => {
    await supabase.from('salesdetail').update({ record_status: 'ACTIVE' })
      .eq('transno', transno).eq('prodcode', prodcode)
    fetchDeleted()
    setToast({ message: 'Line item recovered!', type: 'success' })
  }

  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-6">Deleted Items</h2>
      <div className="flex gap-2 mb-6">
        {['transactions', 'lineitems'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
            {tab === 'transactions' ? 'Transactions' : 'Line Items'}
          </button>
        ))}
      </div>

      {loading ? <LoadingSkeleton /> : (
        <>
          {activeTab === 'transactions' && (
            <div className="bg-white rounded-2xl shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">Trans No</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Employee</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {deletedSales.map(s => (
                    <tr key={s.transno} className="bg-red-50 hover:bg-red-100">
                      <td className="px-4 py-3 font-medium text-red-500">{s.transno}</td>
                      <td className="px-4 py-3 text-gray-500">{s.salesdate}</td>
                      <td className="px-4 py-3 text-gray-500">{s.customer?.custname}</td>
                      <td className="px-4 py-3 text-gray-500">{s.employee ? `${s.employee.lastname}, ${s.employee.firstname}` : '—'}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => recoverSale(s.transno)}
                          className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-lg transition font-medium">
                          Recover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {deletedSales.length === 0 && <p className="text-center text-gray-400 py-8">No deleted transactions.</p>}
            </div>
          )}

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
                  {deletedDetails.map((d, i) => (
                    <tr key={i} className="bg-red-50 hover:bg-red-100">
                      <td className="px-4 py-3 font-medium text-red-500">{d.transno}</td>
                      <td className="px-4 py-3 text-gray-500">{d.prodcode}</td>
                      <td className="px-4 py-3 text-gray-500">{d.product?.description}</td>
                      <td className="px-4 py-3 text-center text-gray-500">{d.quantity}</td>
                      <td className="px-4 py-3 text-right text-gray-500">₱{d.unitprice.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <button onClick={() => recoverDetail(d.transno, d.prodcode)}
                          className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-lg transition font-medium">
                          Recover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {deletedDetails.length === 0 && <p className="text-center text-gray-400 py-8">No deleted line items.</p>}
            </div>
          )}
        </>
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AppShell>
  )
}

export default DeletedItems
