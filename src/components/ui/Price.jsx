import styled from "styled-components";

export const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

export const Price = styled.span`
  font-weight: 500;
  color: #111;
  text-decoration: ${(props) => (props.$isDiscounted ? "line-through" : "none")};
  opacity: ${(props) => (props.$isDiscounted ? 0.6 : 1)};
`;

export const SalePrice = styled.span`
  font-weight: 800;
  color: #c62828;
`;