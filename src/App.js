import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import DashBoard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import AddProduct from "./pages/addProduct/addProduct";
import Chat from "./pages/chat/Chat";
import EditProduct from "./pages/editProduct/editProduct";

function App() {
  const ProtectedtRoute = ({ children }) => {
    const loadUser = JSON.parse(localStorage.getItem("userActive"));
    if (!loadUser) {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedtRoute>
              <DashBoard />
            </ProtectedtRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedtRoute>
              <Products />
            </ProtectedtRoute>
          }
        />
        <Route
          path="/products/new-product"
          element={
            <ProtectedtRoute>
              <AddProduct />
            </ProtectedtRoute>
          }
        />
        <Route
          path="/products/edit-product/:productId"
          element={
            <ProtectedtRoute>
              <EditProduct />
            </ProtectedtRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedtRoute>
              <Chat />
            </ProtectedtRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
