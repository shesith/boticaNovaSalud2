import { useEffect, useState } from "react";
import { services } from "../service/api";
import { useLoader } from "../context/loaderContext";
import { Alert } from "../components/ui/Alert";
import { getCredentials } from "../utils/CredentialsLocalStorage";

export const ConsultarEstado = () => {
  const { showLoader, hideLoader } = useLoader();
  const [data, setData] = useState([]);

  const getHistorialTramites = async () => {
    showLoader();
    const response = await services({
      method: "GET",
      service: `http://localhost:5000/estado-tramites/${
        getCredentials().id_usuario
      }`,
    });

    if (response.status === 200) {
      setData(response.data);
    } else {
      Alert("error", "Error al obtener los datos");
    }
    hideLoader();
  };

  useEffect(() => {
    getHistorialTramites();
  }, []);

  const formatearFecha = (iso) => {
    const fecha = new Date(iso);
    return fecha.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="container mx-auto py-6 bg-white p-4 rounded-2xl mb-4 shadow-md">
      <div className="ms-4">
        <h2 className="text-2xl font-bold text-[#7D7878] w-full">
          Consultar Estado
        </h2>
        <div className="border-b-2 border-[#eee8e8] my-4" />

        <div className="space-y-4">
          {data.length === 0 ? (
            <p className="text-[#999] text-sm">
              No tienes trámites registrados aún.
            </p>
          ) : (
            data.map((tramite) => (
              <div
                key={tramite.id_tramite}
                className="bg-[#f9f9f9] p-4 rounded-xl shadow-sm hover:bg-[#f1f1f1] transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-[#333]">
                      {tramite.tipo_tramite}
                    </h3>
                    <p className="text-sm text-[#666] mt-1">
                      Fecha de solicitud:{" "}
                      {formatearFecha(tramite.fecha_solicitud)}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tramite.estado === "Aprobado"
                        ? "bg-green-100 text-green-700"
                        : tramite.estado === "Rechazado"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {tramite.estado}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
};
