import { useState } from 'react'
import AppShell from '../components/AppShell'

const dummyUsers = [
  { userId: 'user1', username: 'jcesperanza', email: 'jcesperanza@neu.edu.ph', user_type: 'SUPERADMIN', record_status: 'ACTIVE' },
  { userId: 'user2', username: 'mariasantos', email: 'maria@example.com', user_type: 'ADMIN', record_status: 'ACTIVE' },
  { userId: 'user3', username: 'carloslopez', email: 'carlos@example.com', user_type: 'USER', record_status: 'ACTIVE' },
  { userId: 'user4', username: 'anareyes', email: 'ana@example.com', user_type: 'USER', record_status: 'INACTIVE' },
  { userId: 'user5', username: 'miguelcruz', email: 'miguel@example.com', user_type: 'USER', record_status: 'INACTIVE' },
]

const statusBadge = (status) => {
  return status === 'ACTIVE'
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-600'
}

const typeBadge = (type) => {
  if (type === 'SUPERADMIN') return 'bg-purple-100 text-purple-700'
  if (type === 'ADMIN') return 'bg-blue-100 text-blue-700'
  return 'bg-gray-100 text-gray-600'
}

function AdminPage() {
  const [users, setUsers] = useState(dummyUsers)

  const handleActivate = (userId) => {
    setUsers(users.map(u =>
      u.userId === userId ? { ...u, record_status: 'ACTIVE' } : u
    ))
  }

  const handleDeactivate = (userId) => {
    setUsers(users.map(u =>
      u.userId === userId ? { ...u, record_status: 'INACTIVE' } : u
    ))
  }

  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-6">User Management</h2>

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
                <tr
                  key={user.userId}
                  className={isSuperAdmin ? 'bg-gray-50 opacity-60' : 'hover:bg-gray-50'}
                >
                  <td className="px-4 py-3 font-medium text-gray-700">{user.username}</td>
                  <td className="px-4 py-3 text-gray-500">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeBadge(user.user_type)}`}>
                      {user.user_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusBadge(user.record_status)}`}>
                      {user.record_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {isSuperAdmin ? (
                      <span
                        className="text-xs text-gray-400 italic cursor-not-allowed"
                        title="SUPERADMIN accounts cannot be modified"
                      >
                        Protected
                      </span>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleActivate(user.userId)}
                          disabled={user.record_status === 'ACTIVE'}
                          className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Activate
                        </button>
                        <button
                          onClick={() => handleDeactivate(user.userId)}
                          disabled={user.record_status === 'INACTIVE'}
                          className="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
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
    </AppShell>
  )
}

export default AdminPage