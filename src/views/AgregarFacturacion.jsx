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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/loaderContext";
import { services } from "../service/api";
import { Alert } from "../components/ui/Alert";

export const AgregarFacturacion = () => {
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [dataClientesGet, setDataClientesGet] = useState([]);
  const [dataMedioPago, setDataMedioPago] = useState([]);
  const [dataComprobante, setDataComprobante] = useState([]);
  const [dataProductos, setDataProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [dataFacturacion, setDataFacturacion] = useState({
    cliente: "",
    noDocumento: "",
    fecha: "",
    tipoComprobante: "",
    medioPago: "",
  });

  const data = [
    { nombre: "Juan Pérez", email: "juan@example.com", edad: 30 },
    { nombre: "María López", email: "maria@example.com", edad: 25 },
    { nombre: "Carlos Gómez", email: "carlos@example.com", edad: 35 },
  ];

  const columnsSelectProduct = [
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
      name: "STOCK",
      selector: (row) => row.stock,
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "PRECIO",
      selector: (row) => row.precio,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "ACCIÓN",
      center: true,
      cell: (row) => (
        <button
          onClick={() => handleAgregarProducto(row)}
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

  const handleAgregarProducto = (producto) => {
    // Agrega a la lista seleccionada (si no existe ya)
    const yaExiste = productosSeleccionados.some(
      (item) => item.id_producto === producto.id_producto
    );

    if (!yaExiste) {
      setProductosSeleccionados((prev) => [...prev, producto]);

      // Quita temporalmente el producto de la lista visible
      setDataProductos((prev) =>
        prev.filter((item) => item.id_producto !== producto.id_producto)
      );
    }
  };

  const columns = [
    {
      name: "CODIGO",
      selector: (row) => row.id_producto,
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
      cell: (row, index) => (
        <input
          type="number"
          min="1"
          value={row.cantidad || ""}
          onChange={(e) => handleCantidadChange(index, e.target.value)}
          className="border rounded px-2 py-1 w-20 text-center"
        />
      ),
      center: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "PRECIO U.",
      selector: (row) => row.precio,
      center: true,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      name: "TOTAL VENTA",
      center: true,
      sortable: false,
      cell: (row) => {
        const cantidad = Number(row.cantidad) || 0;
        const precio = Number(row.precio) || 0;
        const total = cantidad * precio;

        return <span>${total.toFixed(2)}</span>;
      },
      headerStyle: {
        fontWeight: "bold",
        backgroundColor: "#f8f9fa",
      },
    },
  ];

  const handleCantidadChange = (index, nuevaCantidad) => {
    const actualizados = [...productosSeleccionados];
    actualizados[index].cantidad = Number(nuevaCantidad); // actualiza cantidad
    setProductosSeleccionados(actualizados); // o setDataProductos si es otro nombre
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cliente") {
      const clienteSeleccionado = dataClientesGet.find(
        (cliente) => cliente.id_cliente === value
      );

      setDataFacturacion({
        ...dataFacturacion,
        cliente: value,
        noDocumento: clienteSeleccionado?.documento || "",
      });
    } else if (name === "medioPago") {
      const medioSeleccionado = dataMedioPago.find(
        (medio) => medio.id_medio_pago === value
      );

      setDataFacturacion({
        ...dataFacturacion,
        medioPago: value,
        nombreMedioPago: medioSeleccionado?.nombre || "",
      });
    } else if (name === "tipoComprobante") {
      const comprobanteSeleccionado = dataComprobante.find(
        (comprobante) => comprobante.id_tipo_comprobante === value
      );

      setDataFacturacion({
        ...dataFacturacion,
        tipoComprobante: value,
        nombreComprobante: comprobanteSeleccionado?.nombre || "",
      });
    } else {
      setDataFacturacion({ ...dataFacturacion, [name]: value });
    }
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

  const getMediopago = async () => {
    showLoader();
    const response = await services({
      method: "GET",
      service: "http://localhost:5000/medio-pago",
    });

    if (response.status === 200) {
      Alert("success", "Clientes obtenidos correctamente");
      setDataMedioPago(response.data);
    } else {
      Alert("error", "Error al obtener los clientes");
    }
    hideLoader();
  };

  const getTipoComprobante = async () => {
    showLoader();
    const response = await services({
      method: "GET",
      service: "http://localhost:5000/documentos",
    });

    if (response.status === 200) {
      Alert("success", "Clientes obtenidos correctamente");
      setDataComprobante(response.data);
    } else {
      Alert("error", "Error al obtener los clientes");
    }
    hideLoader();
  };

  const getDataProducto = async () => {
    showLoader();
    const response = await services({
      method: "GET",
      service: "http://localhost:5000/productos",
    });

    if (response.status === 200) {
      Alert("success", "Productos obtenidos correctamente");
      setDataProductos(response.data);
      setOpenModal(true);
    } else {
      Alert("error", "Error al obtener los clientes");
    }
    hideLoader();
  };

  useEffect(() => {
    function initialData() {
      getDataClientes();
      getMediopago();
      getTipoComprobante();
    }
    initialData();
  }, []);

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
            <InputLabel sx={{ marginBottom: ".5rem" }} id="cliente-label">
              Cliente
            </InputLabel>
            <FormControl fullWidth>
              <Select
                sx={{ borderRadius: "1.2rem" }}
                labelId="cliente-label"
                name="cliente"
                id="cliente"
                value={dataFacturacion.cliente || ""}
                onChange={handleChange}
              >
                {Array.isArray(dataClientesGet) &&
                dataClientesGet.length > 0 ? (
                  dataClientesGet.map((item, index) => (
                    <MenuItem key={index} value={item?.id_cliente}>
                      {item?.nombre}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No hay clientes disponibles</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>

          <div className="w-full">
            <InputLabel sx={{ marginBottom: ".5rem" }} id="tipoVehiculo-label">
              N° Documento
            </InputLabel>
            <TextField
              disabled
              value={dataFacturacion.noDocumento}
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

          <div className="w-full">
            <InputLabel
              sx={{ marginBottom: ".5rem" }}
              id="tipo-comprobante-label"
            >
              Tipo comprobante
            </InputLabel>
            <FormControl fullWidth>
              <Select
                sx={{ borderRadius: "1.2rem" }}
                labelId="tipo-comprobante-label"
                id="tipo-comprobante"
                name="tipoComprobante"
                value={dataFacturacion.tipoComprobante || ""}
                onChange={handleChange}
              >
                {Array.isArray(dataComprobante) &&
                dataComprobante.length > 0 ? (
                  dataComprobante.map((item, index) => (
                    <MenuItem key={index} value={item?.id_doc}>
                      {item?.nombre}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No hay clientes disponibles</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>

          <div className="w-full">
            <InputLabel sx={{ marginBottom: ".5rem" }} id="medioPago-label">
              Medio de pago
            </InputLabel>
            <FormControl fullWidth>
              <Select
                sx={{ borderRadius: "1.2rem" }}
                labelId="medioPago-label"
                name="medioPago"
                id="medioPago"
                value={dataFacturacion.medioPago || ""}
                onChange={handleChange}
              >
                {Array.isArray(dataMedioPago) && dataMedioPago.length > 0 ? (
                  dataMedioPago.map((item, index) => (
                    <MenuItem key={index} value={item?.id_medio_pago}>
                      {item?.nombre}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No hay clientes disponibles</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="w-full mb-4">
          <Button
            startIcon={<AddIcon />}
            onClick={() => getDataProducto()}
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
          data={productosSeleccionados}
          noDataComponent={
            <div className="text-center py-6 text-gray-500 text-sm ">
              No hay productos disponibles.
            </div>
          }
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

        <div className="flex gap-2 w-full my-4">
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
          <div className="bg-white rounded-lg shadow-lg p-6 relative">
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
              <h2 className="text-2xl font-semibold mb-4">Productos</h2>
              <DataTable
                columns={columnsSelectProduct}
                data={dataProductos}
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
