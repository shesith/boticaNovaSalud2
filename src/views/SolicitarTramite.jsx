import { useEffect, useState } from "react";
import { services } from "../service/api";
import { useLoader } from "../context/loaderContext";
import { Alert } from "../components/ui/Alert";
import { Login } from "../components/Login";
import { getCredentials } from "../utils/CredentialsLocalStorage";

export const SolicitarTramite = () => {
  const { showLoader, hideLoader } = useLoader();
  const [data, setData] = useState({
    dataTramites: [],
    tipoTramiteSelected: "",
    cantidadCamposTramite: [],
  });
  const [formDinamico, setFormDinamico] = useState({});

  const obtenerCamposTramite = async (idTramite) => {
    showLoader();

    const response = await services({
      method: "GET",
      service: `http://localhost:5000/estructura-tramite/${idTramite}`,
    });

    if (response.status === 200) {
      setData((prev) => ({
        ...prev,
        cantidadCamposTramite: response.data,
      }));
    } else {
      Alert(
        "error",
        response.data.mensaje || "Error al obtener datos del formulario"
      );
    }
    hideLoader();
  };

  const getDataTramites = async () => {
    showLoader();
    const response = await services({
      method: "GET",
      service: "http://localhost:5000/tipos-tramite",
    });

    if (response.status === 200) {
      setData((prev) => ({
        ...prev,
        dataTramites: response.data,
      }));
    } else {
      Alert("error", response.data.mensaje || "Error al obtener los tramites");
    }
    hideLoader();
  };

  const handleDynamicInput = (campo, valor) => {
    setFormDinamico((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleSelectChange = async (e) => {
    const selectedValue = e.target.value;

    setData((prev) => ({
      ...prev,
      tipoTramiteSelected: selectedValue,
    }));

    if (selectedValue !== "") {
      await obtenerCamposTramite(selectedValue);
    }
  };

  const enviarFormulario = async () => {
    showLoader();

    const dataFormSend = Object.entries(formDinamico).map(([campo, valor]) => ({
      campo,
      valor,
    }));
    const response = await services({
      method: "POST",
      service: "http://localhost:5000/solicitar-tramite",
      body: {
        id_usuario: getCredentials().id_usuario,
        id_estructura: data.tipoTramiteSelected,
        detalles: dataFormSend,
      },
    });

    if (response.status === 201) {
      Alert(
        "success",
        response.data.mensaje || "Formulario enviado correctamente"
      );
      setFormDinamico({});
      setData((prev) => ({
        ...prev,
        tipoTramiteSelected: "",
        cantidadCamposTramite: [],
      }));
    } else {
      Alert("error", response.data.mensaje || "Error al obtener los tramites");
    }
    hideLoader();
  };

  useEffect(() => {
    function initialData() {
      getDataTramites();
    }
    initialData();
  }, []);

  return (
    <article className="container mx-auto py-6 bg-white p-4 rounded-2xl mb-4 shadow-md">
      <div className="ms-4">
        <h2 className="text-2xl font-bold text-[#7D7878] w-full">
          Solicitar Trámite
        </h2>
        <div className="border-b-3 border-[#eee8e8] my-4" />

        <label htmlFor="tipo-tramite" className="block  text-[#7b7676]">
          Seleccione tipo de trámite.
        </label>
        <select
          onChange={handleSelectChange}
          value={data.tipoTramiteSelected}
          id="tipo-tramite"
          className="border-[#7b7676] mt-2 border text-gray-900 text-sm rounded-3xl block w-full p-2.5 mb-4 cursor-pointer"
        >
          <option value="">-- Seleccione un trámite --</option>
          {Array.isArray(data.dataTramites) &&
            data.dataTramites.map((tramite) => (
              <option key={tramite.id_estructura} value={tramite.id_estructura}>
                {tramite.tipo_tramite}
              </option>
            ))}
        </select>

        {data.cantidadCamposTramite?.map((item, index) => (
          <div key={index} className="mb-4">
            <label className="block mb-1 text-sm text-[#7b7676]">
              {item.campo}
            </label>

            {item.tipo_dato === "input" && (
              <input
                type="text"
                name={item.campo}
                value={formDinamico[item.campo] || ""}
                className="w-full p-2 border rounded-lg"
                onChange={(e) => handleDynamicInput(item.campo, e.target.value)}
              />
            )}

            {item.tipo_dato === "número" && (
              <input
                type="number"
                name={item.campo}
                value={formDinamico[item.campo] || ""}
                className="w-full p-2 border rounded-lg"
                onChange={(e) => handleDynamicInput(item.campo, e.target.value)}
              />
            )}

            {item.tipo_dato === "fecha" && (
              <input
                type="date"
                name={item.campo}
                value={formDinamico[item.campo] || ""}
                className="w-full p-2 border rounded-lg"
                onChange={(e) => handleDynamicInput(item.campo, e.target.value)}
              />
            )}

            {item.tipo_dato.toLowerCase() === "select" && (
              <select
                name={item.campo}
                className="w-full p-2 border rounded-lg"
                value={formDinamico[item.campo] || ""}
                onChange={(e) => handleDynamicInput(item.campo, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            )}
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={enviarFormulario}
            className="text-white bg-[#a6915d] hover:bg-[#beae83] w-full md:w-50 font-medium rounded-lg px-5 py-4 text-center cursor-pointer mt-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#a6915d]/50"
          >
            Enviar
          </button>
        </div>
      </div>
    </article>
  );
};
