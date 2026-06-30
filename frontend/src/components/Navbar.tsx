import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {  useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logoutAsync } from "../features/auth/authThunks";



const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/";

  if (isAuthPage) return null;

  const handleLogout = async () => {
    await dispatch(logoutAsync());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">DoNext</span>
      {user && (
        <div className="navbar-links">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>
          <NavLink to="/tasks" className={({ isActive }) => (isActive ? "active" : "")}>
            My Tasks
          </NavLink>
          <button className="logout-link" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;