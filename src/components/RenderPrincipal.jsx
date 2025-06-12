import { getImageUrl } from "../utils/getImageUrl";
import { HomeAdmin } from "../views/HomeAdmin";
import { ListaProductos } from "../views/ListaProductos";
import { Menu } from "./Menu";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getCredentials } from "../utils/CredentialsLocalStorage";

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
    innerWidth();
    return () => {
      window.removeEventListener("resize", innerWidth);
    };
  }, []);

  return (
    <>
      <div className="flex">
        <Menu open={open} setOpen={setOpen} />
        <div className="flex flex-col w-full md:pl-[390px] px-4 transition-all duration-300">
          <header className="bg-[#a4a5a9] h-10 py-8 px-5 rounded-lg w-full mt-4 flex items-center justify-between md:justify-end">
            <button
              onClick={() => setOpen(true)}
              className="cursor-pointer md:hidden"
            >
              {/* Icono del menú */}
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
            <div className="flex justify-between items-center gap-1 w-full">
              <p className="text-white hidden md:block text-sm">
                Bienvenida(o),{" "}
                <span className="font-bold">{getCredentials().nombre}</span>
              </p>
              <div className="flex items-center">
                <p className="text-white hidden md:block text-sm">
                  {getCredentials().tipo_usuario.charAt(0).toUpperCase() +
                    getCredentials().tipo_usuario.slice(1)}
                </p>
                <img
                  className="w-8 ms-2"
                  src={getImageUrl("administrador-icon", "png")}
                  alt="Icono administrador"
                />
              </div>
            </div>
          </header>
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
