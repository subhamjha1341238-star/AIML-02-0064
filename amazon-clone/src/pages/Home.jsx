import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/Hero/Hero";
import ProductCard from "../components/ProductCard/ProductCard";
import products from "../data/products";
import Footer from "../components/Footer/Footer";


/* ── Category filter pills ───────────────────────────────────────────────── */
const ALL_CATEGORIES = ["All", ...new Set(products.map((p) => p.category))];

/* ── Section heading with "See all" link ─────────────────────────────────── */
function SectionHeader({ title, subtitle, to }) {
  return (
    <div className="home-section-header">
      <div>
        <h2 className="home-section-title">{title}</h2>
        {subtitle && <p className="home-section-sub">{subtitle}</p>}
      </div>
      {to && (
        <Link to={to} className="home-see-all">
          See all results
          <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" aria-hidden="true">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </Link>
      )}
    </div>
  );
}

/* ── Animated counter ────────────────────────────────────────────────────── */
function Counter({ end, suffix = "", prefix = "" }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1400;
          const step = end / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setValue(end); clearInterval(timer); }
            else setValue(Math.floor(start));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>;
}

/* ── Trust stat card ─────────────────────────────────────────────────────── */
function StatCard({ icon, end, suffix, prefix, label }) {
  return (
    <div className="home-stat-card">
      <span className="home-stat-icon" aria-hidden="true">{icon}</span>
      <strong className="home-stat-value">
        <Counter end={end} suffix={suffix} prefix={prefix} />
      </strong>
      <span className="home-stat-label">{label}</span>
    </div>
  );
}

/* ── Deal countdown timer ────────────────────────────────────────────────── */
function Countdown() {
  const TARGET_HOURS = 8;
  const [secs, setSecs] = useState(TARGET_HOURS * 3600);

  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : TARGET_HOURS * 3600)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");

  return (
    <div className="home-countdown" aria-live="polite" aria-label={`Deal ends in ${h} hours ${m} minutes ${s} seconds`}>
      <span className="home-countdown-label">⚡ Ends in</span>
      {[h, m, s].map((unit, i) => (
        <span key={i} className="home-countdown-group">
          <span className="home-countdown-digit">{unit}</span>
          {i < 2 && <span className="home-countdown-sep" aria-hidden="true">:</span>}
        </span>
      ))}
    </div>
  );
}

/* ── Category quick-link card ────────────────────────────────────────────── */
const QUICK_CATS = [
  { label: "Electronics", emoji: "📱", color: "#0D1B2A", accent: "#00C2FF" },
  { label: "Fashion",     emoji: "👗", color: "#1B0A2A", accent: "#C77DFF" },
  { label: "Kitchen",     emoji: "🍳", color: "#1A0D00", accent: "#FF9900" },
  { label: "Books",       emoji: "📚", color: "#0A1A0A", accent: "#00C87A" },
  { label: "Sports",      emoji: "⚽", color: "#0A0A1A", accent: "#FFD814" },
  { label: "Toys",        emoji: "🎮", color: "#1A000A", accent: "#FF6B9D" },
];

function QuickCatCard({ label, emoji, color, accent }) {
  return (
    <Link
      to="/products"
      className="home-qcat-card"
      style={{ "--qcat-bg": color, "--qcat-accent": accent }}
      aria-label={`Shop ${label}`}
    >
      <span className="home-qcat-glow" aria-hidden="true" />
      <span className="home-qcat-emoji" aria-hidden="true">{emoji}</span>
      <span className="home-qcat-label">{label}</span>
      <span className="home-qcat-arrow" aria-hidden="true">→</span>
    </Link>
  );
}

