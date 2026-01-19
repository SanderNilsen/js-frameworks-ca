import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import Loader from "../components/ui/Loader";

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
`;

const Search = styled.input`
  padding: 0.75rem 0.9rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 6px 20px rgba(79, 79, 79, 0.08);
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 690px) {
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

      {isLoading && <Loader/>}
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