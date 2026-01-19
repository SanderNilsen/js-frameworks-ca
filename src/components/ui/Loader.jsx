import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`;

const Spinner = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 3px solid #ddd;
  border-top-color: var(--brand-gold, #b8860b);
  animation: ${spin} 0.8s linear infinite;
`;

export default function Loader({ label = "Loading…" }) {
  return (
    <Wrapper role="status" aria-live="polite" aria-label={label}>
      <Spinner />
    </Wrapper>
  );
}