/* ── Toast notification ──────────────────────────────────────────────────── */
function Toast({ message, visible }) {
  return (
    <div className={`home-toast ${visible ? "home-toast--show" : ""}`} role="status" aria-live="polite">
      <span className="home-toast-icon">🛒</span>
      {message}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
/*  HOME PAGE                                                                 */
/* ══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [cart,        setCart]        = useState([]);
  const [activeCategory, setActiveCat] = useState("All");
  const [toast,       setToast]       = useState({ message: "", visible: false });
  const toastTimer = useRef(null);

  /* Filtered + sorted product list */
  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  /* Spotlight: highest-rated product */
  const spotlight = [...products].sort((a, b) => b.rating.rate - a.rating.rate)[0];

  /* "Today's Deals": biggest discounts (simulate via price range) */
  const deals = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 4);

  /* Cart total */
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      return existing
        ? prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
    });

    clearTimeout(toastTimer.current);
    setToast({ message: `"${product.title.slice(0, 36)}…" added to cart`, visible: true });
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2600);
  };

  return (
    <div className="home-root">

      {/* ── Navbar ──────────────────────────────────────────────── */}
      <Navbar cartCount={cartCount} />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <HeroBanner />

      {/* ── Trust stats bar ─────────────────────────────────────── */}
      <section className="home-stats-bar" aria-label="Why shop with us">
        <div className="home-stats-inner">
          <StatCard icon="📦" end={50}   suffix="M+"  label="Products available"    />
          <StatCard icon="⚡" end={2}    suffix="-Day" label="Prime delivery"        />
          <StatCard icon="👥" end={300}  suffix="M+"  label="Happy customers"       />
          <StatCard icon="🔒" end={100}  suffix="%"   label="Secure transactions"   />
          <StatCard icon="↩️" end={30}   suffix="-Day" label="Easy returns"         />
        </div>
      </section>

      <main className="home-main">

        {/* ── Quick-shop categories ──────────────────────────────── */}
        <section className="home-section" aria-label="Shop by category">
          <SectionHeader
            title="Shop by Category"
            subtitle="Explore millions of products across every department"
            to="/products"
          />
          <div className="home-qcat-grid">
            {QUICK_CATS.map((cat) => <QuickCatCard key={cat.label} {...cat} />)}
          </div>
        </section>

        {/* ── Spotlight product ──────────────────────────────────── */}
        <section className="home-section home-spotlight-section" aria-label="Product spotlight">
          <SectionHeader title="🌟 Spotlight Pick" subtitle="Our top-rated product this week" />
          <div className="home-spotlight">
            <div className="home-spotlight-img-wrap">
              <img
                src={spotlight.image}
                alt={spotlight.title}
                className="home-spotlight-img"
                loading="lazy"
              />
              <span className="home-spotlight-badge">⭐ Top Rated</span>
            </div>
            <div className="home-spotlight-info">
              <span className="home-spotlight-cat">{spotlight.category}</span>
              <h3 className="home-spotlight-title">{spotlight.title}</h3>
              <div className="home-spotlight-rating">
                {"★".repeat(Math.round(spotlight.rating.rate))}
                <span>{spotlight.rating.rate} · {spotlight.rating.count.toLocaleString()} reviews</span>
              </div>
              <div className="home-spotlight-price">
                <span className="home-spotlight-currency">$</span>
                <span className="home-spotlight-whole">{Math.floor(spotlight.price)}</span>
                <span className="home-spotlight-cents">{(spotlight.price % 1).toFixed(2).slice(1)}</span>
              </div>
              <ul className="home-spotlight-perks">
                <li>✓ Free Prime delivery</li>
                <li>✓ 30-day hassle-free returns</li>
                <li>✓ 1-year manufacturer warranty</li>
                <li>✓ Secure, encrypted checkout</li>
              </ul>
              <div className="home-spotlight-actions">
                <button
                  className="home-spotlight-cart"
                  onClick={() => handleAddToCart(spotlight)}
                  aria-label={`Add ${spotlight.title} to cart`}
                >
                  🛒 Add to Cart
                </button>
                <button className="home-spotlight-buy" aria-label="Buy now">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Today's deals ─────────────────────────────────────── */}
        <section className="home-section" aria-label="Today's deals">
          <div className="home-deals-header">
            <SectionHeader
              title="🔥 Today's Deals"
              subtitle="Lightning deals — selling fast"
              to="/products"
            />
            <Countdown />
          </div>
          <div className="home-deals-grid">
            {deals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        {/* ── Prime banner ──────────────────────────────────────── */}
        <section className="home-prime-banner" aria-label="Try Prime">
          <div className="home-prime-content">
            <div className="home-prime-left">
              <span className="home-prime-logo">prime</span>
              <h2 className="home-prime-heading">
                Unlimited free delivery.<br />
                <span>Start your 30-day free trial.</span>
              </h2>
              <p className="home-prime-sub">
                Plus exclusive deals, Prime Video, Prime Music, and more — all included.
              </p>
              <Link to="/" className="home-prime-cta">
                Try Prime Free
              </Link>
            </div>
            <div className="home-prime-right" aria-hidden="true">
              <div className="home-prime-circle home-prime-circle--1" />
              <div className="home-prime-circle home-prime-circle--2" />
              <span className="home-prime-icon">⚡</span>
            </div>
          </div>
        </section>

        {/* ── All products with category filter ─────────────────── */}
        <section className="home-section" aria-label="All products">
          <SectionHeader
            title="All Products"
            subtitle={`Showing ${filtered.length} of ${products.length} products`}
            to="/products"
          />

          {/* Category filter pills */}
          <div className="home-filter-pills" role="tablist" aria-label="Filter by category">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={cat === activeCategory}
                className={`home-pill ${cat === activeCategory ? "home-pill--active" : ""}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
                {cat !== "All" && (
                  <span className="home-pill-count">
                    {products.filter((p) => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="home-products-grid">
            {filtered.map((product, idx) => (
              <div
                key={product.id}
                className="home-product-cell"
                style={{ animationDelay: `${idx * 0.055}s` }}
              >
                <ProductCard product={product} onAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
        </section>

        {/* ── "Back to top" utility ──────────────────────────────── */}
        <div className="home-back-top-wrap">
          <button
            className="home-back-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
          >
            ↑ Back to top
          </button>
        </div>

      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <Footer />

      {/* ── Toast ───────────────────────────────────────────────── */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}