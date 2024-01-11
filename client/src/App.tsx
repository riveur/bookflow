import { Navigate, RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import DefaultLayout from "@/components/layouts/default";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/login";
import ErrorPage from "@/pages/error";
import { useTokenStore } from "@/stores/useTokenStore";

const router = createBrowserRouter([
  {
    id: "root",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <RequireAuth children={<HomePage />} />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  }
]);

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const isLoggedIn = useTokenStore(state => state.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
