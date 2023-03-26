import { useEffect, useState } from "react";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import LeftBar from "./components/LeftBar/LeftBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RightBar from "./components/Rightbar/RightBar";
import Home from "./pages/Home/Home";
import User from "./pages/User/User";

function App() {
  const [user, setUser] = useState("");
  const userdashboard = async () => {
    try {
      const response = await fetch("http://localhost:4000/users/dashboard", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    userdashboard();
  }, []);
  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar user={user} setUser={setUser} />
          <div style={{ display: "flex" }}>
            <LeftBar user={user} />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar follow={user} />
          </div>
        </div>
      </QueryClientProvider>
    );
  };
  const ProtectedRoute = ({ children }) => {
    if (user.is_active === false) {
      return <Navigate to="/login" />;
    }
    if (user.is_active === true) {
      return <Navigate to="/home" />;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login setUser={setUser} />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/social/:name",
      element: <User />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home user={user} />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
