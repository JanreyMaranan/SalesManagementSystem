import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

function EditSaleModal({ sale, onClose }) {
  const [customers, setCustomers] = useState([])
  const [employees, setEmployees] = useState([])
  const [form, setForm] = useState({ salesDate: sale.salesDate, custNo: sale.custNo || '', empNo: sale.empNo || '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('customer').select('custno, custname').order('custname').then(({ data }) => setCustomers(data || []))
    supabase.from('employee').select('empno, lastname, firstname').order('lastname').then(({ data }) => setEmployees(data || []))

    // Load current sale custno/empno
    supabase.from('sales').select('custno, empno').eq('transno', sale.transNo).single().then(({ data }) => {
      if (data) setForm(f => ({ ...f, custNo: data.custno, empNo: data.empno }))
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.salesDate || !form.custNo || !form.empNo) { setError('Please fill in all fields.'); return }
    setSaving(true)
    const { error: err } = await supabase.from('sales').update({
      salesdate: form.salesDate,
      custno: form.custNo,
      empno: form.empNo
    }).eq('transno', sale.transNo)
    if (err) { setError(err.message); setSaving(false); return }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-700">Edit Transaction <span className="text-blue-600">{sale.transNo}</span></h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
        </div>
        {error && <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sales Date</label>
            <input type="date" value={form.salesDate} onChange={e => setForm({ ...form, salesDate: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
            <select value={form.custNo} onChange={e => setForm({ ...form, custNo: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">-- Select Customer --</option>
              {customers.map(c => <option key={c.custno} value={c.custno}>{c.custname}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
            <select value={form.empNo} onChange={e => setForm({ ...form, empNo: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">-- Select Employee --</option>
              {employees.map(e => <option key={e.empno} value={e.empno}>{e.lastname}, {e.firstname}</option>)}
            </select>
          </div>
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

export default EditSaleModal
