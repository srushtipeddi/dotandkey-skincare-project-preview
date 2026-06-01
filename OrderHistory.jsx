import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../../../BaseUrl/BaseUel";
import "./OrderHistory.css";

function OrderHistory() {
  const navigate = useNavigate();
  const { email: routeEmail } = useParams();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchOrders = () => {
    const email = localStorage.getItem("userEmail") || routeEmail;

    if (!email) {
      navigate("/login");
      return;
    }

    setLoading(true);

    axios
      .get(`${baseUrl}/order/orderHistoryByEmail?email=${email}`)
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch((err) => {
        console.log(err);
        alert("server side error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, [routeEmail]);

  const handleCancelOrder = (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");

    if (!confirmCancel) return;

    setCancellingId(orderId);

    axios
      .put(`${baseUrl}/order/cancelOrder/${orderId}`)
      .then(() => {
        alert("Order cancelled successfully");
        fetchOrders();
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to cancel order");
      })
      .finally(() => {
        setCancellingId(null);
      });
  };

  if (loading) {
    return (
      <div className="orders-state">
        <h2>Loading your orders...</h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-state">
        <h2>No orders found</h2>
        <p>You have not placed any order yet.</p>
        <button onClick={() => navigate("/userhome")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-head">
        <p>Purchase Timeline</p>
        <h1>Order History</h1>
      </div>

      <div className="orders-list">
        {orders.map((order, index) => {
          const status = order.orderStatus || "Pending";
          const isCancelled = status.toLowerCase() === "cancelled";
          const isDelivered = status.toLowerCase() === "delivered";
          const canCancel = !isCancelled && !isDelivered;

          return (
            <div
              className="order-card"
              key={order.orderInfo_id}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="order-top">
                <div>
                  <span>Order ID</span>
                  <h3>#{order.orderInfo_id}</h3>
                </div>

                <div className="order-actions">
                  <b className={`order-status ${status.toLowerCase()}`}>
                    {status}
                  </b>

                  {canCancel && (
                    <button
                      type="button"
                      className="cancel-order-btn"
                      disabled={cancellingId === order.orderInfo_id}
                      onClick={() => handleCancelOrder(order.orderInfo_id)}
                    >
                      {cancellingId === order.orderInfo_id ? "Cancelling..." : "Cancel Order"}
                    </button>
                  )}
                </div>
              </div>

              <div className="order-body">
                <img
                  src={
                    order.product?.prod_img1
                      ? `${baseUrl}/images/${order.product.prod_img1}`
                      : "https://via.placeholder.com/140"
                  }
                  alt={order.product?.prod_name || order.productName}
                />

                <div className="order-info">
                  <p>{order.product?.prod_category || "Product"}</p>
                  <h2>{order.product?.prod_name || order.productName}</h2>
                  <span>
                    Qty {order.quantity} x Rs.{" "}
                    {order.productPrice || order.product?.prod_price || 0}
                  </span>
                </div>

                <div className="order-price">
                  <span>Total</span>
                  <h3>Rs. {order.totalPrice}</h3>
                </div>
              </div>

              <div className="order-details">
                <span><b>Name:</b> {order.customerName}</span>
                <span><b>Phone:</b> {order.customerPhone}</span>
                <span><b>Address:</b> {order.deliveryAddress}</span>
                <span><b>Payment:</b> {order.paymentMethod || "Cash on Delivery"}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderHistory;