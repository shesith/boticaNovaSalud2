import { Button } from "@mui/material";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { useEffect, useState } from "react";
import { useLoader } from "../context/loaderContext";
import { Alert } from "../components/ui/Alert";
import { services } from "../service/api";

export const Facturacion = () => {
  const { showLoader, hideLoader } = useLoader();
  const [dataFacturas, setDataFacturas] = useState([]);
  const navigate = useNavigate();
  const data = [
    { nombre: "Juan Pérez", email: "juan@example.com", edad: 30 },
    { nombre: "María López", email: "maria@example.com", edad: 25 },
    { nombre: "Carlos Gómez", email: "carlos@example.com", edad: 35 },
  ];

  const columns = [
    {
      name: "FECHA",
      selector: (row) => row.fecha_emision,
      center: true,
      headerStyle: {
        backgroundColor: "#afdfda",
        fontWeight: "bold",
      },
    },
    {
      name: "CLIENTE",
      selector: (row) => row.cliente_nombre,
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "DOCUMENTO",
      selector: (row) => row.tipo_voucher_nombre,
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "NÚMERO",
      selector: (row) => row.numero,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "TOTAL FACTURA",
      selector: (row) => row.total_factura,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "ACCIONES",
      center: true,
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={async () => {
              const response = await services({
                method: "GET",
                service: `http://localhost:5000/factura/pdf/${row.id_factura}`,
                responseType: "blob",
              });

              if (response.status === 200) {
                const file = new Blob([response.data], {
                  type: "application/pdf",
                });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL, "_blank");
              } else {
                console.error("Error al obtener el PDF", response);
              }
            }}
            className="border-none px-2 py-1 rounded cursor-pointer transition-colors"
          >
            <PictureAsPdfIcon fontSize="medium" />
          </button>
          <button
            onClick={async () => {
              const response = await services({
                method: "GET",
                service: `http://localhost:5000/factura/ticket/${row.id_factura}`,
                responseType: "blob",
              });

              if (response.status === 200) {
                const file = new Blob([response.data], {
                  type: "application/pdf",
                });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL, "_blank");
              } else {
                console.error("Error al obtener el PDF", response);
              }
            }}
            className="border-none px-2 py-1 rounded cursor-pointer transition-colors"
          >
            <TextSnippetIcon fontSize="medium" />
          </button>
        </div>
      ),
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
  ];

  const getDataFacturas = async () => {
    showLoader();
    const response = await services({
      method: "GET",
      service: "http://localhost:5000/facturas",
    });

    console.log(response);

    if (response.status === 200) {
      Alert("success", "Facturas obtenidas correctamente");
      setDataFacturas(response.data);
    } else {
      Alert("error", "Error al obtener las facturas");
    }
    hideLoader();
  };

  useEffect(() => {
    function initialData() {
      getDataFacturas();
    }
    initialData();
  }, []);

  return (
    <>
      <article className="container mx-auto py-6 bg-white p-4 rounded-2xl mb-4 shadow-md">
        <div className="ms-4">
          <h2 className="text-2xl font-bold text-[#7D7878] w-full">
            FACTURACIÓN
          </h2>
          <div className="border-b-3 border-[#eee8e8] my-4" />
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:justify-end md:items-center mb-6">
          <div className="flex justify-center gap-4">
            <Button
              // onClick={() => setOpenModal({ ...openModal, agregar: true })}
              variant="contained"
              sx={{
                borderRadius: ".8rem",
                display: "flex",
                gap: ".5rem",
                backgroundColor: "#a8a8a8",
                "&:hover": {
                  backgroundColor: "#c3c7c7",
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" />
                <path d="M4 6v6c0 1.657 3.582 3 8 3c1.118 0 2.183 -.086 3.15 -.241" />
                <path d="M20 12v-6" />
                <path d="M4 12v6c0 1.657 3.582 3 8 3c.157 0 .312 -.002 .466 -.005" />
                <path d="M16 19h6" />
                <path d="M19 16l3 3l-3 3" />
              </svg>
              Exportar
            </Button>
            <Button
              startIcon={<AddIcon />}
              onClick={() => navigate("agregar-facturacion")}
              variant="contained"
              sx={{
                borderRadius: ".8rem",
                backgroundColor: "#51B4C3",
                "&:hover": {
                  backgroundColor: "#3a9ca8",
                },
              }}
            >
              Agregar
            </Button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={dataFacturas}
          highlightOnHover
          striped
          noDataComponent={
            <div className="text-center py-6 text-gray-500 text-sm">
              No hay facturaciones.
            </div>
          }
          customStyles={{
            table: {
              style: {
                border: "1px solid #afdfda",
                borderRadius: "8px",
                overflow: "hidden",
              },
            },
            head: {
              style: {
                borderBottom: "1px solid #afdfda",
              },
            },
            headCells: {
              style: {
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "uppercase",
                backgroundColor: "#afdfda",
                color: "#333",
                padding: "12px 8px",
                borderRight: "1px solid #afdfda",
                "&:last-child": {
                  borderRight: "none",
                },
              },
            },
            cells: {
              style: {
                fontSize: "14px",
                padding: "8px",
                borderRight: "1px solid #afdfda",
                borderBottom: "1px solid #afdfda",
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
                borderTop: "1px solid #afdfda",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              },
            },
          }}
        />
      </article>
    </>
  );
};
