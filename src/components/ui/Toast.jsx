import styled from "styled-components";
import SuccessIcon from "./SuccessIcon";

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  z-index: 999;

  display: flex;
  align-items: center;
  gap: 0.6rem;

  background: #111;
  color: #fff;
  border-radius: 999px;
  padding: 0.6rem 0.9rem;
  font-size: 0.95rem;
  max-width: calc(100vw - 2rem);
`;

const IconWrap = styled.div`
  width: 28px;
  height: 28px;

  & > div {
    width: 28px;
    height: 28px;
  }

  & > div {
    background: rgba(184, 134, 11, 0.2);
  }
`;

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <Wrapper role="status" aria-live="polite">
      <IconWrap>
        <SuccessIcon />
      </IconWrap>
      <span>{message}</span>
    </Wrapper>
  );
}