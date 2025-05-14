import {
  Box,
  Button,
  IconButton,
  Modal,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { AlertSquareConfirm } from "../components/ui/AlertSquareConfirm";

export const ListaProductos = () => {
  const [dataProducto, setDataProducto] = useState({
    codigo: "",
    nombre: "",
    presentacion: "",
    cantidad: "",
    stock: "",
    categoria: "",
    precio: "",
    descripcion: "",
  });

  const [openModal, setOpenModal] = useState({
    editar: false,
    agregar: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataProducto({ ...dataProducto, [name]: value });
  };

  const eliminarProducto = (id) => {
    AlertSquareConfirm({
      icon: "warning",
      title: "Atención",
      text: "¿Estás seguro de que desea eliminar el producto?",
      showDeny: true,
      confirmButtonText: "Salir",
      denyButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // logica para eliminar el producto
        console.log("Producto eliminado");
      }
    });
  };

  const data = [
    { nombre: "Juan Pérez", email: "juan@example.com", edad: 30 },
    { nombre: "María López", email: "maria@example.com", edad: 25 },
    { nombre: "Carlos Gómez", email: "carlos@example.com", edad: 35 },
  ];

  const columns = [
    {
      name: "CÓDIGO",
      selector: (row) => row.edad,
      center: true,
      headerStyle: {
        backgroundColor: "#afdfda",
        fontWeight: "bold",
      },
    },
    {
      name: "NOMBRE",
      selector: (row) => row.nombre,
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "PRESENTACIÓN",
      selector: (row) => row.nombre,
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "CANTIDAD",
      selector: (row) => row.edad,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "STOCK",
      selector: (row) => row.edad,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "CATEGORÍA",
      selector: (row) => row.nombre,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "PRECIO U.",
      selector: (row) => `$${row.edad}`,
      center: true,
      headerStyle: {
        paddingRight: "0",
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
            onClick={() => setOpenModal({ ...openModal, editar: true })}
            className="bg-green-500 hover:bg-green-600 text-white border-none px-2 py-1 rounded cursor-pointer transition-colors"
          >
            <EditIcon fontSize="small" />
          </button>
          <button
            onClick={() => eliminarProducto(row.id)}
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
      <article className="container mx-auto py-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            LISTA DE PRODUCTOS
          </h2>
          <div className="flex gap-4">
            <Button
              startIcon={<AddIcon />}
              onClick={() => setOpenModal({ ...openModal, agregar: true })}
              variant="contained"
              sx={{
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

      {/* EDITAR PRODUCTO */}
      {openModal.editar ? (
        <Modal
          open={openModal.editar}
          onClose={() => setOpenModal({ ...openModal, editar: false })}
          className="flex items-center justify-center mx-6"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-130 relative">
            <IconButton
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
              }}
              onClick={() => setOpenModal(false)}
              aria-label="clear"
            >
              <ClearIcon />
            </IconButton>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-4">Editar Producto</h2>
              <div className="w-full flex flex-col gap-4">
                <TextField
                  name="nombre"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                />
                <TextField
                  name="presentacion"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Presentación"
                  variant="outlined"
                />
                <TextField
                  name="cantidad"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Cantidad"
                  variant="outlined"
                />
                <TextField
                  name="stock"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Stock"
                  variant="outlined"
                />
                <TextField
                  name="categoria"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Categoría"
                  variant="outlined"
                />
                <TextField
                  name="precio"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Precio unidad"
                  variant="outlined"
                />
                <TextField
                  name="descripcion"
                  onChange={handleChange}
                  label="Descripción"
                  multiline
                  // rows={3}
                  placeholder="Escribe algo..."
                  fullWidth
                />

                <Button
                  sx={{ backgroundColor: "#51b4c3", color: "#fff" }}
                  variant="text"
                >
                  Editar producto
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}

      {/* AGREGAR PRODUCTO */}
      {openModal.agregar ? (
        <Modal
          open={openModal.agregar}
          onClose={() => setOpenModal({ ...openModal, agregar: false })}
          className="flex items-center justify-center mx-6"
        >
          <div className="bg-white rounded-lg shadow-lg p-6 w-130 relative">
            <IconButton
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
              }}
              onClick={() => setOpenModal(false)}
              aria-label="clear"
            >
              <ClearIcon />
            </IconButton>
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-4">Agregar Producto</h2>

              <div className="w-full flex flex-col gap-4">
                <TextField
                  name="nombre"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                />
                <TextField
                  name="presentacion"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Presentación"
                  variant="outlined"
                />
                <TextField
                  name="cantidad"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Cantidad"
                  variant="outlined"
                />
                <TextField
                  name="stock"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Stock"
                  variant="outlined"
                />
                <TextField
                  name="categoria"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Categoría"
                  variant="outlined"
                />
                <TextField
                  name="precio"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Precio unidad"
                  variant="outlined"
                />
                <TextField
                  name="descripcion"
                  onChange={handleChange}
                  label="Descripción"
                  multiline
                  // rows={3}
                  placeholder="Escribe algo..."
                  fullWidth
                />

                <Button
                  sx={{ backgroundColor: "#51b4c3", color: "#fff" }}
                  variant="text"
                >
                  Agregar producto
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
