import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "./components/Header";
import { Orders } from "./components/Orders";

function App() {
  return (
    <>
      <Header />
      <Orders />

      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
