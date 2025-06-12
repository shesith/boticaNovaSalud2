import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useLoader } from "../context/loaderContext";
import { Alert } from "../components/ui/Alert";
import { services } from "../service/api";

export const GestionTramites = () => {
  const { showLoader, hideLoader } = useLoader();
  const [data, setData] = useState({
    dataTramites: [],
  });

  const columns = [
    {
      name: "FECHA",
      selector: (row) =>
        new Date(row.fecha_solicitud).toLocaleDateString("es-MX", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      center: true,
      headerStyle: {
        backgroundColor: "#afdfda",
        fontWeight: "bold",
      },
    },
    {
      name: "NOMBRE",
      selector: (row) => row.nombre_usuario,
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "TIPO TRÁMITE",
      selector: (row) => row.tipo_tramite,
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "ESTATUS",
      cell: (row) => (
        <div className="flex flex-col items-center gap-1">
          <span
            className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
              row.estado === "Aprobado" ? "bg-green-600" : "bg-yellow-500"
            }`}
          >
            {row.estado}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleChangeStatus(row, "Aprobado")}
              className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded-md shadow-sm transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-check"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l5 5l10 -10" />
              </svg>
            </button>
            <button
              onClick={() => handleChangeStatus(row, "Rechazado")}
              className="px-2 py-1 text-xs bg-red-500 hover:bg-red-700 text-white rounded-md shadow-sm transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ),
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
  ];

  const handleChangeStatus = async (row, estatus) => {
    showLoader();
    const response = await services({
      method: "PUT",
      service: `http://localhost:5000/actualizar-estado-tramite/${row.id_tramite}`,
      body: {
        nuevo_estado: estatus,
      },
    });

    if (response.status === 200) {
      Alert(
        "success",
        response.data.mensaje || "Estatus actualizado correctamente"
      );

      getDataTramites();
    } else {
      Alert("error", response.data.mensaje || "Error al actualizar el estatus");
    }
    hideLoader();
  };

  const getDataTramites = async () => {
    showLoader();
    const response = await services({
      method: "GET",
      service: "http://localhost:5000/tramites-pendientes",
    });

    if (response.status === 200) {
      setData({ ...data, dataTramites: response.data });
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
          Gestión de Trámites
        </h2>
        <div className="border-b-3 border-[#eee8e8] my-4" />

        <DataTable
          columns={columns}
          data={data?.dataTramites}
          highlightOnHover
          striped
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
          noDataComponent={
            <div className="text-center py-6 text-gray-500 text-sm">
              No hay trámites.
            </div>
          }
          customStyles={{
            table: {
              style: {
                border: "1px solid #63201e",
                borderRadius: "8px",
                overflow: "hidden",
                color: "#fff",
              },
            },
            head: {
              style: {
                borderBottom: "1px solid #63201e",
                color: "#fff",
              },
            },
            headCells: {
              style: {
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "uppercase",
                backgroundColor: "#63201e",
                padding: "12px 8px",
                borderRight: "1px solid #63201e",
                color: "#fff",
                "&:last-child": {
                  borderRight: "none",
                },
              },
            },
            cells: {
              style: {
                fontSize: "14px",
                padding: "8px",
                borderRight: "1px solid #63201e",
                borderBottom: "1px solid #63201e",
                "&:last-child": {
                  borderRight: "none",
                },
              },
            },
            rows: {
              style: {
                "&:last-child": {
                  "& td": {
                    borderBottom: "none",
                  },
                },
              },
            },
            pagination: {
              style: {
                borderTop: "1px solid #63201e",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              },
            },
          }}
        />
      </div>
    </article>
  );
};
