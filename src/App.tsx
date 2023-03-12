import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { Router } from "./Router";
import { store } from "./store";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/defaultTheme";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />

      <ThemeProvider theme={defaultTheme}>
        <Router />
        <ToastContainer position="top-right" autoClose={3500} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
