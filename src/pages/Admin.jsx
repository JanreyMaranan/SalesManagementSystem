import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AppShell from '../components/AppShell'
import Toast from '../components/Toast'
import LoadingSkeleton from '../components/LoadingSkeleton'

const statusBadge = (s) => s === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
const typeBadge = (t) => {
  if (t === 'SUPERADMIN') return 'bg-purple-100 text-purple-700'
  if (t === 'ADMIN') return 'bg-blue-100 text-blue-700'
  return 'bg-gray-100 text-gray-600'
}

function AdminPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const fetchUsers = async () => {
    const { data } = await supabase.from('user').select('*').order('username')
    setUsers(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchUsers() }, [])

  const updateStatus = async (userid, status) => {
    await supabase.from('user').update({ record_status: status }).eq('userid', userid)
    fetchUsers()
    setToast({ message: `User ${status === 'ACTIVE' ? 'activated' : 'deactivated'}!`, type: 'success' })
  }

  const updateRole = async (userid, user_type) => {
    await supabase.from('user').update({ user_type }).eq('userid', userid)
    fetchUsers()
    setToast({ message: 'Role updated!', type: 'success' })
  }

  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-6">User Management</h2>
      {loading ? <LoadingSkeleton /> : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Username</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(user => {
                const isSuperAdmin = user.user_type === 'SUPERADMIN'
                return (
                  <tr key={user.userid} className={isSuperAdmin ? 'bg-gray-50 opacity-60' : 'hover:bg-gray-50'}>
                    <td className="px-4 py-3 font-medium text-gray-700">{user.username}</td>
                    <td className="px-4 py-3 text-gray-500">{user.email || user.username}</td>
                    <td className="px-4 py-3">
                      {isSuperAdmin ? (
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeBadge(user.user_type)}`}>{user.user_type}</span>
                      ) : (
                        <select value={user.user_type}
                          onChange={e => updateRole(user.userid, e.target.value)}
                          className="text-xs border border-gray-300 rounded-lg px-2 py-1 focus:outline-none">
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="SUPERADMIN">SUPERADMIN</option>
                        </select>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusBadge(user.record_status)}`}>
                        {user.record_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {isSuperAdmin ? (
                        <span className="text-xs text-gray-400 italic">Protected</span>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => updateStatus(user.userid, 'ACTIVE')}
                            disabled={user.record_status === 'ACTIVE'}
                            className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed">
                            Activate
                          </button>
                          <button onClick={() => updateStatus(user.userid, 'INACTIVE')}
                            disabled={user.record_status === 'INACTIVE'}
                            className="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed">
                            Deactivate
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AppShell>
  )
}

export default AdminPage
