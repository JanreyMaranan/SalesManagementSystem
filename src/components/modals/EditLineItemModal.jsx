import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

function EditLineItemModal({ item, transNo, onClose }) {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ prodCode: item.prodcode, quantity: item.quantity, unitPrice: item.unitprice })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('product').select('prodcode, description').order('description').then(({ data }) => setProducts(data || []))
  }, [])

  const handleProductChange = async (prodCode) => {
    setForm(f => ({ ...f, prodCode, unitPrice: '' }))
    if (!prodCode) return
    const { data } = await supabase
      .from('pricehistory')
      .select('unitprice, effdate')
      .eq('prodcode', prodCode)
      .order('effdate', { ascending: false })
      .limit(1)
    if (data && data.length > 0) setForm(f => ({ ...f, prodCode, unitPrice: data[0].unitprice }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.prodCode || !form.quantity) { setError('Please fill in all fields.'); return }
    if (form.quantity <= 0) { setError('Quantity must be greater than 0.'); return }
    setSaving(true)
    const { error: err } = await supabase.from('salesdetail')
      .update({ prodcode: form.prodCode, quantity: parseInt(form.quantity), unitprice: parseFloat(form.unitPrice) })
      .eq('transno', transNo)
      .eq('prodcode', item.prodcode)
    if (err) { setError(err.message); setSaving(false); return }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-700">Edit Line Item <span className="text-blue-600 text-sm">— {transNo}</span></h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
        </div>
        {error && <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <select value={form.prodCode} onChange={e => handleProductChange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">-- Select Product --</option>
              {products.map(p => <option key={p.prodcode} value={p.prodcode}>{p.description}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input type="number" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })}
              min="1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price <span className="ml-2 text-xs text-blue-500">(auto-filled)</span></label>
            <input type="number" value={form.unitPrice} readOnly
              className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 text-sm text-gray-500 cursor-not-allowed" />
          </div>
          {form.quantity && form.unitPrice && (
            <div className="bg-blue-50 rounded-lg px-4 py-3 text-sm">
              <span className="text-gray-500">Row Total: </span>
              <span className="font-bold text-blue-600">₱{(form.quantity * form.unitPrice).toLocaleString()}</span>
            </div>
          )}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2 rounded-lg transition">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditLineItemModal
