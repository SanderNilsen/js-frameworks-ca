import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled(Link)`
  display: block;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
`;

const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
`;

const PriceRow = styled.p`
  margin: 0.75rem 0 0 0;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  opacity: 0.7;
  margin-left: 0.5rem;
`;

export default function ProductCard({ product }) {
  const { id, title, discountedPrice, price } = product;

  const imgSrc = product.image?.url;

  return (
    <Card to={`/product/${id}`}>
      <Img src={imgSrc} alt={title} />
      <Title>{title}</Title>

      <PriceRow>
        <strong>{discountedPrice}</strong>
        {price !== discountedPrice && <OldPrice>{price}</OldPrice>}
      </PriceRow>
    </Card>
  );
}