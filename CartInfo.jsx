// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import baseUrl from '../../../BaseUrl/BaseUel';
// import './CartInfo.css'

// function CartInfo() {
//   const [CartInfo, setCartInfo] = useState([])

//   useEffect(() => {
//      const email= localStorage.getItem('userEmail') || null;
//      if(email!== null){
//       console.log("backend connection");

//       axios.get(`${baseUrl}/cart-info/${email}`)
//       .then((response)=>{
//         console.log(response.data);
//         setCartInfo(response.data);
//       }).catch((error)=>{
//         alert("server side error");
//         console.log(error);
//       })
//      }
//   }, [])
  
//   return (
//     <div className="ci-container">
//       <div className="ci-header">
//         <h1 className="ci-title">Shopping Cart</h1>
//         <p className="ci-subtitle">{CartInfo.length} items in your cart</p>
//       </div>

//       <div className="ci-content">
//         {/* LEFT SIDE - CART ITEMS */}
//         <div className="ci-items-section">
//           {CartInfo.length === 0 ? (
//             <div className="ci-empty-state">
//               <div className="ci-empty-icon">🛒</div>
//               <h2>Your cart is empty</h2>
//               <p>Start shopping to add items to your cart</p>
//             </div>
//           ) : (
//             <div className="ci-items-list">
//               {CartInfo.map((info) => (
//                 <div key={info.cart_id} className="ci-cart-item">
//                   <div className="ci-item-image">
//                     <img src={`${baseUrl}/images/${info.prod_img1}`} alt={info.prod_name} />
//                   </div>

//                   <div className="ci-item-details">
//                     <h3 className="ci-item-name">{info.prod_name}</h3>
//                     <p className="ci-item-category">{info.prod_category}</p>
//                     <p className="ci-item-price">₹{info.prod_price}</p>
//                   </div>

//                   <div className="ci-item-quantity">
//                     <button className="ci-qty-btn">−</button>
//                     <input type="number" className="ci-qty-input" value={info.product_quantity} readOnly />
//                     <button className="ci-qty-btn">+</button>
//                   </div>

//                   <div className="ci-item-total">
//                     <p className="ci-total-price">₹{(info.prod_price * info.prod_quantity).toFixed(2)}</p>
//                   </div>

//                   <button className="ci-remove-btn">Remove</button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* RIGHT SIDE - ORDER SUMMARY */}
//         <div className="ci-summary-section">
//           <div className="ci-summary-card">
//             <h2 className="ci-summary-title">Order Summary</h2>

//             <div className="ci-summary-row">
//               <span>Subtotal</span>
//               <span className="ci-price">₹{CartInfo.reduce((sum, item) => sum + (item.prod_price * item.prod_quantity), 0).toFixed(2)}</span>
//             </div>

//             <div className="ci-summary-row">
//               <span>Delivery</span>
//               <span className="ci-price ci-free">FREE</span>
//             </div>

//             <div className="ci-summary-row">
//               <span>Tax (18%)</span>
//               <span className="ci-price">₹{(CartInfo.reduce((sum, item) => sum + (item.prod_price * item.prod_quantity), 0) * 0.18).toFixed(2)}</span>
//             </div>

//             <div className="ci-summary-divider"></div>

//             <div className="ci-summary-row ci-grand-total">
//               <span>Grand Total</span>
//               <span className="ci-price ci-total">₹{(CartInfo.reduce((sum, item) => sum + (item.prod_price * item.prod_quantity), 0) * 1.18).toFixed(2)}</span>
//             </div>

//             <button className="ci-btn ci-btn-checkout">Proceed to Checkout</button>
//             <button className="ci-btn ci-btn-continue">Continue Shopping</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartInfo
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../../BaseUrl/BaseUel";
import "./CartInfo.css";

