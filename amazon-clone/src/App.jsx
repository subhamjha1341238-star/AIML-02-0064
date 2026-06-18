import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Ember+Display:wght@400;700&family=Amazon+Ember:wght@300;400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --amazon-orange: #FF9900;
    --amazon-orange-hover: #F7A74B;
    --amazon-dark: #131921;
    --amazon-navy: #232F3E;
    --amazon-navy-hover: #37475A;
    --amazon-light-blue: #EAEDED;
    --amazon-red: #B12704;
    --amazon-green: #007600;
    --amazon-link: #007185;
    --amazon-link-hover: #C7511F;
    --white: #FFFFFF;
    --text-primary: #0F1111;
    --text-secondary: #565959;
    --border: #D5D9D9;
    --card-shadow: 0 2px 5px rgba(15,17,17,.15);
    --radius: 8px;
  }

  body {
    font-family: 'Amazon Ember', 'Arial', sans-serif;
    background: var(--amazon-light-blue);
    color: var(--text-primary);
    min-height: 100vh;
  }

  /* ── Navbar ── */
  .navbar {
    background: var(--amazon-dark);
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0,0,0,.4);
  }

  .navbar-logo {
    display: flex;
    align-items: center;
    gap: 2px;
    text-decoration: none;
    border: 2px solid transparent;
    border-radius: 3px;
    padding: 4px 8px;
    transition: border-color .15s;
  }
  .navbar-logo:hover { border-color: var(--white); }
  .navbar-logo-text {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -1px;
    color: var(--white);
  }
  .navbar-logo-text span { color: var(--amazon-orange); }
  .navbar-logo-dot {
    width: 8px; height: 8px;
    background: var(--amazon-orange);
    border-radius: 50%;
    margin-top: 6px;
    margin-left: 2px;
  }

  .navbar-deliver {
    display: flex;
    flex-direction: column;
    color: var(--white);
    font-size: 12px;
    border: 2px solid transparent;
    border-radius: 3px;
    padding: 4px 8px;
    cursor: pointer;
    transition: border-color .15s;
    white-space: nowrap;
  }
  .navbar-deliver:hover { border-color: var(--white); }
  .navbar-deliver strong { font-size: 13px; }

  .navbar-search {
    flex: 1;
    display: flex;
    border-radius: 4px;
    overflow: hidden;
    height: 40px;
  }
  .navbar-search select {
    background: #F3F3F3;
    border: none;
    padding: 0 8px;
    font-size: 12px;
    cursor: pointer;
    border-right: 1px solid #ccc;
    outline: none;
    color: var(--text-primary);
  }
  .navbar-search input {
    flex: 1;
    border: none;
    padding: 0 10px;
    font-size: 15px;
    outline: none;
  }
  .navbar-search button {
    background: var(--amazon-orange);
    border: none;
    padding: 0 14px;
    cursor: pointer;
    font-size: 18px;
    transition: background .15s;
    display: flex; align-items: center;
  }
  .navbar-search button:hover { background: var(--amazon-orange-hover); }

  .navbar-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
  }
  .navbar-btn {
    background: none;
    border: 2px solid transparent;
    border-radius: 3px;
    color: var(--white);
    cursor: pointer;
    padding: 4px 8px;
    font-size: 13px;
    text-align: left;
    transition: border-color .15s;
    text-decoration: none;
    display: block;
  }
  .navbar-btn:hover { border-color: var(--white); }
  .navbar-btn small { display: block; font-size: 11px; color: #ccc; }
  .navbar-btn strong { font-size: 14px; color: var(--white); }

  .navbar-cart {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    text-decoration: none;
    border: 2px solid transparent;
    border-radius: 3px;
    padding: 4px 8px;
    transition: border-color .15s;
  }
  .navbar-cart:hover { border-color: var(--white); }
  .cart-icon { font-size: 28px; position: relative; }
  .cart-count {
    position: absolute;
    top: -4px; right: -6px;
    background: var(--amazon-orange);
    color: var(--amazon-dark);
    font-size: 11px;
    font-weight: 800;
    border-radius: 50%;
    width: 18px; height: 18px;
    display: flex; align-items: center; justify-content: center;
  }
  .cart-label { color: var(--white); font-size: 13px; font-weight: 700; padding-bottom: 2px; }

  /* ── Sub-nav ── */
  .subnav {
    background: var(--amazon-navy);
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 16px;
    overflow-x: auto;
  }
  .subnav-link {
    color: var(--white);
    text-decoration: none;
    font-size: 13px;
    padding: 6px 10px;
    border: 2px solid transparent;
    border-radius: 3px;
    white-space: nowrap;
    transition: border-color .15s;
  }
  .subnav-link:hover { border-color: var(--white); }
  .subnav-link.active { border-color: var(--white); }

  /* ── Hero Banner ── */
  .hero {
    position: relative;
    background: linear-gradient(135deg, #232F3E 0%, #37475A 40%, #FF9900 100%);
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='28'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    pointer-events: none;
  }
  .hero-badge {
    background: var(--amazon-orange);
    color: var(--amazon-dark);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 20px;
  }
  .hero h1 {
    font-size: clamp(28px, 5vw, 52px);
    font-weight: 800;
    color: var(--white);
    line-height: 1.1;
    max-width: 600px;
  }
  .hero h1 span { color: var(--amazon-orange); }
  .hero p { color: #ccc; font-size: 16px; max-width: 480px; line-height: 1.5; }
  .hero-cta {
    display: flex; gap: 12px; flex-wrap: wrap;
  }
  .btn-primary {
    background: var(--amazon-orange);
    color: var(--amazon-dark);
    border: none;
    padding: 12px 28px;
    font-size: 15px;
    font-weight: 700;
    border-radius: var(--radius);
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: background .15s, transform .1s;
    box-shadow: 0 4px 12px rgba(255,153,0,.4);
  }
  .btn-primary:hover { background: var(--amazon-orange-hover); transform: translateY(-1px); }
  .btn-secondary {
    background: transparent;
    color: var(--white);
    border: 2px solid var(--white);
    padding: 12px 28px;
    font-size: 15px;
    font-weight: 600;
    border-radius: var(--radius);
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    transition: background .15s;
  }
  .btn-secondary:hover { background: rgba(255,255,255,.1); }

  /* ── Page Layout ── */
  .page { max-width: 1480px; margin: 0 auto; padding: 20px 16px; }

  /* ── Category Cards ── */
  .section-title { font-size: 22px; font-weight: 700; margin-bottom: 16px; color: var(--text-primary); }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
  }
  .category-card {
    background: var(--white);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--card-shadow);
    cursor: pointer;
    transition: box-shadow .2s, transform .2s;
    text-decoration: none;
    color: inherit;
    display: block;
  }
  .category-card:hover { box-shadow: 0 4px 16px rgba(15,17,17,.2); transform: translateY(-2px); }
  .category-card-emoji { font-size: 36px; margin-bottom: 8px; }
  .category-card h3 { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
  .category-card p { font-size: 13px; color: var(--amazon-link); }

  /* ── Products Grid ── */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }
  .product-card {
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--card-shadow);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    transition: box-shadow .2s;
  }
  .product-card:hover { box-shadow: 0 4px 16px rgba(15,17,17,.2); }
  .product-img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  border-radius: 6px;
  background: white;
}
  .product-badge {
    background: var(--amazon-red);
    color: var(--white);
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 3px;
    width: fit-content;
  }
  .product-name {
    font-size: 14px;
    color: var(--amazon-link);
    font-weight: 500;
    line-height: 1.4;
    cursor: pointer;
  }
  .product-name:hover { color: var(--amazon-link-hover); text-decoration: underline; }
  .product-brand { font-size: 12px; color: var(--text-secondary); }
  .stars { color: var(--amazon-orange); font-size: 13px; }
  .review-count { color: var(--amazon-link); font-size: 12px; cursor: pointer; }
  .product-price {
    display: flex; align-items: baseline; gap: 4px;
  }
  .price-currency { font-size: 13px; font-weight: 700; color: var(--text-primary); vertical-align: super; }
  .price-whole { font-size: 22px; font-weight: 400; color: var(--text-primary); }
  .price-fraction { font-size: 13px; color: var(--text-primary); vertical-align: super; }
  .price-original { font-size: 13px; color: var(--text-secondary); text-decoration: line-through; }
  .price-save { font-size: 12px; color: var(--amazon-red); }
  .prime-badge {
    font-size: 12px; color: #00A8CC; font-weight: 700;
    display: flex; align-items: center; gap: 4px;
  }
  .add-to-cart-btn {
    background: var(--amazon-orange);
    border: 1px solid #C78516;
    border-radius: var(--radius);
    padding: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background .15s;
    margin-top: auto;
    width: 100%;
  }
  .add-to-cart-btn:hover { background: var(--amazon-orange-hover); }

  /* ── Products Page ── */
  .products-page { display: flex; gap: 20px; }
  .sidebar {
    width: 220px;
    flex-shrink: 0;
  }
  .filter-card {
    background: var(--white);
    border-radius: var(--radius);
    padding: 16px;
    box-shadow: var(--card-shadow);
    margin-bottom: 16px;
  }
  .filter-title { font-size: 16px; font-weight: 700; margin-bottom: 12px; border-bottom: 1px solid var(--border); padding-bottom: 8px; }
  .filter-option {
    display: flex; align-items: center; gap: 8px;
    padding: 4px 0; cursor: pointer; font-size: 14px;
  }
  .filter-option input { accent-color: var(--amazon-orange); width: 16px; height: 16px; }
  .price-range { display: flex; flex-direction: column; gap: 8px; }
  .price-range input[type=range] { accent-color: var(--amazon-orange); width: 100%; }
  .price-labels { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-secondary); }

  /* ── Cart Page ── */
  .cart-layout { display: flex; gap: 20px; align-items: flex-start; }
  .cart-items-col { flex: 1; }
  .cart-summary-col { width: 300px; flex-shrink: 0; }
  .cart-header { font-size: 28px; font-weight: 300; margin-bottom: 16px; }
  .cart-item {
    background: var(--white);
    border-radius: var(--radius);
    padding: 16px;
    box-shadow: var(--card-shadow);
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
  }
  .cart-item-img {
    width: 120px; height: 120px; flex-shrink: 0;
    background: var(--amazon-light-blue);
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-size: 48px;
  }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-size: 16px; color: var(--amazon-link); margin-bottom: 4px; cursor: pointer; }
  .cart-item-name:hover { color: var(--amazon-link-hover); }
  .cart-item-stock { color: var(--amazon-green); font-size: 13px; margin: 4px 0; }
  .cart-item-actions {
    display: flex; align-items: center; gap: 12px; margin-top: 8px;
  }
  .qty-selector {
    display: flex; align-items: center;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
  }
  .qty-btn {
    background: var(--amazon-light-blue);
    border: none;
    width: 32px; height: 32px;
    font-size: 18px;
    cursor: pointer;
    transition: background .15s;
  }
  .qty-btn:hover { background: var(--border); }
  .qty-value { padding: 0 12px; font-size: 14px; font-weight: 600; min-width: 32px; text-align: center; }
  .cart-item-del { font-size: 13px; color: var(--amazon-link); cursor: pointer; border: none; background: none; }
  .cart-item-del:hover { color: var(--amazon-link-hover); text-decoration: underline; }
  .cart-item-price { font-size: 20px; font-weight: 700; white-space: nowrap; }

  .summary-card {
    background: var(--white);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--card-shadow);
  }
  .summary-row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px; }
  .summary-row.total { font-size: 18px; font-weight: 700; padding-top: 12px; border-top: 1px solid var(--border); margin-top: 4px; }
  .checkout-btn {
    width: 100%;
    background: var(--amazon-orange);
    border: 1px solid #C78516;
    border-radius: 20px;
    padding: 12px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 16px;
    transition: background .15s;
  }
  .checkout-btn:hover { background: var(--amazon-orange-hover); }

  .empty-cart {
    background: var(--white);
    border-radius: var(--radius);
    padding: 40px;
    box-shadow: var(--card-shadow);
    text-align: center;
  }
  .empty-cart-icon { font-size: 64px; margin-bottom: 16px; }
  .empty-cart h2 { font-size: 22px; font-weight: 300; margin-bottom: 8px; }
  .empty-cart p { color: var(--text-secondary); margin-bottom: 20px; font-size: 14px; }

  /* ── Footer ── */
  .footer-top { background: #37475A; padding: 40px 20px; margin-top: 40px; }
  .footer-grid { max-width: 1480px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .footer-col h4 { color: var(--white); font-size: 15px; font-weight: 700; margin-bottom: 12px; }
  .footer-col a { display: block; color: #CCC; font-size: 13px; margin-bottom: 8px; text-decoration: none; }
  .footer-col a:hover { text-decoration: underline; color: var(--white); }
  .footer-bottom { background: var(--amazon-navy); text-align: center; padding: 20px; }
  .footer-logo { font-size: 22px; font-weight: 800; color: var(--white); letter-spacing: -1px; margin-bottom: 8px; }
  .footer-logo span { color: var(--amazon-orange); }
  .footer-legal { color: #999; font-size: 12px; }

  /* ── Toast ── */
  .toast-container { position: fixed; bottom: 24px; right: 24px; z-index: 1000; display: flex; flex-direction: column; gap: 8px; }
  .toast {
    background: var(--amazon-dark);
    color: var(--white);
    padding: 12px 20px;
    border-radius: var(--radius);
    font-size: 14px;
    box-shadow: 0 4px 16px rgba(0,0,0,.4);
    display: flex; align-items: center; gap: 10px;
    animation: slideIn .3s ease;
    border-left: 4px solid var(--amazon-orange);
  }
  @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .navbar-deliver, .navbar-btn small { display: none; }
    .footer-grid { grid-template-columns: repeat(2, 1fr); }
    .products-page { flex-direction: column; }
    .sidebar { width: 100%; }
    .cart-layout { flex-direction: column; }
    .cart-summary-col { width: 100%; }
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Echo Dot (5th Gen) - Smart Speaker with Alexa",
    brand: "Amazon",
    price: 49.99,
    original: 59.99,
    rating: 4.7,
    reviews: 127483,
    image: "/images/echo_dot.jpg",
    badge: "Best Seller",
    prime: true,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Kindle Paperwhite - Adjustable Warm Light",
    brand: "Amazon",
    price: 139.99,
    original: 159.99,
    rating: 4.8,
    reviews: 89241,
    image: "/images/kindle.jpg",
    badge: "Amazon's Choice",
    prime: true,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Apple AirPods Pro (2nd Generation)",
    brand: "Apple",
    price: 189.0,
    original: 249.0,
    rating: 4.6,
    reviews: 214876,
    image: "/images/airpods.jpg",
    badge: "Deal",
    prime: true,
    category: "Electronics",
  },
  {
    id: 4,
    name: "LEGO Technic Lamborghini Sián FKP 37",
    brand: "LEGO",
    price: 379.99,
    original: 449.99,
    rating: 4.9,
    reviews: 32104,
    image: "/images/lego.jpg",
    badge: "Limited",
    prime: false,
    category: "Toys",
  },
  {
    id: 5,
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    brand: "Instant Pot",
    price: 79.99,
    original: 99.99,
    rating: 4.7,
    reviews: 345210,
    image: "/images/instant_pot.jpg",
    badge: "Best Seller",
    prime: true,
    category: "Kitchen",
  },
  {
    id: 6,
    name: "Nike Air Max 270 Running Shoes",
    brand: "Nike",
    price: 129.0,
    original: 160.0,
    rating: 4.5,
    reviews: 56789,
    image: "/images/nike_shoes.jpg",
    badge: null,
    prime: true,
    category: "Clothing",
  },
  {
    id: 7,
    name: "The Great Alone: A Novel",
    brand: "Kristin Hannah",
    price: 14.99,
    original: 18.0,
    rating: 4.8,
    reviews: 98432,
    image: "/images/book.jpg",
    badge: "Amazon's Choice",
    prime: true,
    category: "Books",
  },
  {
    id: 8,
    name: 'Sony 65" 4K Ultra HD Smart LED TV',
    brand: "Sony",
    price: 899.99,
    original: 1199.99,
    rating: 4.7,
    reviews: 43210,
    image: "/images/sony_tv.jpg",
    badge: "Deal",
    prime: true,
    category: "Electronics",
  },
  {
    id: 9,
    name: "Dyson V15 Detect Cordless Vacuum",
    brand: "Dyson",
    price: 649.99,
    original: 749.99,
    rating: 4.6,
    reviews: 28901,
    image: "/images/dyson.jpg",
    badge: null,
    prime: false,
    category: "Home",
  },
  {
    id: 10,
    name: "Fitbit Charge 6 Fitness Tracker",
    brand: "Fitbit",
    price: 99.95,
    original: 159.95,
    rating: 4.3,
    reviews: 67543,
    image: "/images/fitbit.jpg",
    badge: "Sale",
    prime: true,
    category: "Electronics",
  },
  {
    id: 11,
    name: "The North Face Apex Bionic Jacket",
    brand: "The North Face",
    price: 149.0,
    original: 200.0,
    rating: 4.6,
    reviews: 12098,
    image: "/images/jacket.jpg",
    badge: null,
    prime: true,
    category: "Clothing",
  },
  {
    id: 12,
    name: "Organic Fair-Trade Ground Coffee, 2 lb",
    brand: "Death Wish Coffee",
    price: 24.99,
    original: 29.99,
    rating: 4.5,
    reviews: 87654,
    image: "/images/coffee.jpg",
    badge: "Subscribe & Save",
    prime: true,
    category: "Grocery",
  },
];


const CATEGORIES = [
  { name: "Electronics", emoji: "📱", sub: "Phones, Tablets & More" },
  { name: "Books", emoji: "📚", sub: "Bestsellers & New Releases" },
  { name: "Kitchen", emoji: "🍳", sub: "Cookware & Appliances" },
  { name: "Clothing", emoji: "👕", sub: "Fashion & Accessories" },
  { name: "Toys", emoji: "🎮", sub: "Games & Learning" },
  { name: "Home", emoji: "🏠", sub: "Furniture & Decor" },
  { name: "Grocery", emoji: "🛒", sub: "Fresh & Pantry" },
  { name: "Sports", emoji: "⚽", sub: "Outdoor & Fitness" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars">
      {"★".repeat(full)}{half ? "½" : ""}{"☆".repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
};

const PriceDisplay = ({ price, original }) => {
  const [whole, fraction] = price.toFixed(2).split(".");
  const save = Math.round(((original - price) / original) * 100);
  return (
    <div>
      <div className="product-price">
        <span className="price-currency">$</span>
        <span className="price-whole">{whole}</span>
        <span className="price-fraction">{fraction}</span>
      </div>
      {original > price && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span className="price-original">List: ${original.toFixed(2)}</span>
          <span className="price-save">Save {save}%</span>
        </div>
      )}
    </div>
  );
};

// ─── Toast ────────────────────────────────────────────────────────────────────
const ToastContext = ({ toasts }) => (
  <div className="toast-container">
    {toasts.map((t) => (
      <div className="toast" key={t.id}>
        <span>🛒</span>
        <span>{t.message}</span>
      </div>
    ))}
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = ({ cartCount }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="navbar-logo-text">amaz<span>on</span></span>
        <span className="navbar-logo-dot" />
      </Link>
      <div className="navbar-deliver">
        <small>Deliver to</small>
        <strong>📍 India</strong>
      </div>
      <div className="navbar-search">
        <select><option>All</option><option>Electronics</option><option>Books</option><option>Clothing</option></select>
        <input
          type="text"
          placeholder="Search Amazon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && navigate("/products")}
        />
        <button onClick={() => navigate("/products")}>🔍</button>
      </div>
      <div className="navbar-actions">
        <a className="navbar-btn" href="#">
          <small>Hello, Sign in</small>
          <strong>Account & Lists ▾</strong>
        </a>
        <a className="navbar-btn" href="#">
          <small>Returns</small>
          <strong>& Orders</strong>
        </a>
        <Link to="/cart" className="navbar-cart">
          <div style={{ position: "relative" }}>
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cartCount}</span>
          </div>
          <span className="cart-label">Cart</span>
        </Link>
      </div>
    </nav>
  );
};

const SubNav = () => (
  <div className="subnav">
    {["☰ All", "Today's Deals", "Customer Service", "Registry", "Gift Cards", "Sell", "Amazon Business", "Prime", "Buy Again"].map((item) => (
      <Link key={item} to="/products" className="subnav-link">{item}</Link>
    ))}
  </div>
);

// ─── Product Card ─────────────────────────────────────────────────────────────
const ProductCard = ({ product, onAddToCart }) => (
  <div className="product-card">
    <img
  src={product.image}
  alt={product.name}
  className="product-img"
/>
    {product.badge && <span className="product-badge">{product.badge}</span>}
    <div className="product-name">{product.name}</div>
    <div className="product-brand">{product.brand}</div>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <Stars rating={product.rating} />
      <span className="review-count">({product.reviews.toLocaleString()})</span>
    </div>
    <PriceDisplay price={product.price} original={product.original} />
    {product.prime && <div className="prime-badge">⚡ FREE Prime Delivery</div>}
    <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
      Add to Cart
    </button>
  </div>
);

// ─── Home Page ────────────────────────────────────────────────────────────────
const Home = ({ onAddToCart }) => (
  <>
    {/* Hero */}
    <section className="hero">
      <div className="hero-badge">🔥 Summer Sale — Up to 40% Off</div>
      <h1>Everything you need,<br /><span>delivered fast.</span></h1>
      <p>Millions of products. Free Prime delivery. Unbeatable prices across electronics, fashion, groceries, and more.</p>
      <div className="hero-cta">
        <Link to="/products" className="btn-primary">Shop Now</Link>
        <Link to="/cart" className="btn-secondary">View Cart</Link>
      </div>
    </section>

    <div className="page">
      {/* Categories */}
      <h2 className="section-title">Shop by Category</h2>
      <div className="category-grid">
        {CATEGORIES.map((cat) => (
          <Link key={cat.name} to="/products" className="category-card">
            <div className="category-card-emoji">{cat.emoji}</div>
            <h3>{cat.name}</h3>
            <p>{cat.sub}</p>
          </Link>
        ))}
      </div>

      {/* Featured Products */}
      <h2 className="section-title">Today's Deals</h2>
      <div className="products-grid">
        {PRODUCTS.slice(0, 8).map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  </>
);

// ─── Products Page ────────────────────────────────────────────────────────────
const Products = ({ onAddToCart }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("featured");
  const [primeOnly, setPrimeOnly] = useState(false);
  const categories = [...new Set(PRODUCTS.map((p) => p.category))];

  const toggleCategory = (cat) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  let filtered = PRODUCTS.filter((p) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
    if (p.price > maxPrice) return false;
    if (primeOnly && !p.prime) return false;
    return true;
  });

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sortBy === "reviews") filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>All Products</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>{filtered.length} results</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ fontSize: 14, fontWeight: 600 }}>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid var(--border)", fontSize: 14 }}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Avg. Customer Review</option>
            <option value="reviews">Most Reviews</option>
          </select>
        </div>
      </div>
      <div className="products-page">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="filter-card">
            <div className="filter-title">Prime</div>
            <label className="filter-option">
              <input type="checkbox" checked={primeOnly} onChange={(e) => setPrimeOnly(e.target.checked)} />
              ⚡ Prime Only
            </label>
          </div>
          <div className="filter-card">
            <div className="filter-title">Department</div>
            {categories.map((cat) => (
              <label key={cat} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
          <div className="filter-card">
            <div className="filter-title">Max Price</div>
            <div className="price-range">
              <input type="range" min={0} max={1000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
              <div className="price-labels"><span>$0</span><span style={{ fontWeight: 700, color: "var(--text-primary)" }}>${maxPrice}</span></div>
            </div>
          </div>
          <div className="filter-card">
            <div className="filter-title">Avg. Customer Review</div>
            {[4, 3, 2, 1].map((r) => (
              <div key={r} className="filter-option" style={{ color: "var(--amazon-orange)" }}>
                {"★".repeat(r)}{"☆".repeat(4 - r)} <span style={{ color: "var(--text-primary)", marginLeft: 4 }}>&amp; Up</span>
              </div>
            ))}
          </div>
        </aside>
        {/* Grid */}
        <div style={{ flex: 1 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, background: "var(--white)", borderRadius: 8, boxShadow: "var(--card-shadow)" }}>
              <div style={{ fontSize: 48 }}>🔍</div>
              <h2 style={{ marginTop: 12, fontWeight: 300 }}>No results found</h2>
              <p style={{ color: "var(--text-secondary)", marginTop: 8 }}>Try adjusting your filters</p>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Cart Page ────────────────────────────────────────────────────────────────
const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const updateQty = (id, delta) =>
    setCart((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter((item) => item.qty > 0)
    );
  const removeItem = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const savings = cart.reduce((sum, item) => sum + (item.original - item.price) * item.qty, 0);

  return (
    <div className="page">
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Amazon Cart is empty</h2>
          <p>Shop today's deals and fill your cart with great products.</p>
          <button className="btn-primary" onClick={() => navigate("/products")}>Shop Now</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-col">
            <h1 className="cart-header">Shopping Cart</h1>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-img">{item.emoji}</div>
                <div className="cart-item-info" style={{ flex: 1 }}>
                  <div className="cart-item-name">{item.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{item.brand}</div>
                  <div className="cart-item-stock">✓ In Stock</div>
                  {item.prime && <div className="prime-badge">⚡ FREE Prime Delivery</div>}
                  <div className="cart-item-actions">
                    <div className="qty-selector">
                      <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                      <span className="qty-value">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                    <button className="cart-item-del" onClick={() => removeItem(item.id)}>Delete</button>
                    <button className="cart-item-del">Save for later</button>
                  </div>
                </div>
                <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
            <div style={{ textAlign: "right", fontSize: 18, fontWeight: 400, marginTop: 12 }}>
              Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):
              <strong style={{ marginLeft: 6 }}>${subtotal.toFixed(2)}</strong>
            </div>
          </div>
          <div className="cart-summary-col">
            <div className="summary-card">
              {savings > 0 && (
                <div style={{ background: "#F0FFF0", border: "1px solid var(--amazon-green)", borderRadius: 6, padding: "8px 12px", marginBottom: 12, fontSize: 13, color: "var(--amazon-green)" }}>
                  🎉 Your order qualifies for FREE Delivery! You save <strong>${savings.toFixed(2)}</strong>
                </div>
              )}
              <div className="summary-row">
                <span>Subtotal ({totalItems} items):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping & handling:</span>
                <span style={{ color: "var(--amazon-green)" }}>FREE</span>
              </div>
              {savings > 0 && (
                <div className="summary-row" style={{ color: "var(--amazon-red)" }}>
                  <span>Savings:</span>
                  <span>−${savings.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Order Total:</span>
                <span style={{ color: "var(--amazon-red)" }}>${subtotal.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={() => alert("🎉 Order placed successfully!")}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <>
    <footer className="footer-top">
      <div className="footer-grid">
        {[
          { title: "Get to Know Us", links: ["Careers", "Blog", "About Amazon", "Investor Relations", "Amazon Devices"] },
          { title: "Make Money with Us", links: ["Sell on Amazon", "Sell under Amazon Accelerator", "Amazon Associates", "Fulfilment by Amazon"] },
          { title: "Amazon Payment Products", links: ["Amazon Business Card", "Shop with Points", "Reload Your Balance", "Amazon Currency Converter"] },
          { title: "Let Us Help You", links: ["Your Account", "Returns Centre", "Recalls and Product Safety Alerts", "Accessibility", "Help"] },
        ].map((col) => (
          <div key={col.title} className="footer-col">
            <h4>{col.title}</h4>
            {col.links.map((link) => <a key={link} href="#">{link}</a>)}
          </div>
        ))}
      </div>
    </footer>
    <div className="footer-bottom">
      <div className="footer-logo">amaz<span>on</span></div>
      <div className="footer-legal">© 2025, Amazon.com, Inc. or its affiliates. All Rights Reserved.</div>
    </div>
  </>
);

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState([]);
  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2500);
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`"${product.name.slice(0, 30)}…" added to cart`);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <BrowserRouter>
      <style>{styles}</style>
      <Navbar cartCount={cartCount} />
      <SubNav />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
      <Footer />
      <ToastContext toasts={toasts} />
    </BrowserRouter>
  );
}