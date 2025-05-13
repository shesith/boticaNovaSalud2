import { getImageUrl } from "../utils/getImageUrl";
import { HomeAdmin } from "../views/HomeAdmin";
import { ListaProductos } from "../views/ListaProductos";
import { Menu } from "./Menu";
import { useEffect, useState } from "react";

export const RenderPrincipal = () => {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const innerWidth = () => {
      if (window.innerWidth > 768) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    window.addEventListener("resize", innerWidth);

    return () => {
      window.removeEventListener("resize", innerWidth);
    };
  }, []);

  return (
    <>
      <div className="flex">
        {open ? <Menu setOpen={setOpen} /> : null}
        <div className="flex justify-center mx-4 w-full">
          <header className="bg-[#51b4c3] h-10 py-8 px-5 rounded-lg w-full mt-4 flex items-center  justify-between md:justify-end">
            <button
              onClick={() => setOpen(true)}
              className="cursor-pointer md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 6h10" />
                <path d="M4 12h16" />
                <path d="M7 12h13" />
                <path d="M4 18h10" />
              </svg>
            </button>
            <div className="flex items-center gap-1 ">
              <p className="text-white hidden md:block text-sm">
                Administrador
              </p>
              <img
                className="w-12"
                src={getImageUrl("icon-admin", "svg")}
                alt=""
              />
            </div>
          </header>
        </div>
      </div>
    </>
  );
};
