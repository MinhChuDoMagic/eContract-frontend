import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/authentication/LoginPage";
import SignUp from "./pages/authentication/Register";
import { Home } from "./pages/home/Home";
import { MainLayout } from "./pages/main layout/MainLayout";
import { CreateSignature } from "./pages/signature/CreateSignture";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/register",
      element: <SignUp/>,
    },
    {
      path: "/v1",
    element: <MainLayout/>,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "signature/create",
        element: <CreateSignature />,
      },
    ],
    }
   
  ]);

  return (
      <RouterProvider router={router} />
  );
}

export default App;
