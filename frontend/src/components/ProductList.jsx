import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import ProductForm from "./ProductForm";
import "../App.css";
import { useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      productHandler();
    }
  }, []);

  const productHandler = async (e) => {
    try {
      const response = await fetch(`${API_URL}/product/all-products`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    productHandler();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/product/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== id));
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProduct = async (id) => {
    try {
      const response = await fetch(`${API_URL}/product/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updatedName,
          price: updatedPrice,
          description: updatedDescription,
        }),
      });
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(
          products.map((product) =>
            product._id === id ? updatedProduct : product
          )
        );
        setEditProduct(null);
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <div className="button-container">
        <button className="add-product-btn" onClick={() => setIsFormOpen(true)}>
          Add New Product
        </button>
        <button onClick={handleLogout} className="logout-btn add-product-btn">
          Logout
        </button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              {editProduct === product._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={updatedPrice}
                      onChange={(e) => setUpdatedPrice(e.target.value)}
                    />
                  </td>
                  <td>
                    <textarea
                      value={updatedDescription}
                      onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => updateProduct(product._id)}>
                      Save
                    </button>
                    <button onClick={() => setEditProduct(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.description}</td>
                  <td>
                    <button onClick={() => deleteProduct(product._id)}>
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setEditProduct(product._id);
                        setUpdatedName(product.name);
                        setUpdatedPrice(product.price);
                        setUpdatedDescription(product.description);
                      }}>
                      Edit
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setIsFormOpen(false)}>
              &times;
            </span>
            <ProductForm onProductAdded={handleProductAdded} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
