import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styled from "styled-components";
import logo from "../../images/logo.png";
import Container from "../ui/Container";

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
  box-shadow: 0 6px 20px rgba(79, 79, 79, 0.08);
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1rem 1rem 0rem;

  @media (min-width: 640px) {
    max-width: 1100px;
    margin: 0 auto;
  }
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const BrandText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--brand-gold);
  letter-spacing: 0.5px;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
  display: block;
`;

const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  cursor: pointer;
  background: #fff;

  @media (min-width: 640px) {
    display: none;
  }
`;

const Bars = styled.span`
  width: 18px;
  height: 2px;
  background: currentColor;
  position: relative;
  display: inline-block;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    width: 18px;
    height: 2px;
    background: currentColor;
  }

  &::before {
    top: -6px;
  }

  &::after {
    top: 6px;
  }
`;

const Nav = styled.nav`
  display: none;

  @media (min-width: 640px) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const MobileMenu = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const MobileNav = styled.nav`
  display: ${(props) => (props.$open ? "block" : "none")};
  padding: 0.75rem 0 1rem 0;
  border-bottom: 1px solid #e9e9e9;
  background: #fff;

  @media (min-width: 768px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  padding: 0.45rem 0.65rem;
  border-radius: 10px;
  opacity: 0.9;

  &:hover {
    background: #f5f5f5;
    opacity: 1;
  }

  &.active {
    background: #efefef;
    opacity: 1;
  }
`;

const CartLink = styled(StyledNavLink)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  font-size: 0.8rem;
  border: 1px solid #ddd;
  background: #fff;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 640px) {
    display: none;
  }
`;

export default function Header() {
  const { cartCount } = useCart();
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <Wrapper>
     <Container>
      <Inner>
        <Brand to="/" aria-label="Go to homepage">
          <Logo src={logo} alt="Store logo" />
          <BrandText>eCom</BrandText>
        </Brand>

    <NavRight>
      <CartLink to="/cart">
         Cart <Badge>{cartCount}</Badge>
      </CartLink>

      <MenuButton
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Bars />
      </MenuButton>
    </NavRight>

        {/* Desktop nav */}
        <Nav>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/contact">Contact</StyledNavLink>
          <CartLink to="/cart">
            Cart <Badge>{cartCount}</Badge>
          </CartLink>
        </Nav>
      </Inner>
    </Container>

      {/* Mobile nav */}
      <MobileNav $open={open}>
        <Container>
          <MobileMenu>
            <StyledNavLink to="/" onClick={closeMenu}>Home</StyledNavLink>
            <StyledNavLink to="/contact" onClick={closeMenu}>Contact</StyledNavLink>
            <CartLink to="/cart" onClick={closeMenu}>
              Cart <Badge>{cartCount}</Badge>
            </CartLink>
          </MobileMenu>
        </Container>
      </MobileNav>
    </Wrapper>
  );
}