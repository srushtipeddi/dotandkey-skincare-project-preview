import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../BaseUrl/BaseUel";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    axios.get(`${baseUrl}/order/allOrders`)
      .then((res) => setOrders(res.data || []))
      .catch((err) => console.log(err));
  };

  const updateStatus = (id, status) => {
    axios.put(`${baseUrl}/order/updateStatus/${id}`, { orderStatus: status })
      .then(() => fetchOrders())
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrders();
    const timer = setInterval(fetchOrders, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="admin-orders-page">
      <h1>Received Orders</h1>

      <div className="admin-orders-list">
        {orders.map((order) => (
          <div className="admin-order-card" key={order.orderInfo_id}>
            <div>
              <h3>Order #{order.orderInfo_id}</h3>
              <p>{order.customerName}</p>
              <p>{order.customerPhone}</p>
              <p>{order.deliveryAddress}</p>
            </div>

            <div>
              <b>{order.productName}</b>
              <p>Qty: {order.quantity}</p>
              <p>Payment: {order.paymentMethod || "Cash on Delivery"}</p>
              <h3>Rs. {order.totalPrice}</h3>
            </div>

            <div>
              <span className="order-status">{order.orderStatus || "Pending"}</span>
              <select
                value={order.orderStatus || "Pending"}
                onChange={(e) => updateStatus(order.orderInfo_id, e.target.value)}
              >
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;