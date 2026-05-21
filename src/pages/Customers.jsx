import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AppShell from '../components/AppShell'
import LoadingSkeleton from '../components/LoadingSkeleton'

function Customers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('customer').select('*').order('custname')
      setCustomers(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  const filtered = customers.filter(c =>
    c.custname.toLowerCase().includes(search.toLowerCase()) ||
    c.custno.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-4">Customers</h2>
      <div className="mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or customer no..."
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-sm" />
      </div>
      {loading ? <LoadingSkeleton /> : (
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
              {filtered.map(c => (
                <tr key={c.custno} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-blue-600">{c.custno}</td>
                  <td className="px-4 py-3">{c.custname}</td>
                  <td className="px-4 py-3 text-gray-500">{c.address}</td>
                  <td className="px-4 py-3">{c.payterm}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-gray-400 py-8">No customers found.</p>}
        </div>
      )}
    </AppShell>
  )
}

export default Customers
