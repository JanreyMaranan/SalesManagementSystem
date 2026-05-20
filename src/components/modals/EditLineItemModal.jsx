import { useState } from 'react'

const dummyProducts = [
  { prodCode: 'PR0001', description: 'Office Chair' },
  { prodCode: 'PR0002', description: 'Standing Desk' },
  { prodCode: 'PR0003', description: 'Monitor Stand' },
  { prodCode: 'PR0004', description: 'Keyboard' },
  { prodCode: 'PR0005', description: 'Mouse' },
]

const dummyPrices = {
  PR0001: 1500.00,
  PR0002: 1000.00,
  PR0003: 250.00,
  PR0004: 500.00,
  PR0005: 266.67,
}

function EditLineItemModal({ item, transNo, onClose }) {
  const [form, setForm] = useState({
    prodCode: item.prodCode,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
  })
  const [error, setError] = useState('')

  const handleProductChange = (e) => {
    const prodCode = e.target.value
    const price = dummyPrices[prodCode] || ''
    setForm({ ...form, prodCode, unitPrice: price })
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.prodCode || !form.quantity) {
      setError('Please fill in all fields.')
      return
    }
    if (form.quantity <= 0) {
      setError('Quantity must be greater than 0.')
      return
    }
    setError('')
    alert(`Line item ${item.prodCode} updated! (will connect to Supabase later)`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-700">
            Edit Line Item <span className="text-blue-600 text-sm">— {transNo}</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <select
              name="prodCode"
              value={form.prodCode}
              onChange={handleProductChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Product --</option>
              {dummyProducts.map(p => (
                <option key={p.prodCode} value={p.prodCode}>{p.description}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min="1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Price
              <span className="ml-2 text-xs text-blue-500 font-normal">(auto-filled from Price History)</span>
            </label>
            <input
              type="number"
              name="unitPrice"
              value={form.unitPrice}
              readOnly
              className="w-full border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Row Total Preview */}
          {form.quantity && form.unitPrice && (
            <div className="bg-blue-50 rounded-lg px-4 py-3 text-sm">
              <span className="text-gray-500">Row Total: </span>
              <span className="font-bold text-blue-600">
                ₱{(form.quantity * form.unitPrice).toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditLineItemModal