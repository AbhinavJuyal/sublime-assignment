import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import CreateForm from "@/pages/CreateForm";

import "./index.css";
import AllForms from "./pages/AllForms";
import ShowForm from "./pages/ShowForm";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllForms />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create",
    element: <CreateForm />,
  },
  {
    path: "/form/:id",
    element: <ShowForm />,
  },
]);

function App() {
  return (
    <>
      <div className="w-screen min-h-screen flex justify-center px-4 py-6 overflow-hidden">
        <div className="w-full max-w-[700px]">
          <RouterProvider router={router} />
        </div>
      </div>
      <Toaster />
    </>
  );
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
