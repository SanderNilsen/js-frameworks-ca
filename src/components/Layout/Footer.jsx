import styled from "styled-components";

const Wrapper = styled.footer`
  padding: 1rem;
  border-top: 1px solid #ddd;
  margin-top: 2rem;
`;

export default function Footer() {
  return (
    <Wrapper>
      <small>© {new Date().getFullYear()} JS Frameworks CA</small>
    </Wrapper>
  );
}