import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AppShell from '../components/AppShell'
import LoadingSkeleton from '../components/LoadingSkeleton'

function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('employee').select('*').order('lastname')
      setEmployees(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  const filtered = employees.filter(e =>
    e.lastname.toLowerCase().includes(search.toLowerCase()) ||
    e.firstname.toLowerCase().includes(search.toLowerCase()) ||
    e.empno.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-4">Employees</h2>
      <div className="mb-4">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or employee no..."
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-sm" />
      </div>
      {loading ? <LoadingSkeleton /> : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Emp No</th>
                <th className="px-4 py-3 text-left">Last Name</th>
                <th className="px-4 py-3 text-left">First Name</th>
                <th className="px-4 py-3 text-left">Gender</th>
                <th className="px-4 py-3 text-left">Hire Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(e => (
                <tr key={e.empno} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-blue-600">{e.empno}</td>
                  <td className="px-4 py-3">{e.lastname}</td>
                  <td className="px-4 py-3">{e.firstname}</td>
                  <td className="px-4 py-3">{e.gender}</td>
                  <td className="px-4 py-3 text-gray-500">{e.hiredate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-gray-400 py-8">No employees found.</p>}
        </div>
      )}
    </AppShell>
  )
}

export default Employees
