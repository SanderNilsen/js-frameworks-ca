import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const initialState = { cart: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const product = action.payload;
      const existing = state.cart.find((p) => p.id === product.id);

      let newCart;
      if (!existing) {
        newCart = [...state.cart, { ...product, quantity: 1 }];
      } else {
        newCart = state.cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return { cart: newCart };
    }

    case "REMOVE_ONE": {
      const id = action.payload;
      const existing = state.cart.find((p) => p.id === id);
      if (!existing) return state;

      let newCart;
      if (existing.quantity > 1) {
        newCart = state.cart.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        );
      } else {
        newCart = state.cart.filter((p) => p.id !== id);
      }
      return { cart: newCart };
    }

    case "CLEAR":
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => {
    const cartCount = state.cart.reduce((sum, p) => sum + p.quantity, 0);
    const total = state.cart.reduce(
      (sum, p) => sum + p.discountedPrice * p.quantity,
      0
    );

    return {
      cart: state.cart,
      cartCount,
      total,
      addToCart: (product) => dispatch({ type: "ADD", payload: product }),
      removeOne: (id) => dispatch({ type: "REMOVE_ONE", payload: id }),
      clearCart: () => dispatch({ type: "CLEAR" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}