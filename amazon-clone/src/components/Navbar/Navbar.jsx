import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ cartCount = 0 }) {
  const [query, setQuery]       = useState("");
  const [category, setCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    // wire up to your router / search handler here
    console.log("Search:", category, query);
  };

  const CATEGORIES = [
    "All", "Electronics", "Books", "Clothing",
    "Kitchen", "Toys", "Sports", "Grocery",
  ];

  return (
    <>
      {/* ── Primary bar ───────────────────────────────────────────── */}
      <header className="nav-root">

        {/* Logo */}
        <Link to="/" className="nav-logo" aria-label="Amazon Home">
          <span className="nav-logo-amaz">amaz</span>
          <span className="nav-logo-on">on</span>
          <span className="nav-logo-smile" aria-hidden="true" />
        </Link>

        {/* Deliver to */}
        <div className="nav-deliver">
          <span className="nav-deliver-icon">📍</span>
          <span className="nav-deliver-text">
            <small>Deliver to</small>
            <strong>India</strong>
          </span>
        </div>

        {/* Search */}
        <form className="nav-search" onSubmit={handleSearch} role="search">
          <select
            className="nav-search-cat"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Search category"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input
            className="nav-search-input"
            type="text"
            placeholder="Search Amazon"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search Amazon"
          />

          <button className="nav-search-btn" type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              width="18" height="18">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>

        {/* Right actions */}
        <nav className="nav-actions" aria-label="Account and cart">
          <a className="nav-action-btn" href="#" aria-label="Account">
            <small>Hello, sign in</small>
            <strong>Account &amp; Lists <span className="nav-chevron">▾</span></strong>
          </a>

          <a className="nav-action-btn nav-action-orders" href="#" aria-label="Orders">
            <small>Returns</small>
            <strong>&amp; Orders</strong>
          </a>

          <Link
            to="/cart"
            className={`nav-cart ${isActive("/cart") ? "nav-cart--active" : ""}`}
            aria-label={`Cart, ${cartCount} items`}
          >
            <span className="nav-cart-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                width="26" height="26">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="nav-cart-badge">{cartCount > 99 ? "99+" : cartCount}</span>
              )}
            </span>
            <span className="nav-cart-label">Cart</span>
          </Link>

          {/* Hamburger (mobile) */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`nav-ham-line ${menuOpen ? "open" : ""}`} />
            <span className={`nav-ham-line ${menuOpen ? "open" : ""}`} />
            <span className={`nav-ham-line ${menuOpen ? "open" : ""}`} />
          </button>
        </nav>
      </header>

      {/* ── Sub-nav bar ───────────────────────────────────────────── */}
      <nav className="nav-sub" aria-label="Department navigation">
        <button className="nav-sub-all">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" width="16" height="16">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          All
        </button>

        {[
          { label: "Home",     to: "/"         },
          { label: "Products", to: "/products" },
          { label: "Today's Deals",    to: "/products" },
          { label: "Customer Service", to: "/"         },
          { label: "Registry",         to: "/"         },
          { label: "Prime",            to: "/"         },
          { label: "Gift Cards",       to: "/"         },
        ].map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            className={`nav-sub-link ${isActive(to) && (to === "/" ? location.pathname === "/" : true) ? "nav-sub-link--active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      <div className={`nav-drawer ${menuOpen ? "nav-drawer--open" : ""}`} aria-hidden={!menuOpen}>
        <div className="nav-drawer-header">
          <span className="nav-drawer-greeting">👋 Hello, sign in</span>
          <button
            className="nav-drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >✕</button>
        </div>

        <nav className="nav-drawer-links">
          {[
            { label: "🏠  Home",            to: "/"         },
            { label: "📦  Products",         to: "/products" },
            { label: "🛒  Cart",             to: "/cart"     },
            { label: "👤  Account & Lists",  to: "/"         },
            { label: "📋  Returns & Orders", to: "/"         },
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="nav-drawer-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="nav-drawer-footer">
          <span>© 2025 Amazon Clone</span>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}