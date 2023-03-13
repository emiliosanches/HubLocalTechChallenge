import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PageGuard } from "./components/PageGuard";
import { AuthLayout } from "./Layouts/AuthLayout";
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
        <Route path="companies" element={<PageGuard />}>
          <Route element={<CompaniesListPage />} path="" />
          <Route element={<PlacesListPage />} path=":companyId/places" />
        </Route>
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
