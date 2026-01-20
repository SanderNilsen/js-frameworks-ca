import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { Button, ButtonLink } from "./ui/Button";
import placeholder from "../images/placeholder.png";
import DiscountBadge from "./ui/DiscountBadge";
import { PriceRow, SalePrice, OldPrice } from "./ui/Price";
import Card from "./ui/Card";
import { useState } from "react";
import Toast from "./ui/Toast";

const ImageWrapper = styled.div`
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
  border-radius: 10px;
`;

const Content = styled.div`
  padding: 0 0.75rem 0.75rem;
  display: grid;
  gap: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1rem;
  margin: 0;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const {
    id,
    title,
    price,
    discountedPrice,
    image,
  } = product;

  const imgSrc = image?.url || placeholder;

  const discountPercent =
    price > discountedPrice
      ? Math.round(((price - discountedPrice) / price) * 100)
      : null;

  const [toast, setToast] = useState("");

  function handleAdd() {
    addToCart(product);
    setToast("Added to cart");

    window.clearTimeout(window.__toastTimerCard);
    window.__toastTimerCard = window.setTimeout(() => {
      setToast("");
    }, 3000);
  }

  return (
    <Card>
      <ImageWrapper>
        <Img
          src={imgSrc}
          alt={title}
          onError={(e) => {
            e.currentTarget.src = placeholder;
          }}
        />

        {discountPercent && (
          <DiscountBadge>-{discountPercent}%</DiscountBadge>
        )}
      </ImageWrapper>

      <Content>
        <Title>{title}</Title>

        <PriceRow>
          <SalePrice>{discountedPrice}</SalePrice>
          {price !== discountedPrice && (
            <OldPrice>{price}</OldPrice>
          )}
        </PriceRow>

        <Actions>
          <Button onClick={handleAdd}>Add to cart</Button>

          <ButtonLink to={`/product/${id}`}>
            View product
          </ButtonLink>
        </Actions>
      </Content>
     <Toast message={toast} />
    </Card>
  );
}