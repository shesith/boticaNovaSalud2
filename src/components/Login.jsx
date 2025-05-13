import { useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";
import { services } from "../service/api";
import { useNavigate } from "react-router-dom";
import { Alert } from "./ui/Alert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLoader } from "../context/loaderContext";

export const Login = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [toggleSede, setToggleSede] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dataLogin, setDataLogin] = useState({
    nombre: "",
    password: "",
  });

  const iniciarSesion = async (type) => {
    localStorage.setItem("access_granted", "true");
    if (type === "sede") {
      navigate("/home-admin");
      return;
    }

    if (dataLogin.nombre === "" && dataLogin.password === "") {
      Alert("warning", "Los datos no pueden ir vacios");
      // showLoader();
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
      Alert("success", "Inicio de sesión exitoso");
      localStorage.setItem("access_granted", "true");
      localStorage.setItem("user", JSON.stringify(response.data));
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
        <div className="border-4 p-10 rounded-2xl border-[#63c2b7] mx-4 h-100 lg:w-100 flex flex-col justify-center bg-white shadow-md">
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
                      setDataLogin({ ...dataLogin, password: e.target.value })
                    }
                    className="border rounded-3xl border-[#7b7676] text-gray-900 text-sm block w-full p-2.5 pr-10" // Añadí pr-10 para padding derecho
                    placeholder="•••••••••"
                    required
                  />
                  <button
                    type="button" // Importante añadir type="button" para evitar submit accidental
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={dataLogin.password.length === 0}
                    className={`absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 ${
                      dataLogin.password.length === 0
                        ? "opacity-30"
                        : "cursor-pointer"
                    } `}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </button>
                </div>
              </div>
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
            className="text-white bg-[#63c2b7] hover:bg-[#52a89d] font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center cursor-pointer mt-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#63c2b7]/50"
          >
            {toggleSede ? "Continuar" : "Iniciar Sesión"}
          </button>
        </div>
      </div>
    </article>
  );
};
