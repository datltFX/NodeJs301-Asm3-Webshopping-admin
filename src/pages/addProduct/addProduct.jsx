import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import axiosClient from "../../components/axios/axios";

const NewProduct = () => {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }
    data.append("name", product.name);
    data.append("price", product.price);
    data.append("category", product.category);
    data.append("stock", product.stock);
    data.append("short_desc", product.short_desc);
    data.append("long_desc", product.long_desc);

    //post new
    axiosClient
      .post("/products/new-product", data)
      .then((res) => {
        console.log("add new success");
        navigate("/products");
      })
      .catch((err) => console.log(err.response.data));
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
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12">
              <form
                className="col-10"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="form-group">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Product Name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="Enter Price"
                    required
                    min="0"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    className="form-control"
                    placeholder="Enter Category"
                    required
                    onChange={handleChange}
                  />{" "}
                </div>
                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    className="form-control"
                    placeholder="Enter Stock"
                    required
                    onChange={handleChange}
                  />{" "}
                </div>
                <div className="form-group">
                  <label htmlFor="short_desc">Short Description</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    id="short_desc"
                    placeholder="Enter Short Description"
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="long_desc">Long Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    id="long_desc"
                    placeholder="Enter Long Description"
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Upload image (4 images)</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="images"
                    name="images"
                    multiple
                    required
                    onChange={(e) => setImages(e.target.files)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <footer className="footer text-center text-muted"></footer>
      </div>
    </div>
  );
};

export default NewProduct;
