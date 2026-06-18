import { useState } from "react";
import "./ProductCard.css";

/* ── Star renderer ───────────────────────────────────────────────────────── */
function StarRating({ rate, count }) {
  const full    = Math.floor(rate);
  const hasHalf = rate - full >= 0.25 && rate - full < 0.75;
  const empty   = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="pc-rating" aria-label={`Rated ${rate} out of 5, ${count.toLocaleString()} reviews`}>
      <span className="pc-stars" aria-hidden="true">
        {Array.from({ length: full  }).map((_, i) => <StarFull  key={`f${i}`} />)}
        {hasHalf                                   && <StarHalf  key="h"       />}
        {Array.from({ length: empty }).map((_, i) => <StarEmpty key={`e${i}`} />)}
      </span>
      <span className="pc-rating-score">{rate.toFixed(1)}</span>
      <span className="pc-rating-count">({count.toLocaleString()})</span>
    </div>
  );
}

const StarFull  = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="pc-star pc-star--full"  aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"/></svg>
);
const StarHalf  = () => (
  <svg viewBox="0 0 20 20" className="pc-star pc-star--half" aria-hidden="true">
    <defs><linearGradient id="half"><stop offset="50%" stopColor="currentColor"/><stop offset="50%" stopColor="transparent"/></linearGradient></defs>
    <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"/>
    <path fill="none" stroke="#d0d0d0" strokeWidth=".5" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"/>
  </svg>
);
const StarEmpty = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1" className="pc-star pc-star--empty" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z"/></svg>
);

/* ── Cart icon ───────────────────────────────────────────────────────────── */
const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    width="16" height="16" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

/* ── Wishlist icon ───────────────────────────────────────────────────────── */
const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    width="16" height="16" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
  </svg>
);

/* ── Price helpers ───────────────────────────────────────────────────────── */
function formatPrice(price) {
  const [whole, cents] = price.toFixed(2).split(".");
  return { whole, cents };
}

function mockOriginal(price) {
  // Simulate a crossed-out original for ~60 % of cards
  if (price % 3 < 2) return null;
  return +(price * (1 + (price % 17) / 100 + 0.08)).toFixed(2);
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function ProductCard({ product, onAddToCart }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added,      setAdded     ] = useState(false);
  const [imgError,   setImgError  ] = useState(false);

  const {
  id,
  title,
  price,
  image,
  rating,
  category,
} = product;
  const { whole, cents } = formatPrice(price);
  const original         = mockOriginal(price);
  const discount         = original
    ? Math.round(((original - price) / original) * 100)
    : null;

  /* Derive a deterministic "badge" from the id */
  const BADGES  = ["Best Seller", "Amazon's Choice", "New Release", null, null];
  const badge   = BADGES[id % BADGES.length];

  /* Prime eligibility — true for most items */
  const isPrime = price > 25;

  const handleAddToCart = () => {
    setAdded(true);
    onAddToCart?.(product);
    setTimeout(() => setAdded(false), 1800);
  };
  return (
    <article className="pc" aria-label={title}>
      {/* ── Image wrapper ─────────────────────────────────────────── */}
      <div className="pc-image-wrap">
        {/* Category chip */}
        <span className="pc-category">{category}</span>

        {/* Discount badge */}
        {discount && (
          <span className="pc-discount" aria-label={`${discount}% off`}>
            -{discount}%
          </span>
        )}

        {/* Seller badge */}
        {badge && <span className="pc-badge">{badge}</span>}

        {/* Wishlist button */}
        <button
          className={`pc-wishlist ${wishlisted ? "pc-wishlist--active" : ""}`}
          onClick={() => setWishlisted((w) => !w)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
        >
          <HeartIcon filled={wishlisted} />
        </button>

        {/* Product image */}
        <img
          className="pc-image"
          src={imgError ? `https://placehold.co/400x400/EAEDED/999?text=${encodeURIComponent(category)}` : image}
          alt={title}
          loading="lazy"
          onError={() => setImgError(true)}
        />

        {/* Hover quick-view overlay */}
        <div className="pc-overlay" aria-hidden="true">
          <span className="pc-overlay-text">Quick view</span>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────── */}
      <div className="pc-body">
        {/* Title */}
        <h3 className="pc-title" title={title}>
  {title}
</h3>

        {/* Rating */}
        <StarRating rate={rating.rate} count={rating.count} />

        {/* Price block */}
        <div className="pc-price-block">
          <div className="pc-price" aria-label={`$${price.toFixed(2)}`}>
            <span className="pc-price-sup">$</span>
            <span className="pc-price-whole">{whole}</span>
            <span className="pc-price-cents">{cents}</span>
          </div>
          {original && (
            <div className="pc-price-meta">
              <span className="pc-price-original" aria-label={`Was $${original.toFixed(2)}`}>
                Was: <s>${original.toFixed(2)}</s>
              </span>
              <span className="pc-price-save">Save ${(original - price).toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Prime */}
        {isPrime && (
          <div className="pc-prime" aria-label="Prime eligible">
            <svg viewBox="0 0 40 14" width="40" height="14" aria-hidden="true">
              <rect width="40" height="14" rx="2" fill="#00A8E0"/>
              <text x="50%" y="10" textAnchor="middle" fill="#fff"
                fontSize="8" fontWeight="700" fontFamily="Arial">prime</text>
            </svg>
            <span>FREE delivery</span>
          </div>
        )}

        {/* Stock indicator */}
        <div className="pc-stock">
          <span className="pc-stock-dot" aria-hidden="true"/>
          In Stock
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <div className="pc-footer">
        <button
          className={`pc-add-btn ${added ? "pc-add-btn--added" : ""}`}
          onClick={handleAddToCart}
          aria-label={added ? "Added to cart" : `Add ${title} to cart`}
          disabled={added}
        >
          {added ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                width="16" height="16" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Added to Cart
            </>
          ) : (
            <>
              <CartIcon />
              Add to Cart
            </>
          )}
        </button>

        <button className="pc-buy-btn" aria-label="Buy now">
          Buy Now
        </button>
      </div>
    </article>
  );
}