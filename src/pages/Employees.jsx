import AppShell from '../components/AppShell'

const dummyEmployees = [
  { empNo: 'E0001', lastName: 'Santos', firstName: 'Maria', gender: 'Female', hireDate: '2019-03-15' },
  { empNo: 'E0002', lastName: 'Lopez', firstName: 'Carlos', gender: 'Male', hireDate: '2020-07-01' },
  { empNo: 'E0003', lastName: 'Reyes', firstName: 'Ana', gender: 'Female', hireDate: '2021-01-10' },
  { empNo: 'E0004', lastName: 'Cruz', firstName: 'Miguel', gender: 'Male', hireDate: '2018-11-20' },
  { empNo: 'E0005', lastName: 'Garcia', firstName: 'Rosa', gender: 'Female', hireDate: '2022-05-05' },
]

function LookupEmployeesPage() {
  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-6">Employees</h2>

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
            {dummyEmployees.map(e => (
              <tr key={e.empNo} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-blue-600">{e.empNo}</td>
                <td className="px-4 py-3">{e.lastName}</td>
                <td className="px-4 py-3">{e.firstName}</td>
                <td className="px-4 py-3">{e.gender}</td>
                <td className="px-4 py-3 text-gray-500">{e.hireDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  )
}

export default LookupEmployeesPage