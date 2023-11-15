import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Root() {
  return (
    <div className="grid h-screen w-screen grid-rows-[auto_1fr_auto] justify-center">
      <Navbar />
      <main className=" flex w-[40rem]  justify-center border border-slate-500 lg:w-[60rem]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
