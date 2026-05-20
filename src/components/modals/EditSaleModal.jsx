import { useState } from 'react'

const dummyCustomers = [
  { custNo: 'C0001', custName: 'Juan dela Cruz' },
  { custNo: 'C0002', custName: 'Pedro Reyes' },
  { custNo: 'C0003', custName: 'Maria Santos' },
  { custNo: 'C0004', custName: 'Ana Garcia' },
]

const dummyEmployees = [
  { empNo: 'E0001', empName: 'Santos, Maria' },
  { empNo: 'E0002', empName: 'Lopez, Carlos' },
  { empNo: 'E0003', empName: 'Reyes, Ana' },
]

function EditSaleModal({ sale, onClose }) {
  const [form, setForm] = useState({
    salesDate: sale.salesDate,
    custNo: sale.custNo,
    empNo: sale.empNo,
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.salesDate || !form.custNo || !form.empNo) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    alert(`Transaction ${sale.transNo} updated! (will connect to Supabase later)`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-700">Edit Transaction <span className="text-blue-600">{sale.transNo}</span></h3>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Sales Date</label>
            <input
              type="date"
              name="salesDate"
              value={form.salesDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
            <select
              name="custNo"
              value={form.custNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Customer --</option>
              {dummyCustomers.map(c => (
                <option key={c.custNo} value={c.custNo}>{c.custName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
            <select
              name="empNo"
              value={form.empNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Select Employee --</option>
              {dummyEmployees.map(e => (
                <option key={e.empNo} value={e.empNo}>{e.empName}</option>
              ))}
            </select>
          </div>

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

export default EditSaleModal