import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/authentication/LoginPage";
import SignUp from "./pages/authentication/Register";
import { Home } from "./pages/landing page/Home";
import { MainLayout } from "./pages/main layout/MainLayout";
import { CreateContract } from "./pages/contract/CreateContract";
import "./App.css";
import { ContractHome } from "./pages/contract home/ContractHome";
import { AddFieldContract } from "./pages/contract/AddFieldcontract";
import { Envelope } from "./pages/envelopes/envelope";
import { ContractDetail } from "./pages/contract/ContractDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <SignUp />,
    },
    {
      path: "/add_field_contract",
      element: <AddFieldContract />,
    },
    {
      path: "/v1",
      element: <MainLayout />,
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <ContractHome /> },
        {
          path: "home",
          element: <ContractHome />,
        },
        {
          path: "contract/create",
          element: <CreateContract />,
        },
        {
          path: "inbox",
          element: <Envelope type={"inbox"} />,
        },
        {
          path: "contract/detail/:contractId",
          element: <ContractDetail/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
