import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import axiosInstance, { setAccessToken } from "./api/axiosInstance";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { setToken, setUser } from "./store/slices/authSlice";
import "./App.css";

function App() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("useEffect running"); // debug log 1

    const restoreSession = async () => {
      console.log("restoreSession called"); // debug log 2
      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log("refresh-token response:", res.data); // debug log 3

        const newAccessToken = res.data.data.accessToken;
        setAccessToken(newAccessToken);
        dispatch(setToken(newAccessToken));

        const meRes = await axiosInstance.get("/auth/me");
        console.log("me response:", meRes.data); // debug log 4
        dispatch(setUser(meRes.data.data.user));
      } catch (err) {
        console.log("restoreSession failed:", err); // debug log 5
        setAccessToken(null);
        dispatch(setToken(null));
      } finally {
        setCheckingAuth(false);
      }
    };

    restoreSession();
  }, [dispatch]);

  if (checkingAuth) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;