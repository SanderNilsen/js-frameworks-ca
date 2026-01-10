import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const cartCount = 0; // placeholder

  return (
    <header style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #333" }}>
      <Link to="/">Logo</Link>

      <nav style={{ display: "flex", gap: "1rem" }}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
      </nav>
    </header>
  );
}