import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getProductById } from "../api/products";
import { useCart } from "../context/CartContext";
import placeholder from "../images/placeholder.png";
import { Button } from "../components/ui/Button";

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  max-width: 900px;
`;

const Img = styled.img`
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #ddd;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  opacity: 0.7;
`;

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 999px;
  font-size: 0.9rem;
`;


export default function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setIsLoading(true);
        setError("");
        const data = await getProductById(id);
        if (isMounted) setProduct(data);
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
  }, [id]);

  const discount = useMemo(() => {
    if (!product) return 0;
    const { price, discountedPrice } = product;
    if (!price || price === discountedPrice) return 0;
    return Math.round(((price - discountedPrice) / price) * 100);
  }, [product]);

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Not found</p>;

  const imgSrc = product.image?.url || placeholder;

  return (
    <Wrapper>
      <h1>{product.title}</h1>

      <Img
        src={imgSrc}
        alt={product.title}
        onError={(e) => {
          e.currentTarget.src = placeholder;
        }}
      />

      <p>{product.description}</p>

      <PriceRow>
        <strong>{product.discountedPrice}</strong>
        {product.price !== product.discountedPrice && (
          <>
            <OldPrice>{product.price}</OldPrice>
            <Badge>-{discount}%</Badge>
          </>
        )}
      </PriceRow>

      <Button onClick={() => addToCart(product)}>Add to cart</Button>

      {Array.isArray(product.reviews) && product.reviews.length > 0 && (
        <div>
          <h2>Reviews</h2>
          {product.reviews.map((r) => (
            <p key={r.id}>
              <strong>{r.username}</strong>: {r.description}
            </p>
          ))}
        </div>
      )}
    </Wrapper>
  );
}