import { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard/ProductCard";

function Products() {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase())
);
console.log(products);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <input
        type="text"
        placeholder="Search Product..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;