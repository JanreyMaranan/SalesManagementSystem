import { useState } from 'react'
import AppShell from '../components/AppShell'
import SalesByEmployeePage from './reports/SalesByEmployeePage'
import SalesByCustomerPage from './reports/SalesByCustomerPage'
import TopProductsPage from './reports/TopProductsPage'
import MonthlySalesTrendPage from './reports/MonthlySalesTrendPage'

const tabs = [
  { id: 'employee', label: 'By Employee' },
  { id: 'customer', label: 'By Customer' },
  { id: 'products', label: 'Top Products' },
  { id: 'monthly', label: 'Monthly Trend' },
]

function ReportsPage() {
  const [activeTab, setActiveTab] = useState('employee')

  return (
    <AppShell>
      <h2 className="text-xl font-bold text-gray-700 mb-6">Sales Reports</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'employee' && <SalesByEmployeePage />}
      {activeTab === 'customer' && <SalesByCustomerPage />}
      {activeTab === 'products' && <TopProductsPage />}
      {activeTab === 'monthly' && <MonthlySalesTrendPage />}
    </AppShell>
  )
}

export default ReportsPage