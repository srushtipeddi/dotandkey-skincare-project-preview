import React from "react";
import { Link, useParams } from "react-router-dom";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const { orderId } = useParams();

  return (
    <div className="confirm-page">
      <div className="confirm-box">
        <div className="confirm-icon">✓</div>
        <h1>Order Placed Successfully</h1>
        <p>Your order #{orderId} has been placed.</p>

        <div className="confirm-actions">
          <Link to="/userhome">Continue Shopping</Link>
          <Link to="/order-history">View Orders</Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;