function CartInfo() {
  const navigate = useNavigate();

  const [cartInfo, setCartInfo] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const response = await axios.get(`${baseUrl}/cart-info/${email}`);
    setCartInfo(response.data || []);
  };

  useEffect(() => {
    fetchCartItems()
      .catch((error) => {
        console.log("Cart fetch error:", error);
        alert("Failed to load cart");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const subtotal = useMemo(() => {
    return cartInfo.reduce((sum, item) => {
      return sum + Number(item.prod_price || 0) * Number(item.product_quantity || 1);
    }, 0);
  }, [cartInfo]);

  const delivery = subtotal > 999 || subtotal === 0 ? 0 : 79;
  const tax = subtotal * 0.18;
  const total = subtotal + delivery + tax;

  const updateQuantity = async (item, change) => {
    const nextQty = Number(item.product_quantity || 1) + change;

    if (nextQty < 1) return;

    setUpdatingId(item.cart_id);

    try {
      await axios.put(`${baseUrl}/update-cart-quantity`, {
        cart_id: item.cart_id,
        product_id: item.product_id,
        product_quantity: nextQty,
        user_email: localStorage.getItem("userEmail"),
      });

      await fetchCartItems();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log("Quantity update error:", error);
      alert("Server error while updating quantity");
    } finally {
      setUpdatingId(null);
    }
  };

  const removeCartItem = async (cartId) => {
    if (!window.confirm("Remove this item from cart?")) return;

    setUpdatingId(cartId);

    try {
      const response = await axios.delete(`${baseUrl}/remove-cart-item/${cartId}`);

      if (response.data?.success === true) {
        await fetchCartItems();
        window.dispatchEvent(new Event("cartUpdated"));
      } else {
        alert(response.data?.message || "Failed to remove item");
      }
    } catch (error) {
      console.log("Remove cart item error:", error);
      alert("Failed to delete item. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCheckout = () => {
    if (cartInfo.length === 0) return;

    const firstProductId = cartInfo[0]?.product_id;

    if (!firstProductId) {
      alert("Product id not found");
      return;
    }

    navigate(`/customer-info/${firstProductId}`);
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Loading cart...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <p>Secure Checkout</p>
        <h1>My Cart</h1>
        <span>{cartInfo.length} item{cartInfo.length === 1 ? "" : "s"} in your cart</span>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartInfo.length === 0 ? (
            <div className="cart-empty">
              <h2>Your cart is empty</h2>
              <button onClick={() => navigate("/userhome")}>Start Shopping</button>
            </div>
          ) : (
            cartInfo.map((item, index) => (
              <div
                className="cart-card"
                key={item.cart_id}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <img
                  src={`${baseUrl}/images/${item.prod_img1}`}
                  alt={item.prod_name}
                />

                <div className="cart-product-info">
                  <p>{item.prod_category}</p>
                  <h3>{item.prod_name}</h3>
                  <b>₹{Number(item.prod_price || 0).toFixed(2)}</b>
                </div>

                <div className="cart-quantity">
                  <button
                    disabled={updatingId === item.cart_id}
                    onClick={() => updateQuantity(item, -1)}
                  >
                    -
                  </button>

                  <span>{item.product_quantity}</span>

                  <button
                    disabled={updatingId === item.cart_id}
                    onClick={() => updateQuantity(item, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-total-price">
                  ₹{(
                    Number(item.prod_price || 0) *
                    Number(item.product_quantity || 1)
                  ).toFixed(2)}
                </div>

                <button
                  className="remove-btn"
                  disabled={updatingId === item.cart_id}
                  onClick={() => removeCartItem(item.cart_id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h2>Order Details</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <b>₹{subtotal.toFixed(2)}</b>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <b>{delivery === 0 ? "Free" : `₹${delivery.toFixed(2)}`}</b>
          </div>

          <div className="summary-row">
            <span>Tax 18%</span>
            <b>₹{tax.toFixed(2)}</b>
          </div>

          <div className="summary-row grand-total">
            <span>Total</span>
            <b>₹{total.toFixed(2)}</b>
          </div>

          <button
            className="checkout-btn"
            disabled={cartInfo.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

          <button className="continue-btn" onClick={() => navigate("/userhome")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartInfo;