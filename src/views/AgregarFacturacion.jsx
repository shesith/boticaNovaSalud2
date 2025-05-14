import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import DataTable from "react-data-table-component";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AgregarFacturacion = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const data = [
    { nombre: "Juan Pérez", email: "juan@example.com", edad: 30 },
    { nombre: "María López", email: "maria@example.com", edad: 25 },
    { nombre: "Carlos Gómez", email: "carlos@example.com", edad: 35 },
  ];

  const columnsSelectProduct = [
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
      name: "STOCK",
      selector: (row) => row.edad,
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "PRECIO",
      selector: (row) => row.edad,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "ACCIÓN ",
      center: true,
      cell: (row) => (
        <button
          // onClick={() => setOpenModal({ ...openModal, editar: true })}
          className="bg-green-500 hover:bg-green-600 text-white border-none px-2 py-1 rounded cursor-pointer transition-colors"
        >
          <AddIcon fontSize="small" />
        </button>
      ),
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
  ];

  const columns = [
    {
      name: "CODIGO",
      selector: (row) => row.edad,
      center: true,
      headerStyle: {
        backgroundColor: "#afdfda",
        fontWeight: "bold",
      },
    },
    {
      name: "PRODUCTO",
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
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "PRECIO U.",
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
      <article className="container mx-auto py-6 bg-white p-4 rounded-2xl mb-4 shadow-md">
        <div className="ms-4">
          <h2 className="text-2xl font-bold text-[#7D7878] w-full">
            AÑADIR FACTURACIÓN
          </h2>
          <div className="border-b-3 border-[#eee8e8] my-4" />
        </div>

        {/* FORMULARIO */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full">
            <InputLabel sx={{ marginBottom: ".5rem" }} id="tipoVehiculo-label">
              Código
            </InputLabel>
            <TextField
              sx={{ width: "100%" }}
              id="outlined-basic"
              inputProps={{
                maxLength: 50,
              }}
              InputProps={{
                sx: {
                  borderRadius: "1.2rem",
                },
              }}
              variant="outlined"
            />
          </div>

          <div className="w-full">
            <InputLabel sx={{ marginBottom: ".5rem" }} id="tipoVehiculo-label">
              N° Documento
            </InputLabel>
            <TextField
              sx={{ width: "100%" }}
              InputProps={{
                sx: {
                  borderRadius: "1.2rem",
                },
              }}
              inputProps={{
                maxLength: 50,
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 my-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="w-full"
              label="Fecha"
              value={dayjs()}
              onChange={(newValue) => console.log(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <FormControl fullWidth>
            <InputLabel id="tipo-comprobante-label">
              Tipo comprobante
            </InputLabel>
            <Select
              sx={{ borderRadius: "1.2rem" }}
              labelId="tipo-comprobante-label"
              id="tipo-comprobante"
              label="Tipo comprobante"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="medio-pago-label">Medio de pago</InputLabel>
            <Select
              sx={{ borderRadius: "1.2rem" }}
              labelId="medio-pago-label"
              id="medio-pago"
              label="Medio de pago"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="w-full mb-4">
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            variant="contained"
            sx={{
              borderRadius: ".8rem",
              backgroundColor: "#51B4C3",
              "&:hover": {
                backgroundColor: "#3a9ca8",
              },
            }}
          >
            Agregar producto
          </Button>
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

        <div className="flex gap-2 w-full mb-4">
          <Button
            // onClick={() => navigate("agregar-facturacion")}
            variant="contained"
            sx={{
              borderRadius: ".8rem",
              backgroundColor: "#51B4C3",
              "&:hover": {
                backgroundColor: "#3a9ca8",
              },
            }}
          >
            Guardar
          </Button>
          <Button
            onClick={() => navigate("/facturacion")}
            variant="contained"
            sx={{
              borderRadius: ".8rem",
              backgroundColor: "#7b7676",
              "&:hover": {
                backgroundColor: "#969292",
              },
            }}
          >
            Cancelar
          </Button>
        </div>
      </article>

      {/* EDITAR PRODUCTO */}
      {openModal ? (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          className="flex items-center justify-center mx-6"
        >
          <div className="bg-white rounded-lg shadow-lg p-6  relative">
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
              <h2 className="text-2xl font-semibold mb-4">
                Seleccionar producto
              </h2>
              <DataTable
                columns={columnsSelectProduct}
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
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
};
