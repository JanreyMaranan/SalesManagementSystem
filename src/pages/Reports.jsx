import { useState } from 'react'
import AppShell from '../components/AppShell'
import { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'
import LoadingSkeleton from '../components/LoadingSkeleton'

const tabs = [
  { id: 'employee', label: 'By Employee' },
  { id: 'customer', label: 'By Customer' },
  { id: 'products', label: 'Top Products' },
  { id: 'monthly', label: 'Monthly Trend' },
]

function Reports() {
  const [activeTab, setActiveTab] = useState('employee')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setData([])
    if (activeTab === 'employee') fetchByEmployee()
    if (activeTab === 'customer') fetchByCustomer()
    if (activeTab === 'products') fetchTopProducts()
    if (activeTab === 'monthly') fetchMonthly()
  }, [activeTab])

  const fetchByEmployee = async () => {
    const { data: sales } = await supabase
      .from('sales').select('empno, employee:empno(lastname, firstname), salesdetail(quantity, unitprice)')
      .eq('record_status', 'ACTIVE')
    const map = {}
    sales?.forEach(s => {
      const name = s.employee ? `${s.employee.lastname}, ${s.employee.firstname}` : s.empno
      const total = s.salesdetail?.reduce((sum, d) => sum + d.quantity * d.unitprice, 0) || 0
      map[name] = (map[name] || 0) + total
    })
    setData(Object.entries(map).map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total))
    setLoading(false)
  }

  const fetchByCustomer = async () => {
    const { data: sales } = await supabase
      .from('sales').select('custno, customer:custno(custname), salesdetail(quantity, unitprice)')
      .eq('record_status', 'ACTIVE')
    const map = {}
    sales?.forEach(s => {
      const name = s.customer?.custname || s.custno
      const total = s.salesdetail?.reduce((sum, d) => sum + d.quantity * d.unitprice, 0) || 0
      map[name] = (map[name] || 0) + total
    })
    setData(Object.entries(map).map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total))
    setLoading(false)
  }

  const fetchTopProducts = async () => {
    const { data: details } = await supabase
      .from('salesdetail').select('prodcode, quantity, product:prodcode(description)')
      .eq('record_status', 'ACTIVE')
    const map = {}
    details?.forEach(d => {
      const name = d.product?.description || d.prodcode
      map[name] = (map[name] || 0) + d.quantity
    })
    setData(Object.entries(map).map(([name, qty]) => ({ name, qty })).sort((a, b) => b.qty - a.qty).slice(0, 10))
    setLoading(false)
  }

  const fetchMonthly = async () => {
    const { data: sales } = await supabase
      .from('sales').select('salesdate, salesdetail(quantity, unitprice)')
      .eq('record_status', 'ACTIVE')
    const map = {}
    sales?.forEach(s => {
      const month = s.salesdate?.slice(0, 7)
      if (!month) return
      const total = s.salesdetail?.reduce((sum, d) => sum + d.quantity * d.unitprice, 0) || 0
      map[month] = (map[month] || 0) + total
    })
    setData(Object.entries(map).map(([month, total]) => ({ month, total })).sort((a, b) => a.month.localeCompare(b.month)))
    setLoading(false)
  }

  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-6">Sales Reports</h2>
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? <LoadingSkeleton /> : (
        <div className="bg-white rounded-2xl shadow p-6">
          {(activeTab === 'employee' || activeTab === 'customer') && (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `₱${v.toLocaleString()}`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={v => `₱${v.toLocaleString()}`} />
                <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
          {activeTab === 'products' && (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" width={130} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="qty" fill="#2563eb" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
          {activeTab === 'monthly' && (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `₱${v.toLocaleString()}`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={v => `₱${v.toLocaleString()}`} />
                <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
          {data.length === 0 && <p className="text-center text-gray-400 py-8">No data available.</p>}
        </div>
      )}
    </AppShell>
  )
}

export default Reports
