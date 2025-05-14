import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { AlertSquareConfirm } from "../components/ui/AlertSquareConfirm";
import { useLoader } from "../context/loaderContext";
import { services } from "../service/api";
import { Alert } from "../components/ui/Alert";

export const ListaProductos = () => {
  const { showLoader, hideLoader } = useLoader();
  const [dataCategorias, setDataCategorias] = useState([]);
  const [dataProductos, setDataProductos] = useState([]);
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

  const agregarProducto = async () => {
    showLoader();

    const bodyDataProducto = {
      nombre: dataProducto.nombre,
      idCategoria: dataProducto.categoria,
      presentacion: dataProducto.presentacion,
      cantidad: dataProducto.cantidad,
      descripcion: dataProducto.descripcion,
      precio: dataProducto.precio,
      stock: dataProducto.stock,
    };

    const response = await services({
      method: "POST",
      service: "http://localhost:5000/productos",
      body: bodyDataProducto,
    });

    if (response.status === 200) {
      Alert("success", "Producto agregaado");
    } else {
      Alert("error", "Error al agregar el producto");
    }
    hideLoader();
  };

  const getDataCategorias = async () => {
    const responseCategorias = await services({
      method: "GET",
      service: "http://localhost:5000/categorias",
    });

    if (responseCategorias.status === 200) {
      setDataCategorias(responseCategorias.data);
    } else {
      Alert("error", "Error al obtener las categorías");
    }
  };

  const getDataProductos = async () => {
    showLoader();
    const responseProductos = await services({
      method: "GET",
      service: "http://localhost:5000/productos",
    });

    if (responseProductos.status === 200) {
      Alert("success", "Productos obtenidos");
      setDataProductos(responseProductos.data);
    } else {
      Alert("error", "Error al obtener los productos");
    }
    hideLoader();
  };

  const editarProducto = async (id) => {
    setOpenModal({ ...openModal, editar: true });

    const responseGetproduct = await services({
      method: "GET",
      service: `http://localhost:5000/producto/${id}`,
    });

    if (responseGetproduct.status === 200) {
      setDataProducto({
        id_producto: responseGetproduct.data.id_producto,
        nombre: responseGetproduct.data.nombre,
        presentacion: responseGetproduct.data.presentacion,
        cantidad: responseGetproduct.data.cantidad,
        stock: responseGetproduct.data.stock,
        categoria: responseGetproduct.data.idCategoria,
        precio: responseGetproduct.data.precio,
        descripcion: responseGetproduct.data.descripcion,
      });
    }
  };

  const columns = [
    {
      name: "CÓDIGO",
      selector: (row) => row.id_producto,
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
      selector: (row) => row.descripcion,
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "CANTIDAD",
      selector: (row) => row.cantidad,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "STOCK",
      selector: (row) => row.stock,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "CATEGORÍA",
      selector: (row) => row.idCategoria,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "PRECIO U.",
      selector: (row) => `$${row.precio}`,
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
            onClick={() => {
              editarProducto(row.id_producto);
            }}
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

  useEffect(() => {
    function initialData() {
      getDataCategorias();
      getDataProductos();
    }
    initialData();
  }, []);

  return (
    <>
      <article className="container mx-auto py-6 bg-white p-4 rounded-2xl mb-4 shadow-md">
        <div className="ms-4">
          <h2 className="text-2xl font-bold text-[#7D7878] w-full">
            LISTA DE PRODUCTOS
          </h2>
          <div className="border-b-3 border-[#eee8e8] my-4" />
        </div>
        <div className="flex justify-end gap-4 my-4">
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
            onClick={() => setOpenModal({ ...openModal, agregar: true })}
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

        <DataTable
          columns={columns}
          data={dataProductos}
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
                  value={dataProducto?.nombre}
                  fullWidth
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                />
                <TextField
                  name="presentacion"
                  onChange={handleChange}
                  value={dataProducto?.presentacion}
                  fullWidth
                  id="outlined-basic"
                  label="Presentación"
                  variant="outlined"
                />
                <TextField
                  name="cantidad"
                  value={dataProducto?.cantidad}
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Cantidad"
                  variant="outlined"
                />
                <TextField
                  name="stock"
                  onChange={handleChange}
                  value={dataProducto?.stock}
                  fullWidth
                  id="outlined-basic"
                  label="Stock"
                  variant="outlined"
                />
                <TextField
                  name="categoria"
                  value={dataProducto?.categoria}
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Categoría"
                  variant="outlined"
                />
                <TextField
                  name="precio"
                  value={dataProducto?.precio}
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Precio unidad"
                  variant="outlined"
                />
                <TextField
                  name="descripcion"
                  value={dataProducto?.descripcion}
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
                  InputProps={{
                    sx: {
                      borderRadius: "1.2rem",
                    },
                  }}
                  inputProps={{
                    maxLength: 50,
                  }}
                  name="nombre"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                />
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: "1.2rem",
                    },
                  }}
                  inputProps={{
                    maxLength: 50,
                  }}
                  name="presentacion"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Presentación"
                  variant="outlined"
                />
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: "1.2rem",
                    },
                  }}
                  inputProps={{
                    maxLength: 10,
                  }}
                  name="cantidad"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Cantidad"
                  variant="outlined"
                />
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: "1.2rem",
                    },
                  }}
                  inputProps={{
                    maxLength: 10,
                  }}
                  name="stock"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Stock"
                  variant="outlined"
                />

                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Categorías
                  </InputLabel>
                  <Select
                    sx={{ borderRadius: "1.2rem" }}
                    labelId="demo-simple-select-label"
                    name="categoria"
                    id="demo-simple-select-label"
                    value={dataProducto.categoria}
                    label="Productos"
                    onChange={handleChange}
                  >
                    {Array.isArray(dataCategorias) &&
                    dataCategorias.length > 0 ? (
                      dataCategorias.map((item, index) => (
                        <MenuItem key={index} value={item.id_categoria}>
                          {item.nombre || "Sin nombre"}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>
                        No hay categorías disponibles
                      </MenuItem>
                    )}
                  </Select>
                </FormControl>

                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: "1.2rem",
                    },
                  }}
                  inputProps={{
                    maxLength: 10,
                  }}
                  name="precio"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Precio unidad"
                  variant="outlined"
                />
                <TextField
                  InputProps={{
                    sx: {
                      borderRadius: "1.2rem",
                    },
                  }}
                  inputProps={{
                    maxLength: 265,
                  }}
                  name="descripcion"
                  onChange={handleChange}
                  label="Descripción"
                  multiline
                  placeholder="Escribe algo..."
                  fullWidth
                />

                <Button
                  onClick={agregarProducto}
                  sx={{
                    backgroundColor: "#51b4c3",
                    color: "#fff",
                    borderRadius: "1.2rem",
                  }}
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
