import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import baseUrl from "../../../BaseUrl/BaseUel";
import "./OrderDetails.css";

function OrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/order/orderById/${orderId}`)
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  }, [orderId]);

  if (!order) {
    return <div className="order-details-page">Loading order details...</div>;
  }

  return (
    <div className="order-details-page">
      <div className="order-details-box">
        <Link to="/order-history" className="back-link">Back to Orders</Link>

        <h1>Order #{order.orderInfo_id}</h1>

        <span className={`details-status ${(order.orderStatus || "Pending").toLowerCase()}`}>
          {order.orderStatus || "Pending"}
        </span>

        <div className="details-grid">
          <div>
            <h3>Product</h3>
            <p>{order.productName}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total: ₹{order.totalPrice}</p>
          </div>

          <div>
            <h3>Customer</h3>
            <p>{order.customerName}</p>
            <p>{order.customerEmail}</p>
            <p>{order.customerPhone}</p>
          </div>

          <div>
            <h3>Delivery Address</h3>
            <p>{order.deliveryAddress}</p>
          </div>

          <div>
            <h3>Payment</h3>
            <p>{order.paymentMethod || "Cash on Delivery"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;