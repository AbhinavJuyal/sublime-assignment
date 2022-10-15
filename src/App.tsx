import { Provider } from "react-redux";
import { store } from "./redux/store";

import CreateForm from "@/pages/CreateForm";

import "./index.css";

function App() {
  return (
    <div className="w-screen min-h-screen">
      <CreateForm />
    </div>
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
