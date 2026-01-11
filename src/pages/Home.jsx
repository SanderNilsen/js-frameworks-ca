import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard/ProductCard";

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
`;

const Search = styled.input`
  padding: 0.75rem 0.9rem;
  border-radius: 12px;
  border: 1px solid #ddd;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getProducts();
        if (isMounted) setProducts(data);
      } catch (e) {
        if (isMounted) setError(e.message || "Something went wrong");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      const title = (p.title || "").toLowerCase();
      const desc = (p.description || "").toLowerCase();
      return title.includes(q) || desc.includes(q);
    });
  }, [products, query]);

  return (
    <Wrapper>
      <h1>Products</h1>

      <Search
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isLoading && <p>Loading…</p>}
      {error && <p>{error}</p>}

      {!isLoading && !error && (
        <Grid>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </Wrapper>
  );
}