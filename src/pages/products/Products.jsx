import React, { useEffect, useState } from "react";
import convertMoney from "../../convertMoney";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import axiosClient from "../../components/axios/axios";

function Products(props) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //load again
  const [loaded, setLoaded] = useState(false);

  //get ALL products
  useEffect(() => {
    axiosClient
      .get("/products")
      .then((res) => {
        // console.log(res.data)
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, [loaded]);

  //search product
  const searchHandler = (e) => {
    setSearchQuery(e.target.value);
    const data = {
      query: searchQuery,
    };

    axiosClient
      .post("/products/search", data)
      .then((res) => {
        // console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  //delete product
  const handleDelete = async (productId) => {
    const check = window.confirm("Are you sure delete this product?");
    if (check) {
      axiosClient
        .delete(`/products/${productId}`)
        .then((res) => {
          console.log(res.data);
          setLoaded(!loaded);
          alert("Bạn Đã Xóa Hàng Thành Công!");
        })
        .catch((err) => console.log(err.response.data));
    }
  };

  //render
  return (
    <div
      id="main-wrapper"
      data-theme="light"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
      data-boxed-layout="full"
    >
      <Header />
      <Sidebar />
      <div className="page-wrapper d-block">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body ">
                  <div className="d-flex justify-content-between">
                    <h4 className="card-title">Products</h4>
                    <input
                      className="form-control w-35"
                      onChange={(e) => searchHandler(e)}
                      type="text"
                      placeholder="Enter Search!"
                    />
                    <Link to="/products/new-product">
                      <button
                        style={{ cursor: "pointer", color: "white" }}
                        className="btn btn-danger"
                      >
                        Add New
                      </button>
                    </Link>
                  </div>

                  <br />

                  <div className="table-responsive">
                    <table className="table table-striped table-bordered v-middle">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Image</th>
                          <th>Category</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products &&
                          products.map((value) => (
                            <tr key={value._id}>
                              <td>{value._id}</td>
                              <td>{value.name}</td>
                              <td>{convertMoney(value.price)} VND</td>
                              <td>
                                <img
                                  src={value.img1}
                                  style={{ height: "60px", width: "60px" }}
                                  alt=""
                                />
                              </td>
                              <td>{value.category}</td>
                              <td>
                                <Link
                                  to={`/products/edit-product/${value._id}`}
                                >
                                  <button
                                    style={{ margin: "0px", width: "80px" }}
                                    className="btn btn-success"
                                  >
                                    Update
                                  </button>
                                </Link>
                                &nbsp;
                                <button
                                  style={{ margin: "0px", width: "75px" }}
                                  className="btn btn-danger"
                                  onClick={() => handleDelete(value._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer text-center text-muted"></footer>
      </div>
    </div>
  );
}

export default Products;
