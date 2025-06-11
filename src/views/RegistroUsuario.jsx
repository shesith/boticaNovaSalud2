import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getImageUrl } from "../utils/getImageUrl";

export const RegistroUsuario = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [dataRegister, setDataRegister] = useState({
    tipoUsuario: "",
    nombre: "",
    dni: "",
    correo: "",
    password: "",
  });

  return (
    <article className="h-screen container mx-auto flex justify-center items-center">
      <div className="flex-col flex justify-center items-center gap-8 lg:flex-row ">
        <img
          className="hidden lg:block w-110"
          src={getImageUrl("logo-escuela", "png")}
          alt="logo"
        />
        <div className="border-2 p-10 border-black mx-4 lg:w-100 flex flex-col justify-center bg-white shadow-md">
          <h1 className="text-[#7b7676] text-lg mb-4 text-center font-bold">
            Registro de usuario
          </h1>

          <label htmlFor="tipo-usuario" className="block  text-[#7b7676]">
            Seleccione tipo de usuario.
          </label>
          <select
            id="tipo-usuario"
            className=" border-[#7b7676] mt-2 border text-gray-900 text-sm rounded-3xl block w-full p-2.5 mb-4 cursor-pointer"
          >
            <option selected>Seleccionar</option>
            <option value="US">Calle 01</option>
            <option value="CA">Calle 02</option>
          </select>

          <label htmlFor="nombre" className="block mb-2 text-sm text-[#7b7676]">
            Nombre
          </label>

          <input
            type="text"
            id="nombre"
            onChange={(e) =>
              setDataRegister({ ...dataRegister, nombre: e.target.value })
            }
            maxLength={15}
            className="mb-4 border border-[#7b7676] text-gray-900 text-sm rounded-3xl block w-full p-2.5"
            placeholder="Escribe el correo"
            required
          />

          <label htmlFor="dni" className="block mb-2 text-sm text-[#7b7676]">
            DNI
          </label>

          <input
            type="text"
            id="dni"
            onChange={(e) =>
              setDataRegister({ ...dataRegister, dni: e.target.value })
            }
            maxLength={15}
            className="mb-4 border border-[#7b7676] text-gray-900 text-sm rounded-3xl block w-full p-2.5"
            placeholder="Escribe el correo"
            required
          />

          <label
            htmlFor="first_name"
            className="block mb-2 text-sm text-[#7b7676]"
          >
            Correo
          </label>

          <input
            type="text"
            id="first_name"
            onChange={(e) =>
              setDataRegister({ ...dataRegister, correo: e.target.value })
            }
            maxLength={15}
            className="mb-4 border border-[#7b7676] text-gray-900 text-sm rounded-3xl block w-full p-2.5"
            placeholder="Escribe el correo"
            required
          />

          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-[#7b7676]"
            >
              Contraseña
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                maxLength={50}
                onChange={(e) =>
                  setDataRegister({ ...dataRegister, password: e.target.value })
                }
                className="border rounded-3xl border-[#7b7676] text-gray-900 text-sm block w-full p-2.5 pr-10" // Añadí pr-10 para padding derecho
                placeholder="•••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={dataRegister.password.length === 0}
                className={`absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 ${
                  dataRegister.password.length === 0
                    ? "opacity-30"
                    : "cursor-pointer"
                } `}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
          </div>

          <button
            //  onClick={() => iniciarSesion(toggleSede ? "sede" : "login")}
            type="submit"
            className="text-white bg-[#a6915d] hover:bg-[#beae83] font-medium rounded-lg text-sm w-full px-5 py-4 text-center cursor-pointer mt-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#a6915d]/50"
          >
            Registrar usuario
          </button>
        </div>
      </div>
    </article>
  );
};
