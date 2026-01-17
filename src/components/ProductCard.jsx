import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { Button, ButtonLink } from "./ui/Button";
import placeholder from "../images/placeholder.png";

const Card = styled.article`
  border: 1px solid #e5e5e5;
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  display: grid;
  gap: 0.75rem;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
`;

const DiscountBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: #c62828;
  color: #fff;
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
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

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

const SalePrice = styled.span`
  color: #c62828;
  font-weight: 600;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  font-size: 0.9rem;
  opacity: 0.7;
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
          <Button onClick={() => addToCart(product)}>
            Add to cart
          </Button>

          <ButtonLink to={`/product/${id}`}>
            View product
          </ButtonLink>
        </Actions>
      </Content>
    </Card>
  );
}