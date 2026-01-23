import styled from "styled-components";
import { Link } from "react-router-dom";

const baseStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  padding: 0.6rem 0.9rem;
  border-radius: 12px;
  border: 1px solid #ddd;

  background: #fff;
  font: inherit;
  cursor: pointer;
  text-decoration: none;

  transition: background 0.15s ease, opacity 0.15s ease;

  &:hover {
    background: var(--brand-gold);
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  ${baseStyles}
`;

export const ButtonLink = styled(Link)`
  ${baseStyles}
`;