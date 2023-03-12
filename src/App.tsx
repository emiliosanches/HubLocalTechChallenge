import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { Router } from "./Router";
import { store } from "./store";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/defaultTheme";

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />

      <ThemeProvider theme={defaultTheme}>
        <Router />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
