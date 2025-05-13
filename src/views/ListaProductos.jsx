import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";

export const ListaProductos = () => {
  const [openModal, setOpenModal] = useState({
    editar: false,
    agregar: false,
  });

  const columns = [
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Email", selector: (row) => row.email },
    { name: "Edad", selector: (row) => row.edad, sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => setOpenModal({ ...openModal, editar: true })}
          className="bg-green-500 text-white border-none px-2 py-1 rounded"
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
            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
            <path d="M16 5l3 3" />
          </svg>
        </button>
      ),
    },
  ];

  const data = [
    { nombre: "Juan Pérez", email: "juan@example.com", edad: 30 },
    { nombre: "María López", email: "maria@example.com", edad: 25 },
    { nombre: "Carlos Gómez", email: "carlos@example.com", edad: 35 },
  ];

  return (
    <>
      <article className="container mx-auto">
        <h2>Lista</h2>
        <div className="flex justify-end">
          <Button
            sx={{
              backgroundColor: "#51B4C3",
            }}
            onClick={() => setOpenModal({ ...openModal, agregar: true })}
            variant="contained"
          >
            <AddIcon />
            Agregar
          </Button>
        </div>
        <DataTable title="Usuarios" columns={columns} data={data} />
      </article>

      {openModal.editar ? (
        <Modal
          open={openModal.editar}
          onClose={() => setOpenModal({ ...openModal, editar: false })}
          className="flex items-center justify-center"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-130">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
            </div>
          </div>
        </Modal>
      ) : null}

      {openModal.agregar ? (
        <Modal
          open={openModal.agregar}
          onClose={() => setOpenModal({ ...openModal, agregar: false })}
          className="flex items-center justify-center"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-130">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-4">Agregar Producto</h2>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
