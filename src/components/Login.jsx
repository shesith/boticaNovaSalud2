import { useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";
import { services } from "../service/api";
import { data, useNavigate } from "react-router-dom";
import { Alert } from "./ui/Alert";
export const Login = () => {
  const navigate = useNavigate();
  const [toggleSede, setToggleSede] = useState(false);
  const [dataLogin, setDataLogin] = useState({
    nombre: "",
    password: "",
  });

  const iniciarSesion = async (type) => {
    if (type === "sede") {
      navigate("/home-admin");
      return;
    }

    if (dataLogin.nombre === "" && dataLogin.password === "") {
      Alert("warning", "Los datos no pueden ir vacios");
      return;
    }

    const response = await services({
      method: "POST",
      service: "http://localhost:3000/login",
      body: {
        nombre: dataLogin.nombre,
        password: dataLogin.password,
      },
    });

    if (response.status === 200) {
      Alert("success", response.data.mensaje);
      setToggleSede(true);
    } else {
      Alert("error", response.data.error);
    }
  };

  return (
    <article className="h-screen container mx-auto flex justify-center items-center">
      <div className="flex-col flex justify-center items-center gap-8 lg:flex-row ">
        <img
          className="hidden lg:block w-110"
          src={getImageUrl("logo", "svg")}
          alt="logo"
        />
        <div className="border-4 p-10 rounded-2xl border-[#63c2b7] mx-4 h-100 lg:w-100 flex flex-col justify-center">
          <h1 className="text-[#7b7676] text-lg mb-4 text-center font-bold">
            Bienvenido👋
          </h1>
          {!toggleSede ? (
            <>
              <p className="text-[#7b7676] mb-6">
                ✔ Inicie sesión para ingresar al sistema
              </p>

              <label
                htmlFor="first_name"
                className="block mb-2 text-sm text-[#7b7676]"
              >
                Usuario
              </label>
              <input
                type="text"
                id="first_name"
                onChange={(e) =>
                  setDataLogin({ ...dataLogin, nombre: e.target.value })
                }
                maxLength={15}
                className="mb-4 border border-[#7b7676] text-gray-900 text-sm rounded-3xl block w-full p-2.5"
                placeholder="Usuario"
                required
              />

              <label
                htmlFor="password"
                className="block mb-2 text-sm text-[#7b7676]"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                maxLength={50}
                onChange={(e) =>
                  setDataLogin({ ...dataLogin, password: e.target.value })
                }
                className="border rounded-3xl border-[#7b7676] text-gray-900 text-sm block w-full p-2.5"
                placeholder="•••••••••"
                required
              />
            </>
          ) : (
            <>
              <label htmlFor="countries" className="block mb-4  text-[#7b7676]">
                Seleccione el sucursal para continuar.
              </label>
              <p className="text-[#7b7676]">Selecciona sede a ingresar</p>
              <select
                id="countries"
                className=" border-[#7b7676] mt-2 border text-gray-900 text-sm rounded-3xl block w-full p-2.5"
              >
                <option selected>Seleccionar</option>
                <option value="US">Calle 01</option>
                <option value="CA">Calle 02</option>
              </select>
            </>
          )}

          <button
            onClick={() => iniciarSesion(toggleSede ? "sede" : "login")}
            type="submit"
            class="text-white bg-[#63c2b7] hover:shadow-[#63c2b7] hover:shadow-lg font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center cursor-pointer mt-6 "
          >
            {toggleSede ? "Continuar" : "Iniciar Sesión"}
          </button>
        </div>
      </div>
    </article>
  );
};
