import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/app-layouts";
import Landing from "./pages/Landing";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import Redirect from "./pages/redirect";
import Link from "./pages/link";
import UrlProvider from "./context";
import RequireAuth from "./components/require-auth";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/dashboard",
        element: <RequireAuth><Dashboard /> </RequireAuth>,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/:id",
        element: <Redirect />,
      },
      {
        path: "/link/:id",
        element: <RequireAuth><Link /></RequireAuth>,
      },
    ],
  },
]);
function App() {
  return (
    
    <UrlProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
