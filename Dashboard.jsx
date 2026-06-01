import axios from "axios";
import React, { useEffect, useState } from "react";
import baseUrl from "../../../BaseUrl/BaseUel";
import "./Dashboard.css";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchDashboardData = () => {
    axios.get(`${baseUrl}/showAllProducts`)
      .then((productRes) => {
        // FIX: Ensure products is always an array
        const productData = Array.isArray(productRes.data) ? productRes.data : [];
        setProducts(productData);
      })
      .catch((err) => {
        console.log("Product error:", err);
        setProducts([]); // Set empty array on error
      });

    axios.get(`${baseUrl}/order/allOrders`)
      .then((orderRes) => {
        // FIX: Ensure orders is always an array
        const orderData = Array.isArray(orderRes.data) ? orderRes.data : [];
        setOrders(orderData);
      })
      .catch((err) => {
        console.log("Order error:", err);
        setOrders([]); // Set empty array on error
      })
      .finally(() => {
        setLoading(false);
        setLastUpdated(new Date().toLocaleTimeString());
      });
  };

  useEffect(() => {
    fetchDashboardData();

    const timer = setInterval(() => {
      fetchDashboardData();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const updateOrderStatus = (id, status) => {
    axios.put(`${baseUrl}/order/updateStatus/${id}`, {
      orderStatus: status,
    })
      .then(() => {
        alert("Order status updated");
        fetchDashboardData();
      })
      .catch((err) => {
        console.log(err);
        alert("Status update failed");
      });
  };

  // FIX: Safe calculations with proper number conversion
  const activeProducts = Array.isArray(products) ? products.filter((p) => p.status === "ACTIVE").length : 0;
  const inactiveProducts = Array.isArray(products) ? products.filter((p) => p.status === "INACTIVE").length : 0;

  const lowStockProducts = Array.isArray(products) ? products.filter((p) => {
    return Number(p.prod_quantity || 0) <= 10 || p.status === "INACTIVE";
  }) : [];

  const totalRevenue = Array.isArray(orders) ? orders.reduce((sum, order) => {
    const price = typeof order.totalPrice === 'number' ? order.totalPrice : Number(order.totalPrice || 0);
    return sum + price;
  }, 0) : 0;

  const recentOrders = Array.isArray(orders) ? [...orders]
    .sort((a, b) => Number(b.orderInfo_id || 0) - Number(a.orderInfo_id || 0))
    .slice(0, 10) : [];

  // FIX: Show proper loading state
  if (loading) {
    return (
      <div className="dashboard-page">
        <h2 className="loading-text">Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header-box">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="refresh-text">Last updated: {lastUpdated}</p>
        </div>

        <button className="refresh-btn" onClick={fetchDashboardData}>
          Refresh
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Products</p>
          <h2>{Array.isArray(products) ? products.length : 0}</h2>
          <small>{activeProducts} active</small>
        </div>

        <div className="stat-card">
          <p>Total Orders</p>
          <h2>{Array.isArray(orders) ? orders.length : 0}</h2>
          <small>customer orders</small>
        </div>

        <div className="stat-card">
          <p>Total Revenue</p>
          <h2>Rs. {(totalRevenue || 0).toFixed(2)}</h2>
          <small>from all orders</small>
        </div>

        <div className="stat-card">
          <p>Low Stock</p>
          <h2>{lowStockProducts.length}</h2>
          <small>{inactiveProducts} inactive</small>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-title">
          <h2>Recent Orders</h2>
        </div>

        <div className="table-box">
          <table className="order-table">
            <thead>
              <tr>
                <th>ORDER</th>
                <th>CUSTOMER</th>
                <th>PRODUCT</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>CHANGE STATUS</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-row">
                    No orders received yet.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order, index) => (
                  <tr key={order.orderInfo_id || index}>
                    <td>#{order.orderInfo_id || 'N/A'}</td>
                    <td>{order.customerName || 'Unknown'}</td>
                    <td>{order.productName || order.product?.prod_name || 'N/A'}</td>
                    <td>Rs. {order.totalPrice || 0}</td>
                    <td>
                      <span className={`status-badge ${(order.orderStatus || "Pending").toLowerCase()}`}>
                        {order.orderStatus || "Pending"}
                      </span>
                    </td>
                    <td>
                      <select
                        className="status-select"
                        value={order.orderStatus || "Pending"}
                        onChange={(e) => updateOrderStatus(order.orderInfo_id, e.target.value)}
                      >
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-title">
          <h2>Stock Alerts</h2>
          <p>Products with low stock or inactive status.</p>
        </div>

        <div className="stock-list">
          {lowStockProducts.length === 0 ? (
            <p className="empty-stock"> Stock looks healthy.</p>
          ) : (
            lowStockProducts.map((product, index) => (
              <div className="stock-card" key={product.prod_id || index}>
                <img
                  src={`${baseUrl}/images/${product.prod_img1}`}
                  alt={product.prod_name || 'Product'}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/70';
                  }}
                />

                <div>
                  <h3>{product.prod_name || 'Unknown Product'}</h3>
                  <p>{product.prod_category || 'No category'}</p>
                  <p>Quantity: {product.prod_quantity || 0}</p>
                </div>

                <span className={product.status === "INACTIVE" ? "stock-danger" : "stock-warning"}>
                  {product.status || 'UNKNOWN'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;