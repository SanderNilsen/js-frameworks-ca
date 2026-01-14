import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

const Wrapper = styled.div`
  max-width: 900px;
  display: grid;
  gap: 1rem;
`;

const Item = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
`;

const Img = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid #ddd;
`;

const Title = styled.h2`
  font-size: 1rem;
  margin: 0;
`;

const Price = styled.p`
  margin: 0.25rem 0 0 0;
  opacity: 0.85;
`;

const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-end;
`;

const Btn = styled.button`
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  cursor: pointer;
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  border-top: 1px solid #ddd;
`;

export default function Cart() {
  const navigate = useNavigate();
  const { cart, total, addToCart, removeOne } = useCart();

  if (!cart.length) {
    return (
      <Wrapper>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/">Go shopping</Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h1>Cart</h1>

      {cart.map((p) => {
        const imgSrc =
          p.image?.url;

        return (
          <Item key={p.id}>
            <Img
              src={imgSrc}
              alt={p.title}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png"; // Add fallback image later
              }}
            />

            <div>
              <Title>{p.title}</Title>
              <Price>
                {p.discountedPrice} × {p.quantity} ={" "}
                <strong>{(p.discountedPrice * p.quantity).toFixed(2)}</strong>
              </Price>
            </div>

            <Controls>
              <Btn onClick={() => removeOne(p.id)}>-</Btn>
              <span>{p.quantity}</span>
              <Btn onClick={() => addToCart(p)}>+</Btn>
            </Controls>
          </Item>
        );
      })}

      <Summary>
        <strong>Total: {total.toFixed(2)}</strong>
        <Btn onClick={() => navigate("/checkout-success")}>Checkout</Btn>
      </Summary>
    </Wrapper>
  );
}