import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Container from "../ui/Container";

const Main = styled.main`
  padding: 1rem 0;
  min-height: calc(100vh - 120px);
`;

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Main>
        <Container>{children}</Container>
      </Main>
      <Footer />
    </>
  );
}