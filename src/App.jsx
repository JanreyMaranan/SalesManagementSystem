import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import ProtectedRoute from "./routes/ProtectedRoute"

import Sales from "./pages/Sales"
import TransNo from "./pages/TransNo"
import Customers from "./pages/Customers"
import Employees from "./pages/Employees"
import Products from "./pages/Products"
import Prices from "./pages/Prices"
import Reports from "./pages/Reports"
import Admin from "./pages/Admin"
import DeletedItems from "./pages/DeletedItems"
import AuthCallback from "./pages/AuthCallback"
import Login from "./pages/Login"


 App() {
  const userType = "USER"
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />

        <Route path="/sales/transNo" element={<TransNo />} />
        <Route path="/lookups/customers" element={<Customers />} />
        <Route path="/lookups/employees" element={<Employees />} />
        <Route path="/lookups/products" element={<Products />} />
        <Route path="/lookups/prices" element={<Prices />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/admin" element={<Admin />} />
       <Route
  path="/deleted-items"
  element={
    userType === "USER"
      ? <Navigate to="/sales" />
      : <DeletedItems />
  }
/>
        <Route path="/auth/callback" element={<AuthCallback />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App