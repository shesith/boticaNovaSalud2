import { useEffect, useState } from "react";
import { services } from "../service/api";
import { useLoader } from "../context/loaderContext";
import { Alert } from "../components/ui/Alert";
import { getCredentials } from "../utils/CredentialsLocalStorage";

export const Notificaciones = () => {
  const { showLoader, hideLoader } = useLoader();
  const [notificaciones, setNotificaciones] = useState([]);

  const getNotificaciones = async () => {
    showLoader();
    const response = await services({
      method: "GET",
      service: `http://localhost:5000/notificaciones/${
        getCredentials().id_usuario
      }`,
    });

    if (response.status === 200) {
      setNotificaciones(response.data);
    } else {
      Alert("error", "Error al obtener las notificaciones");
    }
    hideLoader();
  };
  const formatearFecha = (iso) => {
    const fecha = new Date(iso);
    return fecha.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    function initialData() {
      getNotificaciones();
    }
    initialData();
  }, []);

  return (
    <article className="container mx-auto py-6 bg-white p-4 rounded-2xl mb-4 shadow-md">
      <div className="ms-4">
        <h2 className="text-2xl font-bold text-[#7D7878] w-full">
          Notificaciones
        </h2>
        <div className="border-b-2 border-[#eee8e8] my-4" />

        <div className="space-y-4">
          {notificaciones.length === 0 ? (
            <p className="text-[#999] text-sm">No tienes notificaciones.</p>
          ) : (
            notificaciones.map((notif, index) => (
              <div
                key={index}
                className="flex items-start bg-[#f9f9f9] p-4 rounded-xl shadow-sm hover:bg-[#f1f1f1] transition"
              >
                <div className="p-2 bg-[#1E40AF] rounded-full text-white me-4 text-xl">
                  🔔
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#666] whitespace-pre-line">
                    {notif.mensaje}
                  </p>
                  <span className="text-xs text-[#999]">
                    {formatearFecha(notif.fecha_envio)}
                  </span>
                </div>
                <button
                  className="text-gray-400 hover:text-red-500 transition text-xl"
                  onClick={() => alert(`Eliminar notificación ${index}`)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </article>
  );
};
