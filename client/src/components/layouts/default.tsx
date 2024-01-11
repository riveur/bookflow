import { Outlet } from "react-router-dom";
import Header from "@/components/layouts/shared/header";

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  )
}