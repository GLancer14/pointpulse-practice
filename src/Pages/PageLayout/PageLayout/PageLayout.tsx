import { Outlet } from "react-router";
import { Header } from "../../../Widgets/Header";

export function PageLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}