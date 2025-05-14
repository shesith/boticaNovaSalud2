import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/getImageUrl";
import LogoutIcon from "@mui/icons-material/Logout";
import { AlertSquareConfirm } from "./ui/AlertSquareConfirm";
import SouthIcon from "@mui/icons-material/South";

export const Menu = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black z-40 md:hidden transition-opacity duration-300 ${
          open ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <nav
        className={`bg-white w-65 top-0 left-0 h-screen fixed md:static z-50 md:w-90 transition-transform duration-300 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-2 top-2 cursor-pointer md:hidden "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7b7676"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
        <div className="flex items-center gap-2 p-3">
          <img
            className="w-16"
            src={getImageUrl("logo-home", "png")}
            alt="logo"
          />
          <h3 className="text-lg font-bold text-[#51b4c3]">NOVA SALUD</h3>
        </div>
        <ul className="flex-col justify-center px-4 pb-4 text-white">
          <p className="text-xs mb-3 text-[#7b7676]">MÓDULOS</p>
          <NavLink
            to="/home-admin"
            className={`bg-[#51b4c3] p-2.5 cursor-pointer flex items-center gap-1 rounded-xl mb-2 hover:bg-[#afdfda] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#63c2b7]/50 ${
              location.pathname === "/home-admin" ? "bg-[#AFDFDA]" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M21 12l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h6" />
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2c.39 0 .754 .112 1.061 .304" />
              <path d="M19 21.5l2.518 -2.58a1.74 1.74 0 0 0 0 -2.413a1.627 1.627 0 0 0 -2.346 0l-.168 .172l-.168 -.172a1.627 1.627 0 0 0 -2.346 0a1.74 1.74 0 0 0 0 2.412l2.51 2.59z" />
            </svg>
            Home
          </NavLink>
          <li className="bg-[#51b4c3] p-2.5 flex items-center gap-1 rounded-xl mb-2 hover:bg-[#afdfda] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#63c2b7]/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 21h8a1 1 0 0 0 1 -1v-10a3 3 0 0 0 -3 -3h-4a3 3 0 0 0 -3 3v10a1 1 0 0 0 1 1z" />
              <path d="M10 14h4" />
              <path d="M12 12v4" />
              <path d="M10 7v-3a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3" />
            </svg>
            <div className="flex items-center justify-between w-full">
              Productos <SouthIcon />
            </div>
          </li>
          <NavLink
            to="/lista-productos"
            className={`bg-[#51b4c3] p-2.5 cursor-pointer flex items-center gap-1 rounded-xl mb-2 hover:bg-[#afdfda] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#63c2b7]/50 ${
              location.pathname === "/lista-productos" ? "bg-[#AFDFDA]" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18.364 18.364a9 9 0 1 1 -12.728 -12.728a9 9 0 0 1 12.728 12.728z" />
              <path d="M16.243 7.757a6 6 0 0 1 0 8.486" />
            </svg>
            Lista productos
          </NavLink>
          <NavLink
            to="/ficha-productos"
            className={`bg-[#51b4c3] p-2.5  flex items-center gap-1 rounded-xl mb-2 hover:bg-[#afdfda] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#63c2b7]/50 ${
              location.pathname === "/ficha-productos" ? "bg-[#AFDFDA]" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18.364 18.364a9 9 0 1 1 -12.728 -12.728a9 9 0 0 1 12.728 12.728z" />
              <path d="M16.243 7.757a6 6 0 0 1 0 8.486" />
            </svg>
            Ficha productos
          </NavLink>
          <li className="bg-[#51b4c3] p-2.5  flex items-center gap-1 rounded-xl mb-2 hover:bg-[#afdfda] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#63c2b7]/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11.5 21h-2.926a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304h11.339a2 2 0 0 1 1.977 2.304l-.5 3.248" />
              <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
              <path d="M15 19l2 2l4 -4" />
            </svg>
            <div className="flex items-center justify-between w-full">
              Ventas
              <SouthIcon />
            </div>
          </li>
          <NavLink
            to="/lista-clientes"
            className={`bg-[#51b4c3] p-2.5  flex items-center gap-1 rounded-xl mb-2 hover:bg-[#afdfda] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#63c2b7]/50 ${
              location.pathname === "/lista-clientes" ? "bg-[#AFDFDA]" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18.364 18.364a9 9 0 1 1 -12.728 -12.728a9 9 0 0 1 12.728 12.728z" />
              <path d="M16.243 7.757a6 6 0 0 1 0 8.486" />
            </svg>
            Clientes
          </NavLink>
          <NavLink
            to="/facturacion"
            className={`bg-[#51b4c3] p-2.5  flex items-center gap-1 rounded-xl mb-2 hover:bg-[#afdfda] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#63c2b7]/50 ${
              location.pathname === "/facturacion" ? "bg-[#AFDFDA]" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18.364 18.364a9 9 0 1 1 -12.728 -12.728a9 9 0 0 1 12.728 12.728z" />
              <path d="M16.243 7.757a6 6 0 0 1 0 8.486" />
            </svg>
            Facturación
          </NavLink>
          <li className="bg-[#51b4c3] p-2.5  flex items-center gap-1 rounded-xl mb-2 hover:bg-[#afdfda] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#63c2b7]/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
              <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            </svg>
            <div className="flex items-center justify-between w-full">
              Recepción
              <SouthIcon />
            </div>
          </li>
          <NavLink
            to="/lista-proveedores"
            className={`bg-[#51b4c3] p-2.5 flex items-center gap-1 rounded-xl mb-2 hover:bg-[#afdfda] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#63c2b7]/50  ${
              location.pathname === "/lista-proveedores" ? "bg-[#AFDFDA]" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18.364 18.364a9 9 0 1 1 -12.728 -12.728a9 9 0 0 1 12.728 12.728z" />
              <path d="M16.243 7.757a6 6 0 0 1 0 8.486" />
            </svg>
            Proveedores
          </NavLink>

          <button
            className="w-full font-bold text-white bg-red-400 p-2.5 flex justify-center items-center gap-1 rounded-xl mt-8 cursor-pointer hover:bg-red-500 transition-all duration-300 hover:scale-105  hover:shadow-lg hover:shadow-[bg-red-500]/50"
            onClick={() => {
              AlertSquareConfirm({
                icon: "info",
                title: "Atención",
                text: "¿Estás seguro de que deseas salir?",
                showDeny: true,
                confirmButtonText: "Salir",
                denyButtonText: "Cancelar",
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.clear();
                  navigate("/");
                }
              });
            }}
          >
            Salir
            <LogoutIcon />
          </button>
        </ul>
      </nav>
    </>
  );
};
