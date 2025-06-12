import { useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";
import { services } from "../service/api";
import { NavLink, useNavigate } from "react-router-dom";
import { Alert } from "./ui/Alert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useLoader } from "../context/loaderContext";

export const Login = () => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [showPassword, setShowPassword] = useState(false);
  const [dataLogin, setDataLogin] = useState({
    nombre: "",
    password: "",
    tipoUsuario: "",
  });

  const iniciarSesion = async (type) => {
    localStorage.setItem("access_granted", "true");
    if (type === "sede") {
      navigate("/home-admin");
      return;
    }

    if (dataLogin.nombre === "" && dataLogin.password === "") {
      Alert("warning", "Los datos no pueden ir vacios");
      return;
    }

    showLoader();

    const response = await services({
      method: "POST",
      service: "http://localhost:5000/login",
      body: {
        correo: dataLogin.nombre,
        contraseña: dataLogin.password,
        tipo_usuario: dataLogin.tipoUsuario,
      },
    });

    const { errors, data } = response;

    if (response.status === 200) {
      Alert("success", data.mensaje || "Inicio de sesión exitoso");
      localStorage.setItem("access_granted", "true");
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/home-admin");
      setDataLogin({ nombre: "", password: "", tipoUsuario: "" });
    } else {
      Alert(
        "error",
        errors.data.mensaje || "Ocurrio un error al iniciar sesión"
      );
    }
    hideLoader();
  };

  return (
    <>
      <article className="h-screen container mx-auto flex justify-center items-center">
        <div className="flex-col flex justify-center items-center gap-8 lg:flex-row ">
          <img
            className="hidden lg:block w-110"
            src={getImageUrl("logo-escuela", "png")}
            alt="logo"
          />
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="border-2 p-10 border-black mx-4 lg:w-100 flex flex-col justify-center bg-white shadow-md">
              <h1 className="text-[#7b7676] text-lg mb-4 text-center font-bold">
                Bienvenido👋
              </h1>

              <p className="text-[#7b7676] mb-6">
                ✔ Inicie sesión para ingresar al sistema
              </p>

              <label htmlFor="tipo-usuario" className="block  text-[#7b7676]">
                Seleccione tipo de usuario.
              </label>
              <select
                onChange={(e) =>
                  setDataLogin({
                    ...dataLogin,
                    tipoUsuario: e.target.value,
                  })
                }
                value={dataLogin.tipoUsuario}
                id="tipo-usuario"
                className=" border-[#7b7676] mt-2 border text-gray-900 text-sm rounded-3xl block w-full p-2.5 mb-4 cursor-pointer"
              >
                <option selected>Seleccionar</option>
                <option value="ciudadano">Ciudadano</option>
                <option value="admin">Admin</option>
              </select>

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
                  setDataLogin({ ...dataLogin, nombre: e.target.value })
                }
                value={dataLogin.nombre}
                className="mb-4 border border-[#7b7676] text-gray-900 text-sm rounded-3xl block w-full p-2.5"
                placeholder="Escribe tu correo"
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
                    value={dataLogin.password}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    maxLength={50}
                    onChange={(e) =>
                      setDataLogin({
                        ...dataLogin,
                        password: e.target.value,
                      })
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

              <button
                onClick={iniciarSesion}
                type="submit"
                className="text-white bg-[#a6915d] hover:bg-[#beae83] font-medium rounded-lg text-sm w-full px-5 py-4 text-center cursor-pointer mt-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#a6915d]/50"
              >
                Iniciar Sesión
              </button>
            </div>
            <p>
              Registrate{" "}
              <NavLink
                to="/registro-usuario"
                className="text-[#8c3836] underline"
              >
                aqui
              </NavLink>
            </p>
          </div>
        </div>
      </article>
    </>
  );
};
