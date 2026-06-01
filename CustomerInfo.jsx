// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import baseUrl from '../../../BaseUrl/BaseUel'
// import './CustomerInfo.css'

// function CustomerInfo() {
//     const param=useParams()

//     const [product, setproduct] = useState({})

//     useEffect(() => {
//       return () => {
//         const id=param.id;
//         console.log(id);

//         axios.get(`${baseUrl}/getProductById?id=${id}`)
//         .then((response)=>{
//             console.log(response.data);
//             setproduct(response.data);
//         })
//         .catch((error)=>{
//             console.log(error);
//             alert("server side error");
//         })
        
//       }
//     }, [])
    
//  return (
//   <div className="customer-info-container">
//     <div className="customer-card">
//       <div className="card-header">
//         <div className="header-icon">
//           <span className="icon">👤</span>
//         </div>
//         <h1 className="header-title">Customer Information</h1>
//         <div className="header-glow"></div>
//       </div>
      
//       <div className="card-body">
//         <div className="info-grid">
//           <div className="info-item">
//             <div className="info-label">
//               <span className="label-icon">🆔</span>
//               <span>Product ID</span>
//             </div>
//             <div className="info-value">{product.prod_id || 'Loading...'}</div>
//           </div>
          
//           <div className="info-item">
//             <div className="info-label">
//               <span className="label-icon">📦</span>
//               <span>Product Name</span>
//             </div>
//             <div className="info-value product-name">{product.prod_name || 'Loading...'}</div>
//           </div>
          
//           <div className="info-item price-item">
//             <div className="info-label">
//               <span className="label-icon">💰</span>
//               <span>Price</span>
//             </div>
//             <div className="info-value product-price">
//               ₹{product.prod_price || '0'}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="card-footer">
//         <button className="action-btn">
//           <span className="btn-icon">🛒</span>
//           Proceed to Checkout
//         </button>
//       </div>
//     </div>
//   </div>
// )
// }

// export default CustomerInfo
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../../../BaseUrl/BaseUel";
import "./CustomerInfo.css";

function CustomerInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: localStorage.getItem("userEmail") || "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    axios
      .get(`${baseUrl}/getProductById?id=${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.log(err);
        alert("Product loading failed");
      });
  }, [id]);

  const subtotal = Number(product.prod_price || 0) * quantity;
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phoneNumber,
      deliveryAddress: formData.address,
      productId: product.prod_id,
      productName: product.prod_name,
      productPrice: product.prod_price,
      quantity: quantity,
      totalPrice: total.toFixed(2),
      paymentMethod: paymentMethod,
      orderStatus: "Pending",
    };

    axios
      .post(`${baseUrl}/order/addOrderData`, orderData)
      .then(() => {
        alert("Order placed successfully");
        navigate(`/order-history/${formData.email}`);
      })
      .catch((err) => {
        console.log(err);
        alert("Order failed");
      })
      .finally(() => setIsSubmitting(false));
  };

  const payments = [
    { name: "Cash on Delivery", icon: "COD", text: "Pay when your order arrives." },
    { name: "PhonePe", icon: "PE", text: "Pay using PhonePe UPI." },
    { name: "Google Pay", icon: "G", text: "Pay using Google Pay UPI." },
    { name: "Paytm", icon: "PT", text: "Pay using Paytm wallet or UPI." },
  ];

  return (
    <div className="checkout-page">
      <div className="checkout-box">
        <div className="product-summary">
          <img
            src={
              product.prod_img1
                ? `${baseUrl}/images/${product.prod_img1}`
                : "https://via.placeholder.com/400"
            }
            alt={product.prod_name}
          />

          <div className="product-data">
            <span>{product.prod_category}</span>
            <h2>{product.prod_name}</h2>
            <h3>Rs. {Number(product.prod_price || 0).toFixed(2)}</h3>
          </div>

          <div className="qty-box">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>

            <b>{quantity}</b>

            <button type="button" onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          </div>

          <div className="bill-box">
            <p>
              <span>Subtotal</span>
              <b>Rs. {subtotal.toFixed(2)}</b>
            </p>

            <p>
              <span>Tax</span>
              <b>Rs. {tax.toFixed(2)}</b>
            </p>

            <p className="bill-total">
              <span>Total</span>
              <b>Rs. {total.toFixed(2)}</b>
            </p>
          </div>
        </div>

        <form className="order-form" onSubmit={placeOrder}>
          <div className="form-title">
            <h2>Order Details</h2>
            <p>Fill delivery details and choose payment method</p>
          </div>

          <div className="form-grid">
            <label>
              Full Name
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Phone
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>

            <label className="full-row">
              Delivery Address
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                required
              />
            </label>
          </div>

          <div className="payment-section">
            <h3>Payment Method</h3>

            {payments.map((pay) => (
              <label
                key={pay.name}
                className={`pay-card ${paymentMethod === pay.name ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={pay.name}
                  checked={paymentMethod === pay.name}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <div className="pay-icon">{pay.icon}</div>

                <div>
                  <b>{pay.name}</b>
                  <p>{pay.text}</p>
                </div>
              </label>
            ))}
          </div>

          <button className="place-order-btn" disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomerInfo;