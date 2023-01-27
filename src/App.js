import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/authentication/LoginPage";
import SignUp from "./pages/authentication/Register";
import { Home } from "./pages/home/Home";
import { MainLayout } from "./pages/main layout/MainLayout";
import { CreateContract } from "./pages/contract/CreateContract";
import "./App.css";
import { SignField } from "./pages/sign field/SignField";
import { Inbox } from "./pages/envelops/Inbox";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/auth",
      element: <Outlet />,
      children:[
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <SignUp />,
        },
      ]
    },
    
    {
      path: "/sign_field",
      element: <SignField />,
    },
    {
      path: "/v1",
      element: <MainLayout />,
      // errorElement: <ErrorPage />,
      children: [
        {
          path: "contract/create",
          element: <CreateContract />,
        },
        {
          path: "inbox",
          element: <Inbox />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
