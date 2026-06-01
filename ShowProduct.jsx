import axios from 'axios';
import React, { useEffect, useState } from 'react'
import baseUrl from '../../../BaseUrl/BaseUel';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './ShowProduct.css'; // Make sure to import the CSS file

function ShowProduct() {
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    return `${baseUrl}/images/${img}?t=${new Date().getTime()}`;
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (location.state?.productUpdated) {
      fetchAllProducts();
    }
  }, [location.state]);

  const fetchAllProducts = () => {
    setLoading(true);
    axios.get(`${baseUrl}/showAllProducts`)
      .then((response) => {
        console.log("Products fetched:", response.data);
        setproducts(response.data);
      }).catch((error) => {
        console.error("Server side error:", error);
        alert("Server side error: " + error.message);
      })
      .finally(() => setLoading(false));
  }

  const deleteById = (id) => {
    console.log("delete by id:", id);
    axios.delete(`${baseUrl}/deleteById/${id}`)
      .then((response) => {
        console.log(response.data);
        fetchAllProducts();
      }).catch((error) => {
        alert("Server side error: " + error);
      })
  }

  const editProduct = (id) => {
    navigate(`/updateProduct/${id}`);
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <div className="loading-text">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Title Section */}
      <div className="title-wrapper">
        <h2>Product Management</h2>
        <div className="title-decoration"></div>
      </div>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card" style={{'--i': 0}}>
          <div className="stat-icon">📦</div>
          <div className="stat-value">{products.length}</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="stat-card" style={{'--i': 1}}>
          <div className="stat-icon">💰</div>
          <div className="stat-value">
            ₹{products.reduce((sum, p) => sum + (p.prod_price || 0), 0).toLocaleString()}
          </div>
          <div className="stat-label">Total Value</div>
        </div>
        <div className="stat-card" style={{'--i': 2}}>
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{products.filter(p => p.status === "ACTIVE").length}</div>
          <div className="stat-label">Active Products</div>
        </div>
        <div className="stat-card" style={{'--i': 3}}>
          <div className="stat-icon">⚠️</div>
          <div className="stat-value">{products.filter(p => p.prod_quantity <= 10).length}</div>
          <div className="stat-label">Low Stock</div>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Status</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.prod_id} style={{'--row-index': index}}>
                <td>{product.prod_id}</td>
                <td className="fw-semibold">{product.prod_name}</td>
                <td><span className="price-cell">₹{product.prod_price}</span></td>
                <td>{product.prod_quantity}</td>
                <td><span className="category-badge">{product.prod_category}</span></td>
                <td>
                  <span className={`status-badge ${product.status === "ACTIVE" ? "status-active" : "status-inactive"}`}>
                    {product.status}
                  </span>
                </td>
                <td>
                  <div className="image-container">
                    <img 
                      src={getImageUrl(product.prod_img1)} 
                      className="product-image" 
                      alt="product" 
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/70?text=No+Image';
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-action btn-edit" onClick={() => editProduct(product.prod_id)}>
                       Edit
                    </button>
                    <button 
                      className={`btn-action ${product.status === "ACTIVE" ? "btn-delete" : "btn-active"}`} 
                      onClick={() => deleteById(product.prod_id)}
                    >
                      {product.status === "ACTIVE" ? "🗑️ Inactive" : "✅ Active"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* Floating Action Button */}
      <button 
        className="fab" 
        onClick={() => navigate('/add-products')} 
        data-tooltip="Add Product"
      >
        +
      </button>
    </div>
  );
}

export default ShowProduct;