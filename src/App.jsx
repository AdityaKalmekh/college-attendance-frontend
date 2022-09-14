import { css, Global } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
import AppLayout from "./layout";
import { AuthContextProvider } from "./context/AuthContext";
import { LayoutContextProvider } from "./context/LayoutContext";
// import "react-toastify/dist/ReactToastify.css";
import { GlobalContextProvider } from "./context/GlobalContext";

function App() {
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}
      />
      <BrowserRouter>
        <AuthContextProvider>
          <GlobalContextProvider>
            <LayoutContextProvider>
              {/* <ToastContainer /> */}
              <AppLayout />
            </LayoutContextProvider>
          </GlobalContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
