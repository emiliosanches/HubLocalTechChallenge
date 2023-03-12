import { Outlet } from "react-router";

export function DefaultLayout() {
  return (
    <div>
      <h1>Default Layout</h1>
      <Outlet />
    </div>
  );
}
