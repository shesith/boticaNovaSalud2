import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useLoader } from "../context/loaderContext";
import { Alert } from "../components/ui/Alert";
import { services } from "../service/api";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

export const FichaProductos = () => {
  const { showLoader, hideLoader } = useLoader();
  const [dataProductos, setDataProductos] = useState([]);
  const [dataProducto, setDataProducto] = useState({
    productoId: "",
    idProductoSelected: "",
    codigo: "",
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    stock: "",
    ingredientes: "",
    modoUso: "",
    fechaVencimiento: "",
    imagen: "",
  });
  const [image, setImage] = useState(null);

  const categorias = {
    1: "Antibiótico",
    2: "Analgesico",
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage({
        file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage({
        file,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleRemove = () => {
    setImage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "idProductoSelected") {
      setDataProducto({ ...dataProducto, [name]: value });
      obtenerDataProducto(value);
    } else {
      setDataProducto({ ...dataProducto, [name]: value });
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

  const obtenerDataProducto = async (id) => {
    showLoader();

    setDataProducto({
      ...dataProducto,
      ingredientes: "",
      modoUso: "",
      fechaVencimiento: "",
    });

    const responseGetproduct = await services({
      method: "GET",
      service: `http://localhost:5000/producto-detalles/${id}`,
    });

    if (responseGetproduct.status === 200) {
      setDataProducto({
        productoId: responseGetproduct.data.id_producto,
        nombre: responseGetproduct.data.nombre,
        codigo: responseGetproduct.data.id_producto,
        precio: responseGetproduct.data.precio,
        descripcion: responseGetproduct.data.descripcion,
        categoria: responseGetproduct.data.idCategoria,
        stock: responseGetproduct.data.stock,
        ingredientes: responseGetproduct.data.ingredientes,
        modoUso: responseGetproduct.data.modo_uso,
        fechaVencimiento: responseGetproduct.data.fecha_vencimiento,
        imagen: responseGetproduct.data.imagen,
      });
    } else {
      Alert("error", "Error al obtener el producto");
    }
    hideLoader();
  };

  const guardarDetalles = async () => {
    showLoader();

    let typeMethod = "POST";
    if (
      dataProducto.ingredientes &&
      dataProducto.modoUso &&
      dataProducto.fechaVencimiento
    ) {
      typeMethod = "PUT";
    }

    console.log(dataProducto);
    console.log(typeMethod);

    const formData = new FormData();
    formData.append("id_producto", dataProducto.productoId);
    formData.append("ingredientes", dataProducto.ingredientes || "");
    formData.append("modo_uso", dataProducto.modoUso || "");
    formData.append("fecha_vencimiento", dataProducto.fechaVencimiento || "");

    if (image?.file) {
      formData.append("imagen", image.file);
    }

    console.log(formData);
    console.log(typeMethod);
    console.log(dataProducto);

    const response = await services({
      method: typeMethod,
      service: `http://localhost:5000/producto/detalles/${dataProducto.productoId}`,
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      Alert("success", "Detalles guardados");
      getDataProductos();
    } else {
      Alert("error", "Error al guardar los detalles");
    }

    hideLoader();
  };

  useEffect(() => {
    function initialData() {
      getDataProductos();
    }
    initialData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-lg mb-2 font-bold text-[#7D7878]">Productos</h3>
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Productos</InputLabel>
            <Select
              sx={{ borderRadius: "1.2rem" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              name="idProductoSelected"
              value={dataProducto.productoId}
              label="Productos"
              onChange={handleChange}
            >
              {Array.isArray(dataProductos) && dataProductos.length > 0 ? (
                dataProductos.map((item, index) => (
                  <MenuItem key={index} value={item?.id_producto}>
                    {item?.nombre || "Sin nombre"}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No hay productos disponibles</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* <button className="bg-[#51b4c3] p-4 rounded-xl text-white cursor-pointer">
            Seleccionar
          </button> */}
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl my-4 shadow-md">
        <h3 className="text-lg mb-2 font-bold text-[#7D7878]">Producto</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full">
            <InputLabel sx={{ marginBottom: ".5rem" }} id="tipoVehiculo-label">
              Código
            </InputLabel>
            <TextField
              disabled
              value={dataProducto?.codigo}
              sx={{ width: "100%" }}
              id="outlined-basic"
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
              Nombre
            </InputLabel>
            <TextField
              disabled
              value={dataProducto?.nombre}
              sx={{ width: "100%" }}
              InputProps={{
                sx: {
                  borderRadius: "1.2rem",
                },
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 my-4">
          <div className="w-full">
            <InputLabel sx={{ marginBottom: ".5rem" }} id="tipoVehiculo-label">
              Descripción
            </InputLabel>
            <TextField
              disabled
              value={dataProducto?.descripcion}
              sx={{ width: "100%" }}
              InputProps={{
                sx: {
                  borderRadius: "1.2rem",
                },
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          <div className="w-full">
            <InputLabel sx={{ marginBottom: ".5rem" }} id="tipoVehiculo-label">
              Precio
            </InputLabel>
            <TextField
              disabled
              value={dataProducto?.precio}
              sx={{ width: "100%" }}
              InputProps={{
                sx: {
                  borderRadius: "1.2rem",
                },
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </div>
        </div>

        <h3 className="text-lg mb-2 font-bold text-[#7D7878]">Inventario</h3>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full">
            <InputLabel sx={{ marginBottom: ".5rem" }} id="tipoVehiculo-label">
              Categoría
            </InputLabel>
            <TextField
              value={categorias[dataProducto?.categoria]}
              disabled
              sx={{ width: "100%" }}
              InputProps={{
                sx: {
                  borderRadius: "1.2rem",
                },
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          <div className="w-full">
            <InputLabel sx={{ marginBottom: ".5rem" }} id="tipoVehiculo-label">
              Stock
            </InputLabel>
            <TextField
              value={dataProducto?.stock}
              disabled
              sx={{ width: "100%" }}
              InputProps={{
                sx: {
                  borderRadius: "1.2rem",
                },
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </div>
        </div>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md mb-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="w-full">
            <InputLabel sx={{ marginBottom: ".5rem" }} id="tipoVehiculo-label">
              Ingredientes
            </InputLabel>
            <TextField
              name="ingredientes"
              onChange={handleChange}
              value={dataProducto?.ingredientes}
              sx={{ width: "100%" }}
              InputProps={{
                sx: {
                  borderRadius: "1.2rem",
                },
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </div>
          <div className="w-full">
            <InputLabel sx={{ marginBottom: ".5rem" }} id="tipoVehiculo-label">
              Modo de uso
            </InputLabel>
            <TextField
              name="modoUso"
              onChange={handleChange}
              value={dataProducto?.modoUso}
              sx={{ width: "100%" }}
              InputProps={{
                sx: {
                  borderRadius: "1.2rem",
                },
              }}
              id="outlined-basic"
              variant="outlined"
            />
          </div>
        </div>
        <div className="mt-4">
          <InputLabel sx={{ marginBottom: ".5rem" }} id="cliente-label">
            Fecha
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="w-full md:w-auto"
              value={dayjs(dataProducto?.fechaVencimiento)}
              onChange={(newValue) => {
                setDataProducto({
                  ...dataProducto,
                  fechaVencimiento: newValue.format("YYYY-MM-DD"),
                });
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>

        <div className="p-8 space-y-8">
          <h2 className="text-lg font-semibold text-gray-700">Imágenes</h2>

          <h3 className="text-xl font-semibold text-gray-700 text-center">
            Cargar imágenes
          </h3>

          <div
            className="border-2 border-dashed border-[#51B4C3] rounded-lg p-6 text-center space-y-4"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <label className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Abrir explorador de archivos
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <p className="text-gray-400">
                Arrastrar y soltar la imagen aquí.
              </p>
            </div>

            {image || dataProducto.imagen ? (
              <div className="flex justify-center pt-4">
                <div className="relative group w-64 h-64">
                  <img
                    src={dataProducto.imagen ? dataProducto.imagen : image.url}
                    alt="preview"
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                  <button
                    onClick={handleRemove}
                    className="absolute cursor-pointer top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    X
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={guardarDetalles}
              className="px-6 py-2 bg-[#51B4C3] rounded-xl text-white hover:bg-[#689299] cursor-pointer"
            >
              Guardar Detalles del Producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
