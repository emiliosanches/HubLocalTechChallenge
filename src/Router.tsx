import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./Layouts/AuthLayout";
import { DefaultLayout } from "./Layouts/DefaultLayout";
import { CompaniesListPage } from "./pages/CompaniesList";
import { LoginPage } from "./pages/Login";
import { PlacesListPage } from "./pages/PlacesList";
import { SignUpPage } from "./pages/SignUp";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />} path="auth">
          <Route element={<LoginPage />} path="login" />
          <Route element={<SignUpPage />} path="sign-up" />
        </Route>
        <Route element={<DefaultLayout />} path="companies">
          <Route element={<CompaniesListPage />} path="" />
          <Route element={<PlacesListPage />} path=":companyId/places" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
