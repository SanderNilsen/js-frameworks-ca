import styled from "styled-components";

const Wrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(184, 134, 11, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Check = styled.svg`
  width: 36px;
  height: 36px;
  stroke: var(--brand-gold);
  stroke-width: 3;
  fill: none;
`;

export default function SuccessIcon() {
  return (
    <Wrapper aria-hidden="true">
      <Check viewBox="0 0 24 24">
        <path d="M20 6L9 17l-5-5" />
      </Check>
    </Wrapper>
  );
}