import { Link } from "react-router-dom";
import { useApp } from "../context";

export default function Navbar() {
  const { user, logout, cart } = useApp();

  return (
    <nav style={{ padding: "10px", background: "#eee", display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link to="/">Items</Link> | <Link to="/cart">Cart ({cart.length})</Link>
      </div>
      <div>
        {user ? (
          <>
            <span>{user.name || user.email}</span>
            <button onClick={logout} style={{ marginLeft: "10px" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
