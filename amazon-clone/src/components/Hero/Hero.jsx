import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeroBanner.css";

/* ── Slide data ──────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: 1,
    badge: "🔥 Limited Time",
    headline: ["Summer Sale.", "Up to 60% off."],
    sub: "Electronics, fashion, home — unbeatable prices, free Prime delivery.",
    cta: "Shop the Sale",
    ctaLink: "/products",
    secondaryCta: "Explore Deals",
    secondaryLink: "/products",
    accentColor: "#FF9900",
    bgFrom: "#0D1B2A",
    bgTo: "#1B3A4B",
    visual: "🛍️",
    visualBg: "radial-gradient(circle at 60% 50%, #FF990033 0%, transparent 70%)",
    tag: "SUMMER DEALS",
  },
  {
    id: 2,
    badge: "⚡ New Arrival",
    headline: ["Next-Gen Tech.", "Yours today."],
    sub: "Cutting-edge gadgets with same-day delivery. Powered by Prime.",
    cta: "Shop Electronics",
    ctaLink: "/products",
    secondaryCta: "View All",
    secondaryLink: "/products",
    accentColor: "#00C2FF",
    bgFrom: "#0A0A1A",
    bgTo: "#1A1A3E",
    visual: "📱",
    visualBg: "radial-gradient(circle at 60% 50%, #00C2FF22 0%, transparent 70%)",
    tag: "ELECTRONICS",
  },
  {
    id: 3,
    badge: "🌿 Eco Picks",
    headline: ["Good for you.", "Good for Earth."],
    sub: "Sustainably sourced, certified green products — because the planet matters.",
    cta: "Shop Sustainably",
    ctaLink: "/products",
    secondaryCta: "Learn More",
    secondaryLink: "/",
    accentColor: "#00C87A",
    bgFrom: "#071A10",
    bgTo: "#0D2B1A",
    visual: "🌱",
    visualBg: "radial-gradient(circle at 60% 50%, #00C87A22 0%, transparent 70%)",
    tag: "ECO STORE",
  },
];

/* ── Component ───────────────────────────────────────────────────────────── */
export default function HeroBanner() {
  const [active, setActive]   = useState(0);
  const [fading, setFading]   = useState(false);
  const [paused, setPaused]   = useState(false);

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo((active + 1) % SLIDES.length), 5500);
    return () => clearInterval(id);
  }, [active, paused]);

  const goTo = (idx) => {
    if (idx === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 320);
  };

  const slide = SLIDES[active];

  return (
    <section
      className="hero"
      style={{
        "--accent":   slide.accentColor,
        "--bg-from":  slide.bgFrom,
        "--bg-to":    slide.bgTo,
        "--visual-bg": slide.visualBg,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Promotional banner"
    >
      {/* Background layers */}
      <div className="hero-bg" />
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      {/* Floating grid decoration */}
      <div className="hero-grid" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="hero-grid-dot" />
        ))}
      </div>

      {/* Content */}
      <div className={`hero-content ${fading ? "hero-content--fade" : "hero-content--in"}`}>

        {/* Left column */}
        <div className="hero-text">
          <span className="hero-tag">{slide.tag}</span>
          <div className="hero-badge">{slide.badge}</div>

          <h1 className="hero-headline">
            {slide.headline.map((line, i) => (
              <span key={i} className="hero-headline-line" style={{ animationDelay: `${i * 0.08}s` }}>
                {line}
              </span>
            ))}
          </h1>

          <p className="hero-sub">{slide.sub}</p>

          {/* Stats row */}
          <div className="hero-stats">
            {[
              { value: "50M+", label: "Products" },
              { value: "2-Day", label: "Delivery" },
              { value: "24/7",  label: "Support"  },
            ].map(({ value, label }) => (
              <div key={label} className="hero-stat">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="hero-ctas">
            <Link to={slide.ctaLink} className="hero-cta-primary">
              {slide.cta}
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd" />
              </svg>
            </Link>

            <Link to={slide.secondaryLink} className="hero-cta-secondary">
              {slide.secondaryCta}
            </Link>
          </div>
        </div>

        {/* Right column — visual */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-ring hero-visual-ring--outer" />
          <div className="hero-visual-ring hero-visual-ring--inner" />
          <div className="hero-visual-emoji">{slide.visual}</div>

          {/* Floating chips */}
          <div className="hero-chip hero-chip--1">
            <span>✓</span> Free Returns
          </div>
          <div className="hero-chip hero-chip--2">
            ⚡ Prime Delivery
          </div>
          <div className="hero-chip hero-chip--3">
            🔒 Secure Pay
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="hero-controls" role="tablist" aria-label="Banner slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === active}
            aria-label={`Slide ${i + 1}`}
            className={`hero-dot ${i === active ? "hero-dot--active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Prev / Next arrows */}
      <button
        className="hero-arrow hero-arrow--prev"
        onClick={() => goTo((active - 1 + SLIDES.length) % SLIDES.length)}
        aria-label="Previous slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          width="20" height="20">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="hero-arrow hero-arrow--next"
        onClick={() => goTo((active + 1) % SLIDES.length)}
        aria-label="Next slide"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          width="20" height="20">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Bottom fade into page */}
      <div className="hero-fade-bottom" aria-hidden="true" />
    </section>
  );
}