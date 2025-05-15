import { Button, IconButton, Modal, TextField } from "@mui/material";
import DataTable from "react-data-table-component";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { useLoader } from "../context/loaderContext";
import { services } from "../service/api";
import { Alert } from "../components/ui/Alert";
import { AlertSquareConfirm } from "../components/ui/AlertSquareConfirm";

export const ListaClientes = () => {
  const { showLoader, hideLoader } = useLoader();

  const [openModal, setOpenModal] = useState({
    editar: false,
    agregar: false,
  });
  const [dataClientesGet, setDataClientesGet] = useState([]);
  const [dataCliente, setDataCliente] = useState({
    codigo: "",
    nombre: "",
    nodocumento: "",
    celular: "",
    email: "",
  });

  const data = [
    { nombre: "Juan Pérez", email: "juan@example.com", edad: 30 },
    { nombre: "María López", email: "maria@example.com", edad: 25 },
    { nombre: "Carlos Gómez", email: "carlos@example.com", edad: 35 },
  ];

  const columns = [
    {
      name: "CÓDIGO",
      selector: (row) => row.id_cliente,
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
      name: "NO. DOCUMENTO",
      selector: (row) => row.documento,
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "CELULAR",
      selector: (row) => row.telefono,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
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
            onClick={() => editarClienteGetData(row.id_cliente)}
            className="bg-green-500 hover:bg-green-600 text-white border-none px-2 py-1 rounded cursor-pointer transition-colors"
          >
            <EditIcon fontSize="small" />
          </button>
          <button
            onClick={() => eliminarCliente(row.id_cliente)}
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataCliente({ ...dataCliente, [name]: value });
  };

  const getDataClientes = async () => {
    showLoader();
    const responseClientes = await services({
      method: "GET",
      service: "http://localhost:5000/clientes",
    });

    if (responseClientes.status === 200) {
      Alert("success", "Clientes obtenidos correctamente");
      setDataClientesGet(responseClientes.data);
    } else {
      Alert("error", "Error al obtener los clientes");
    }
    hideLoader();
  };

  const agregarCliente = async () => {
    const camposRequeridos = ["nombre", "nodocumento", "celular", "email"];

    const hayCamposVacios = camposRequeridos.some(
      (campo) => !dataCliente[campo]?.trim()
    );

    if (hayCamposVacios) {
      Alert("warning", "Todos los campos son obligatorios.");
      return;
    }

    showLoader();

    const bodyDataCliente = {
      nombre: dataCliente.nombre,
      documento: dataCliente.nodocumento,
      telefono: dataCliente.celular,
      email: dataCliente.email,
    };

    const response = await services({
      method: "POST",
      service: "http://localhost:5000/clientes",
      body: bodyDataCliente,
    });

    if (response.status === 200) {
      Alert("success", "Cliente agregaado");
      setOpenModal({ ...openModal, agregar: false });
      getDataClientes();
    } else {
      Alert("error", "Error al agregar el cliente");
    }
    hideLoader();
  };

  const editarClienteGetData = async (id) => {
    showLoader();

    const response = await services({
      method: "GET",
      service: `http://localhost:5000/clientes/${id}`,
    });

    if (response.status === 200) {
      setOpenModal({ ...openModal, editar: true });
      setDataCliente({
        codigo: response.data.id_cliente,
        nombre: response.data.nombre,
        nodocumento: response.data.documento,
        celular: response.data.telefono,
        email: response.data.email,
      });
    } else {
      Alert("error", "Error al obtener datos del cliente");
    }
    hideLoader();
  };

  const editarCliente = async () => {
    showLoader();

    const bodyDataCliente = {
      nombre: dataCliente.nombre,
      documento: dataCliente.nodocumento,
      telefono: dataCliente.celular,
      email: dataCliente.email,
    };

    const response = await services({
      method: "PUT",
      service: `http://localhost:5000/clientes/${dataCliente.codigo}`,
      body: bodyDataCliente,
    });

    if (response.status === 200) {
      Alert("success", "Cliente editado con éxito");
      setOpenModal({ ...openModal, editar: false });
      getDataClientes();
    } else {
      Alert("error", "Error al editar el cliente");
    }

    hideLoader();
  };

  const eliminarCliente = async (id) => {
    AlertSquareConfirm({
      icon: "warning",
      title: "Atención",
      text: "¿Estás seguro de que desea eliminar el cliente?",
      showDeny: true,
      confirmButtonText: "Eliminar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        showLoader();
        const response = await services({
          method: "DELETE",
          service: `http://localhost:5000/clientes/${id}`,
        });

        if (response.status === 200) {
          Alert("success", "Cliente eliminado con éxito");
          getDataClientes();
        } else {
          Alert("error", "Error al eliminar el cliente");
        }
        hideLoader();
      }
    });
  };

  useEffect(() => {
    function initialData() {
      getDataClientes();
    }
    initialData();
  }, []);

  return (
    <>
      <article className="container mx-auto py-6 bg-white p-4 rounded-2xl mb-4 shadow-md">
        <div className="ms-4">
          <h2 className="text-2xl font-bold text-[#7D7878] w-full">
            Lista Clientes
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
        </div>

        <DataTable
          columns={columns}
          data={dataClientesGet}
          noDataComponent={
            <div className="text-center py-6 text-gray-500 text-sm">
              No hay clientes disponibles.
            </div>
          }
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
              <h2 className="text-2xl font-semibold mb-4">Agregar cliente</h2>

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
                  name="nodocumento"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="No. documento"
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
                  name="celular"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Celular"
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
                  name="email"
                  onChange={handleChange}
                  label="Email"
                  multiline
                  // rows={3}
                  placeholder="Escribe algo..."
                  fullWidth
                />

                <Button
                  onClick={agregarCliente}
                  sx={{
                    backgroundColor: "#51b4c3",
                    color: "#fff",
                    borderRadius: "1.2rem",
                  }}
                  variant="text"
                >
                  Agregar cliente
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}

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
              <h2 className="text-2xl font-semibold mb-4">Editar cliente</h2>

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
                  value={dataCliente.nombre}
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
                  value={dataCliente.nodocumento}
                  name="nodocumento"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="No. documento"
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
                  value={dataCliente.celular}
                  name="celular"
                  onChange={handleChange}
                  fullWidth
                  id="outlined-basic"
                  label="Celular"
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
                  value={dataCliente.email}
                  name="email"
                  onChange={handleChange}
                  label="Email"
                  multiline
                  // rows={3}
                  placeholder="Escribe algo..."
                  fullWidth
                />

                <Button
                  onClick={editarCliente}
                  sx={{
                    backgroundColor: "#51b4c3",
                    color: "#fff",
                    borderRadius: "1.2rem",
                  }}
                  variant="text"
                >
                  Editar cliente
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
