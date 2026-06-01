import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../BaseUrl/BaseUel";
import "./UserHome.css";
import { useLocation, useNavigate } from "react-router-dom";

const UserHome = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const [openFilters, setOpenFilters] = useState({
    skinConcern: false,
    skinType: false,
    ingredients: false,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const search = new URLSearchParams(location.search).get("search") || "";

  const skinConcernItems = [
    "Dullness",
    "Dryness",
    "Dark Spots",
    "Pigmentation",
    "Acne",
    "Damaged Skin Barrier",
    "Excess Oil",
    "Ageing",
  ];

  const skinTypeItems = ["Dry", "Oily", "Combination", "Sensitive", "Normal"];

 const ingredientItems = [
  "Hyaluronic",
  "Niacinamide",
  "Vitamin C",
  "Blueberry",
  "Ceramides",
  "Watermelon",
  "Cica",
  "Strawberry",
  "Blood Orange",
  "Glycolic",
  "Salicylic",
  "Pomegranate",
  "Peptides",
  "Mango",
  "Dragon Fruit",
];
  const userData = JSON.parse(localStorage.getItem("userData") || "null");

  const isAdmin =
    userData &&
    String(userData.status || "")
      .trim()
      .toUpperCase() === "ADMIN";

  const heroSlides = [
    { id: 1, title: "Visibly Glowing Skin", image: "/images/banner1.jpg" },
    { id: 2, title: "Hydration That Lasts", image: "/images/banner2.jpg" },
    { id: 3, title: "Oil Control Care", image: "/images/banner3.jpg" },
    { id: 4, title: "Brightening Care", image: "/images/banner4.jpg" },
    { id: 5, title: "Gentle Skin Repair", image: "/images/banner5.jpg" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    const searchText = search.toLowerCase();

    const filtered = products.filter(
      (product) =>
        product.prod_name?.toLowerCase().includes(searchText) ||
        product.prod_category?.toLowerCase().includes(searchText) ||
        product.prod_subcategory?.toLowerCase().includes(searchText) ||
        product.skin_concern?.toLowerCase().includes(searchText) ||
        product.ingredients?.toLowerCase().includes(searchText) ||
        product.skin_type?.toLowerCase().includes(searchText),
    );

    setFilteredProducts(filtered);
  }, [search, products]);

  const fetchProducts = () => {
    axios
      .get(`${baseUrl}/showAllProducts`)
      .then((res) => {
        const activeProducts = (res.data || []).filter(
          (product) => product.status !== "INACTIVE",
        );

        setProducts(activeProducts);
        setFilteredProducts(activeProducts);
      })
      .catch((err) => console.log("Error fetching products:", err));
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/images/default-product.jpg";
    const filename = imagePath.split("/").pop().split("\\").pop();
    return `${baseUrl}/images/${filename}`;
  };

  const toggleFilter = (name) => {
    setOpenFilters((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const filterByValue = (value) => {
    navigate(`/userhome?search=${encodeURIComponent(value)}`);
  };

  const clearSearch = () => {
    navigate("/userhome");
  };

  const productInfo = (id) => {
    if (isAdmin) return;
    navigate(`/product-info/${id}`);
  };

  const handleBuyNow = (product) => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    navigate(`/customer-info/${product.prod_id}`);
  };

  const handleAddToCart = (product) => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    const cartdata = {
      product_id: product.prod_id,
      product_quantity: 1,
      user_email: email,
    };

    axios
      .post(`${baseUrl}/addToCart`, cartdata)
      .then(() => {
        window.dispatchEvent(new Event("cartUpdated"));
        alert("Product added to cart!");
        navigate("/cart-info");
      })
      .catch((error) => {
        alert("Failed to add product to cart");
        console.log(error);
      });
  };

  const activeHero = heroSlides[activeSlide];

  return (
    <div className="user-home">
      {activeHero && !search && (
        <section className="hero-slider">
          <img
            src={activeHero.image}
            alt={activeHero.title}
            className="hero-image"
          />

          <div className="hero-dots">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                className={activeSlide === index ? "active" : ""}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </section>
      )}

      <div className="products-container">
        {!search && <h2 className="section-heading">Bestseller</h2>}

        <div className="collection-layout">
          <aside className="collection-sidebar">
            <div className="sort-row">
              <span>Sort By:</span>
              <button type="button">Best selling</button>
              <span>⌄</span>
            </div>

            <h2 className="filter-title">Filters</h2>
            <div className="filter-block">
              <button
                type="button"
                className="filter-toggle"
                onClick={() => toggleFilter("skinConcern")}
              >
                <span>Skin Concern</span>
                <span>⌄</span>
              </button>

              {openFilters.skinConcern && (
                <div className="filter-image-grid">
                  {skinConcernItems.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => filterByValue(item)}
                    >
                      <img
                        src={`/images/concern${index + 1}.jpg`}
                        alt={item}
                        onError={(e) => {
                          e.currentTarget.src = "/images/default-product.jpg";
                        }}
                      />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="filter-block">
              <button
                type="button"
                className="filter-toggle"
                onClick={() => toggleFilter("skinType")}
              >
                <span>Skin Type</span>
                <span>⌄</span>
              </button>

              {openFilters.skinType && (
                <div className="simple-filter-list">
                  {skinTypeItems.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => filterByValue(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="filter-block">
              <button
                type="button"
                className="filter-toggle"
                onClick={() => toggleFilter("ingredients")}
              >
                <span>Ingredients</span>
                <span>⌄</span>
              </button>

              {openFilters.ingredients && (
                <div className="filter-image-grid">
                  {ingredientItems.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => filterByValue(item)}
                    >
                      <img
                        src={`/images/ingredient${index + 1}.jpg`}
                        alt={item}
                        onError={(e) => {
                          e.currentTarget.src = "/images/default-product.jpg";
                        }}
                      />
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </aside>

          <main className="products-main">
            <p className="showing-count">
              Showing {filteredProducts.length} products
            </p>

            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div
                  key={product.prod_id}
                  onClick={() => productInfo(product.prod_id)}
                  className="product-card"
                >
                  <div
                    className="product-image-container"
                    onMouseEnter={() => setHoveredProduct(product.prod_id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    <img
                      src={
                        hoveredProduct === product.prod_id
                          ? getImageUrl(product.prod_img2)
                          : getImageUrl(product.prod_img1)
                      }
                      alt={product.prod_name}
                      className="product-image"
                    />

                    {product.prod_quantity > 0 && (
                      <div className="stock-badge">
                        {product.prod_quantity} left
                      </div>
                    )}
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">{product.prod_name}</h3>
                    <p className="product-category">{product.prod_category}</p>
                    <p className="product-price">
                      Rs. {Number(product.prod_price).toFixed(2)}
                    </p>
                  </div>

                  {!isAdmin && (
                    <div className="product-actions">
                      <button
                        className="btn btn-buy-now"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyNow(product);
                        }}
                      >
                        Buy Now
                      </button>

                      <button
                        className="btn btn-add-to-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {search && filteredProducts.length === 0 && (
              <div className="no-products-found">
                <p>No products found matching "{search}"</p>
                <button className="clear-search" onClick={clearSearch}>
                  Clear Search
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
