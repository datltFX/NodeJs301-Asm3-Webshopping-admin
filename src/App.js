import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import DashBoard from "./pages/dashboard/Dashboard";
import Products from "./pages/products/Products";
import AddProduct from "./pages/addProduct/addProduct";
import Chat from "./pages/chat/Chat";
import EditProduct from "./pages/editProduct/editProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new-product" element={<AddProduct />} />
        <Route
          path="/products/edit-product/:productId"
          element={<EditProduct />}
        />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
