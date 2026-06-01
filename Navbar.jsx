import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 64 64" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 24h29v21H7z" />
    <path d="M36 31h10l9 9v5H36z" />
    <circle cx="18" cy="48" r="5" />
    <circle cx="47" cy="48" r="5" />
    <path d="M3 36h8" />
    <path d="M5 43h8" />
    <path d="M36 45h6" />
    <path d="M46 31v9h9" />
    <path d="M12 19h17" />
  </svg>
);

const BagIcon = () => (
  <svg viewBox="0 0 64 64" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 22h28l-3 34H21z" />
    <path d="M24 22c0-7 3-12 8-12s8 5 8 12" />
    <path d="M25 30h14" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 64 64" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="30" cy="20" r="9" />
    <path d="M12 55c3-13 10-19 18-19s15 6 18 19" />
    <path d="M45 39l5 5 8-15" stroke="#00c9a7" />
  </svg>
);

const AdminIcon = () => (
  <svg viewBox="0 0 64 64" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 6l20 8v16c0 13-8 23-20 28C20 53 12 43 12 30V14z" />
    <path d="M24 30l6 6 12-14" stroke="#8b4dff" />
  </svg>
);

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

function Navbar({ userdata }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [warningIndex, setWarningIndex] = useState(0);
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("userData") || "null"),
  );

  const warningMessages = [
    "BEWARE: No one from our team will call you for offers, free gifts or payments.",
    "Click for more Offers",
  ];

  useEffect(() => {
    if (userdata) {
      localStorage.setItem("userData", JSON.stringify(userdata));
      setUser(userdata);
    }
  }, [userdata]);

  useEffect(() => {
    const timer = setInterval(() => {
      setWarningIndex((current) => (current + 1) % warningMessages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateUser = () =>
      setUser(JSON.parse(localStorage.getItem("userData") || "null"));

    const updateCartCount = () =>
      setCartCount(JSON.parse(localStorage.getItem("cart") || "[]").length);

    updateUser();
    updateCartCount();

    window.addEventListener("login", updateUser);
    window.addEventListener("logout", updateUser);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("login", updateUser);
      window.removeEventListener("logout", updateUser);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const isLoggedIn = Boolean(user);
  const userStatus =
    typeof user === "string"
      ? ""
      : String(user?.status || "").trim().toUpperCase();

  const isAdmin = userStatus === "ADMIN";
  const isUser = isLoggedIn && !isAdmin;

  useEffect(() => {
    const allowedAdminPaths = [
      "/dashboard",
      "/add-products",
      "/show-product",
      "/admin-orders",
      "/userhome",
    ];

    const isEditProductPage = location.pathname.startsWith("/updateProduct/");

    if (
      isAdmin &&
      !allowedAdminPaths.includes(location.pathname) &&
      !isEditProductPage
    ) {
      navigate("/dashboard");
    }
  }, [isAdmin, location.pathname, navigate]);

  const userEmail =
    typeof user === "string"
      ? localStorage.getItem("userEmail") || ""
      : user?.email || localStorage.getItem("userEmail") || "";

  const logoPath = "/userhome";

  const accountLinks = [
    ["Dashboard", "/dashboard"],
    ["Add Products", "/add-products"],
    ["Show Product", "/show-product"],
    ["Orders", "/admin-orders"],
  ];

  const topPicks = [
    ["Vitamin C Sunscreen", "/userhome?search=sunscreen", "/images/vitamin-c-sunscreen.png"],
    ["Vitamin C Moisturizer", "/userhome?search=moisturizer", "/images/vitamin-c-moisturizer.png"],
    ["Watermelon Sunscreen", "/userhome?search=watermelon", "/images/watermelon-sunscreen.png"],
    ["Barrier Repair Face Cream", "/userhome?search=barrier", "/images/barrier-cream.png"],
    ["Tinted Sunscreen", "/userhome?search=tinted", "/images/tinted-sunscreen.png"],
    ["72 Hrs Probiotics Gel", "/userhome?search=gel", "/images/probiotics-gel.png"],
  ];

  const menuColumns = [
    {
      title: "Categories",
      items: [
        "All Products",
        "Moisturizer",
        "Sunscreen",
        "Face Serums",
        "Face Wash",
        "Lip Care",
        "Face Mask",
        "Eye Care",
        "Face Toners",
        "Body Care",
        "Hair Care",
        "Combos",
      ],
    },
    {
      title: "Skin Concern",
      items: [
        "Dullness",
        "Dryness",
        "Dark Spots",
        "Pigmentation",
        "Acne",
        "Damaged Skin Barrier",
        "Excess Oil",
        "Ageing",
      ],
    },
    {
      title: "Ingredients",
      items: [
        "Vitamin C",
        "Hyaluronic + Ceramides",
        "Niacinamide + CICA",
        "Watermelon + AHA",
        "Strawberry",
        "Salicylic Acid",
        "Pomegranate + Retinol",
        "Mango",
        "Dragon Fruit",
      ],
    },
    {
      title: "Skin Type",
      items: ["Dry", "Oily", "Combination", "Sensitive", "Normal"],
    },
  ];

  const activeColumn = menuColumns.find(
    (column) => column.title === activeDropdown,
  );

  const closeMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    if (dropdownOpen && activeDropdown === name) {
      setDropdownOpen(false);
      setActiveDropdown(null);
      return;
    }

    setActiveDropdown(name);
    setDropdownOpen(true);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      search.trim() === ""
        ? "/userhome"
        : `/userhome?search=${encodeURIComponent(search)}`,
    );
    closeMenus();
  };

  const handleMenuItemClick = (text) => {
    navigate(
      text === "All Products"
        ? "/userhome"
        : `/userhome?search=${encodeURIComponent(text)}`,
    );
    closeMenus();
  };

  const handleViewAll = () => {
    navigate("/userhome");
    closeMenus();
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
    localStorage.removeItem("cart");

    setUser(null);
    setCartCount(0);

    window.dispatchEvent(new Event("logout"));
    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/login");
  };

  return (
    <>
      {isUser && (
        <div className="warning-bar" key={warningIndex}>
          {warningMessages[warningIndex]}
        </div>
      )}

      <nav className="navbar">
        <div className="navbar-main">
          <Link className="logo" to={logoPath} onClick={closeMenus}>
            <span className="brand-text">
              DOT<span className="brand-and">&</span>KEY
            </span>
          </Link>

          {isUser && (
            <button
              type="button"
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "X" : "Menu"}
            </button>
          )}

          {isLoggedIn && (
            <form className="search-form" onSubmit={handleSearch}>
              <span className="search-icon">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search For Facewash"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          )}

          <div className="nav-actions">
            {isUser && (
              <>
                <button
                  type="button"
                  className="icon-btn"
                  title="Track Order"
                  onClick={() => navigate(`/order-history/${userEmail}`)}
                >
                  <TruckIcon />
                </button>

                <button
                  type="button"
                  className="icon-btn cart-btn"
                  onClick={() => navigate("/cart-info")}
                  title="Cart"
                >
                  <BagIcon />
                  {cartCount > 0 && (
                    <span className="cart-count">{cartCount}</span>
                  )}
                </button>

                <div className="account-mini">
                  <button type="button" className="icon-btn" title="Account">
                    <UserIcon />
                  </button>
                  <span className="account-name">
                    {typeof user === "string" ? user : user.username}
                  </span>
                </div>
              </>
            )}

            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <div className="admin-mini">
                    <button type="button" className="icon-btn" title="Admin">
                      <AdminIcon />
                    </button>
                    <span className="admin-name">
                      {typeof user === "string"
                        ? "Admin"
                        : user.username || "Admin"}
                    </span>
                  </div>
                )}

                <span className="user-name">
                  {typeof user === "string" ? user : user.username}
                </span>

                <button
                  type="button"
                  className="logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="login-btn" to="/login">
                  User Login
                </Link>
                <button
                  type="button"
                  className="admin-login-btn"
                  onClick={() => navigate("/admin-login")}
                >
                  Admin Login
                </button>
              </>
            )}
          </div>
        </div>

        {isAdmin && (
          <div className="admin-shop-nav">
            {accountLinks.map((item) => (
              <NavLink
                key={item[0]}
                to={item[1]}
                className="admin-nav-link"
                onClick={closeMenus}
              >
                {item[0]}
              </NavLink>
            ))}
          </div>
        )}

        {isUser && (
          <div className="user-shop-area">
            <div className={menuOpen ? "shop-nav open" : "shop-nav"}>
              {["Shop All", "Skin Concern", "Ingredients", "Skin Type"].map(
                (name) => {
                  const dropdownColumn = menuColumns.find(
                    (column) => column.title === name,
                  );
                  const isActive = dropdownOpen && activeDropdown === name;

                  return (
                    <div className="shop-nav-item" key={name}>
                      <button
                        type="button"
                        className={`shop-nav-link ${isActive ? "active" : ""}`}
                        onClick={() => toggleDropdown(name)}
                      >
                        {name} <ChevronDown />
                      </button>

                      {isActive && name !== "Shop All" && dropdownColumn && (
                        <div
                          className={`single-dropdown ${name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}`}
                        >
                          {dropdownColumn.items.map((item) => (
                            <button
                              key={item}
                              type="button"
                              onClick={() => handleMenuItemClick(item)}
                            >
                              {item}
                            </button>
                          ))}

                          <button
                            type="button"
                            className="single-dropdown-view-all"
                            onClick={handleViewAll}
                          >
                            View All &gt;
                          </button>
                        </div>
                      )}
                    </div>
                  );
                },
              )}

              <button
                type="button"
                className="shop-nav-link"
                onClick={() => handleMenuItemClick("new")}
              >
                New Arrivals
              </button>
            </div>

            {dropdownOpen && activeDropdown === "Shop All" && (
              <div className="mega-menu">
                <div className="mega-top">
                  <h3>Top Picks</h3>

                  <div className="top-picks">
                    {topPicks.map(([label, link, image]) => (
                      <button
                        key={label}
                        type="button"
                        className="top-pick-item"
                        onClick={() => {
                          navigate(link);
                          closeMenus();
                        }}
                      >
                        <img src={image} alt="" className="top-pick-img" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mega-columns">
                  {menuColumns.map((column) => (
                    <div className="mega-column" key={column.title}>
                      <h4>{column.title}</h4>

                      {column.items.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => handleMenuItemClick(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mega-shop-btn"
                  onClick={handleViewAll}
                >
                  View All &gt;
                </button>
              </div>
            )}

            <div className="offer-strip">
              <span>UPTO 20% OFF</span>
              <strong>+ Free Gifts</strong>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
