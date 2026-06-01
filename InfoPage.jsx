import React from "react";
import "./InfoPage.css";

const pages = {
  about: {
    title: "About Us",
    subtitle: "Clean beauty care made simple",
    text: "Dot & Key is a skincare shopping website where customers can explore beauty products, add items to cart, place orders, and track their skincare purchases easily.",
    points: [
      "Quality skincare products for daily routines",
      "Easy shopping with cart and order tracking",
      "Helpful support for delivery, returns, and product questions"
    ]
  },
  contact: {
    title: "Contact Us",
    subtitle: "We are here to help",
    text: "Have a question about products, orders, delivery, or returns? Contact our support team and we will help you as soon as possible.",
    points: [
      "Email: support@dotandkey.com",
      "Phone: +91 98765 43210",
      "Time: Monday to Saturday, 10 AM to 6 PM"
    ]
  },
  faq: {
    title: "FAQ",
    subtitle: "Quick answers",
    text: "Here are some common questions about shopping on our website.",
    points: [
      "You can browse products without login",
      "Login is needed before placing an order",
      "Order status is available in order history"
    ]
  },
  shipping: {
    title: "Shipping",
    subtitle: "Delivery information",
    text: "We try to deliver your skincare products safely and quickly.",
    points: [
      "Orders are usually shipped within 2 to 4 working days",
      "Delivery time may change based on city",
      "You can track your order from order history"
    ]
  },
  returns: {
    title: "Returns",
    subtitle: "Easy return support",
    text: "Returns are accepted for damaged, wrong, or defective products.",
    points: [
      "Return request should be raised soon after delivery",
      "Keep product photos ready",
      "Refund or replacement depends on product condition"
    ]
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Your data matters",
    text: "Your personal details are used only for login, delivery, and order updates.",
    points: [
      "We do not sell your personal information",
      "Your address is used only for delivery",
      "Login details are used to manage your account"
    ]
  },
  terms: {
    title: "Terms and Conditions",
    subtitle: "Website rules",
    text: "Please use this website only for valid shopping and order purposes.",
    points: [
      "Product prices may change",
      "Orders depend on stock availability",
      "Wrong use of the website is not allowed"
    ]
  },
  support: {
    title: "Support",
    subtitle: "Customer care",
    text: "Our support team helps with orders, payments, delivery, and returns.",
    points: [
      "Share your order id for faster help",
      "Support is available on working days",
      "We try to reply as soon as possible"
    ]
  }
};

function InfoPage({ type }) {
  const page = pages[type] || pages.about;

  return (
    <div className="info-page">
      <div className="info-box">
        <span className="info-tag">{page.subtitle}</span>
        <h1>{page.title}</h1>
        <p>{page.text}</p>

        <div className="info-list">
          {page.points.map((point) => (
            <div className="info-item" key={point}>
              <span></span>
              <p>{point}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfoPage;