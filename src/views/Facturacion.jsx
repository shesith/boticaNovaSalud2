import { Button } from "@mui/material";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";

export const Facturacion = () => {
  const navigate = useNavigate();
  const data = [
    { nombre: "Juan Pérez", email: "juan@example.com", edad: 30 },
    { nombre: "María López", email: "maria@example.com", edad: 25 },
    { nombre: "Carlos Gómez", email: "carlos@example.com", edad: 35 },
  ];

  const columns = [
    {
      name: "FECHA",
      selector: (row) => row.edad,
      center: true,
      headerStyle: {
        backgroundColor: "#afdfda",
        fontWeight: "bold",
      },
    },
    {
      name: "CLIENTE",
      selector: (row) => row.nombre,
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "DOCUMENTO",
      selector: (row) => row.edad,
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "NÚMERO",
      selector: (row) => row.edad,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "TOTAL VENTA",
      selector: (row) => row.edad,
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
            // onClick={() => setOpenModal({ ...openModal, editar: true })}
            className="bg-green-500 hover:bg-green-600 text-white border-none px-2 py-1 rounded cursor-pointer transition-colors"
          >
            <EditIcon fontSize="small" />
          </button>
          <button
            // onClick={() => eliminarProducto(row.id)}
            className="bg-red-600 hover:bg-red-700 text-white border-none px-2 py-1 rounded cursor-pointer transition-colors"
          >
            <DeleteForeverIcon fontSize="small" />
          </button>
        </div>
      ),
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
  ];

  return (
    <>
      <article className="container mx-auto py-6 bg-white p-4 rounded-2xl mb-4">
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
          data={data}
          pagination
          highlightOnHover
          striped
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
