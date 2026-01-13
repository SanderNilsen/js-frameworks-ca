import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styled from "styled-components";

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const Brand = styled(Link)`
  font-weight: 700;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  opacity: 0.85;

  &.active {
    opacity: 1;
    text-decoration: underline;
  }
`;

export default function Header() {
  const { cartCount } = useCart();

  return (
    <Wrapper>
      <Brand to="/">Logo</Brand>

      <Nav>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/contact">Contact</StyledNavLink>
        <StyledNavLink to="/cart">Cart ({cartCount})</StyledNavLink>
      </Nav>
    </Wrapper>
  );
}
