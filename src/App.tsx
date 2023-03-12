import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "./Router";
import { persistor, store } from "./store";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/defaultTheme";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyle />

          <Router />
        </PersistGate>
        <ToastContainer autoClose={3500} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
