import styled from "styled-components";
import Container from "../ui/Container";

const Wrapper = styled.footer`
  border-top: 1px solid #e9e9e9;
  padding: 1rem 0;
`;

export default function Footer() {
  return (
    <Wrapper>
      <Container>
        <small>© {new Date().getFullYear()} Sander Nilsen - JS Frameworks CA</small>
      </Container>
    </Wrapper>
  );
}