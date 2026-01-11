import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Main = styled.main`
  padding: 1rem;
  min-height: calc(100vh - 120px);
`;

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}