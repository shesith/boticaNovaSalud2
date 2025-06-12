import { getImageUrl } from "../utils/getImageUrl";
import AddIcon from "@mui/icons-material/Add";
import { LineChart } from "@mui/x-charts/LineChart";
import DashboardStats from "../components/DashboardStats";
import DashboardChart from "../components/DashboardChart";
import { getCredentials } from "../utils/CredentialsLocalStorage";
// ...existing code...

export const HomeAdmin = () => {
  const tipoUsuario = getCredentials().tipo_usuario;

  return (
    <article className="mb-8">
      <div className="grid md:grid-cols-5 gap-4 mb-4">
        {/* Admin: Estadísticas y Gestión */}
        {tipoUsuario === "admin" && (
          <>
            <div className="bg-white p-6 rounded-2xl col-span-4 shadow-md md:flex lg:items-center lg:justify-evenly relative">
              <p className="text-[#7D7878] text-lg text-center md:text-left mb-6 md:mb-0 absolute top-4 left-4">
                Estadísticas
              </p>
              <DashboardStats />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between">
              <div>
                <h3 className="text-[#7D7878] text-lg font-semibold mb-2">
                  Gestión de Trámites
                </h3>
                <p className="text-sm text-[#999] mb-4">
                  Revisa, aprueba o rechaza los trámites pendientes desde este
                  panel.
                </p>
              </div>
              <a
                href="/gestion-tramites"
                className="bg-[#ACB696] hover:bg-[#8d967b] text-white text-center rounded-lg px-4 py-2 text-sm transition"
              >
                Ir a gestionar trámites
              </a>
            </div>
          </>
        )}

        {/* Ciudadano: Previsualizaciones en Grid */}
        {tipoUsuario === "ciudadano" && (
          <>
            <div className="bg-white p-6 rounded-2xl shadow-md col-span-3">
              <h3 className="text-[#7D7878] text-lg font-semibold mb-2">
                Estado de Trámites
              </h3>
              <p className="text-sm text-[#999] mb-4">
                Tienes 1 trámite en proceso.
              </p>
              <a
                href="/consultar-estado"
                className="bg-[#ACB696] hover:bg-[#8d967b] text-white text-center rounded-lg px-4 py-2 text-sm transition"
              >
                Ver detalles
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md col-span-2">
              <h3 className="text-[#7D7878] text-lg font-semibold mb-2">
                Notificaciones
              </h3>
              <p className="text-sm text-[#999]">
                No tienes notificaciones nuevas.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md col-span-5">
              <h3 className="text-[#7D7878] text-lg font-semibold mb-2">
                Historial de Trámites
              </h3>
              <p className="text-sm text-[#999] mb-4">
                Último trámite: Licencia A - Aprobado
              </p>
              <a
                href="/historial-tramites"
                className="bg-[#ACB696] hover:bg-[#8d967b] text-white text-center rounded-lg px-4 py-2 text-sm transition"
              >
                Ver historial completo
              </a>
            </div>
          </>
        )}
      </div>

      {/* Admin: Gráfico */}
      {tipoUsuario === "admin" && (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-md col-span-3">
            <DashboardChart />
          </div>
        </div>
      )}
    </article>
  );
};
