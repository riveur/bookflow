import { Navigate, RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import DefaultLayout from "@/components/layouts/default";
import { useTokenStore } from "@/stores/useTokenStore";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/lib/validation";
import { Toaster } from "@/components/ui/sonner";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/auth/login";
import ErrorPage from "@/pages/error";
import UnauthorizedPage from "@/pages/unauthorized";
import BookShowPage from "@/pages/books/show";
import BookAddPage from "@/pages/books/add";
import BookBorrowPage from "@/pages/books/borrow";

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
      {
        path: "/books/:isbn",
        element: <RequireAuth children={<BookShowPage />} />,
      },
      {
        path: "/books/add",
        element: <RequireAuth role="LIBRARIAN" children={<BookAddPage />} />,
      },
      {
        path: "/books/:isbn/borrow/:exampleId?",
        element: <RequireAuth children={<BookBorrowPage />} />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
]);

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

function RequireAuth({ children, role }: { children: JSX.Element, role?: User['role'] }) {
  const isLoggedIn = useTokenStore(state => state.isLoggedIn);
  const { data: user } = useAuth();
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && role && user.role !== role) {
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  return children;
}
