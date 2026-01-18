import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getProductById } from "../api/products";
import { useCart } from "../context/CartContext";
import placeholder from "../images/placeholder.png";
import { Button } from "../components/ui/Button";
import DiscountBadge from "../components/ui/DiscountBadge";
import { PriceRow, SalePrice, OldPrice } from "../components/ui/Price";
import Card from "../components/ui/Card";

const Wrapper = styled.div`
  max-width: 700px;
  margin: 2rem auto;
`;

const Img = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
`;

const ImageWrapper = styled.div`
  position: relative;
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
  <Card>
    <h1>{product.title}</h1>

    <ImageWrapper>
      <Img
        src={imgSrc}
        alt={product.title}
        onError={(e) => {
          e.currentTarget.src = placeholder;
        }}
      />

      {discount > 0 && <DiscountBadge>-{discount}%</DiscountBadge>}
    </ImageWrapper>

    <p>{product.description}</p>

    <PriceRow>
      <SalePrice>{product.discountedPrice}</SalePrice>
      {product.price !== product.discountedPrice && (
        <OldPrice>{product.price}</OldPrice>
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
  </Card>
</Wrapper>
  );
}