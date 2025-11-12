import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../App.css"; // Import styles

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
