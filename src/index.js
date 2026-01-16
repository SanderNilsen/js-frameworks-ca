import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import GlobalStyle from "./styles/GlobalStyle";
import { CartProvider } from "./context/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CartProvider>
      <GlobalStyle />
      <App />
    </CartProvider>
  </BrowserRouter>
);
