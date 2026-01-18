import { useEffect } from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { ButtonLink } from "../components/ui/Button";
import Card from "../components/ui/Card";

const Wrapper = styled.div`
  max-width: 700px;
  display: grid;
  gap: 1rem;
  margin: 2rem auto;
`;

export default function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Wrapper>
      <Card>
        <h1>Success!</h1>
        <p>Your order has been placed.</p>
        <ButtonLink to="/">Back to store</ButtonLink>
      </Card>
    </Wrapper>
  );
}