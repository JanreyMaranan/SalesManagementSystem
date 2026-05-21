import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AppShell from '../components/AppShell'
import LoadingSkeleton from '../components/LoadingSkeleton'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('product')
        .select(`*, prices:pricehist(unitprice, effdate)`)
        .order('prodcode')
      setProducts(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  const getCurrentPrice = (prices) => {
    if (!prices || prices.length === 0) return null
    const sorted = [...prices].sort((a, b) => new Date(b.effdate) - new Date(a.effdate))
    return sorted[0].unitprice
  }

  const filtered = products.filter(p =>
    p.description.toLowerCase().includes(search.toLowerCase()) ||
    p.prodcode.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-4">Products</h2>
      <div className="mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or product code..."
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-sm" />
      </div>
      {loading ? <LoadingSkeleton /> : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Product Code</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Unit</th>
                <th className="px-4 py-3 text-right">Current Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(p => (
                <tr key={p.prodcode} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-blue-600">{p.prodcode}</td>
                  <td className="px-4 py-3">{p.description}</td>
                  <td className="px-4 py-3">{p.unit}</td>
                  <td className="px-4 py-3 text-right">
                    {getCurrentPrice(p.prices) != null
                      ? `₱${getCurrentPrice(p.prices).toLocaleString()}`
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-gray-400 py-8">No products found.</p>}
        </div>
      )}
    </AppShell>
  )
}

export default Products
