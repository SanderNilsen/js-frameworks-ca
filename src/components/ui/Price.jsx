import styled from "styled-components";

export const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

export const SalePrice = styled.span`
  color: #c62828;
  font-weight: 700;
`;

export const OldPrice = styled.span`
  text-decoration: line-through;
  font-size: 0.9rem;
  opacity: 0.7;
`;