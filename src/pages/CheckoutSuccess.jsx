import { useEffect } from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { ButtonLink } from "../components/ui/Button";
import Card from "../components/ui/Card";
import SuccessIcon from "../components/ui/SuccessIcon";

const Wrapper = styled.div`
  max-width: 700px;
  display: grid;
  gap: 1rem;
  margin: 2rem auto;
  text-align: center;
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
        <SuccessIcon />
        <p>Your order has been placed.</p>
        <ButtonLink to="/">Back to store</ButtonLink>
      </Card>
    </Wrapper>
  );
}