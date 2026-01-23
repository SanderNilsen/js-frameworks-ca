import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getProductById } from "../api/products";
import { useCart } from "../context/CartContext";
import placeholder from "../images/placeholder.png";
import { Button } from "../components/ui/Button";
import DiscountBadge from "../components/ui/DiscountBadge";
import { PriceRow, SalePrice, Price } from "../components/ui/Price";
import Card from "../components/ui/Card";
import Loader from "../components/ui/Loader";
import Toast from "../components/ui/Toast";
import StarRating from "../components/ui/StarRating";

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

const Title = styled.h1`
  margin-bottom: 0rem;
`;

const Review = styled.div`
  padding: 0.6rem 0;
  border-bottom: 1px solid #eee;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const ReviewText = styled.p`
  margin-bottom: 0.5rem;
`;

export default function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  function handleAdd() {
    addToCart(product);
    setToast("Added to cart");

    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => {
      setToast("");
    }, 3000);
  }

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

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Not found</p>;

  const imgSrc = product.image?.url || placeholder;

  const hasDiscount = product.price !== product.discountedPrice;

  return (
<Wrapper>
  <Card>
    
    <Title>{product.title}</Title>
    <p>{product.description}</p>

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

    <PriceRow>
      {hasDiscount ? (
        <>
          <SalePrice>{product.discountedPrice},-</SalePrice>
          <Price $isDiscounted>{product.price},-</Price>
        </>
      ) : (
        <Price>{product.price},-</Price>
      )}
    </PriceRow>

    <Button onClick={handleAdd}>Add to cart</Button>

    {Array.isArray(product.reviews) && product.reviews.length > 0 && (
      <div>
        <h2>Reviews</h2>
        {product.reviews.map((r) => (
          <Review key={r.id}>
            <ReviewHeader>
              <span>{r.username}</span>
              <StarRating rating={r.rating} />
            </ReviewHeader>
            <ReviewText>{r.description}</ReviewText>
          </Review>
        ))}
      </div>
    )}
  </Card>  <Toast message={toast} />
</Wrapper>
  );
}