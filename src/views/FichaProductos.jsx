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

export const FichaProductos = () => {
  const [dataForm, setDataForm] = useState({
    productos: "",
    codigo: "",
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    stock: "",
  });
  const [image, setImage] = useState(null);

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

  const handleChange = (e) => {};

  const getDataProductos = async () => {};

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
              // value={age}
              label="Productos"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <button className="bg-[#51b4c3] p-4 rounded-xl text-white cursor-pointer">
            Seleccionar
          </button>
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
              value={dataForm?.codigo}
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
              value={dataForm?.nombre}
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
              value={dataForm?.descripcion}
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
              value={dataForm?.precio}
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
              value={dataForm?.categoria}
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
              value={dataForm?.stock}
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
      <div className="bg-white p-8 rounded-xl shadow-md">
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
              <label className="cursor-pointer text-sm text-gray-500 hover:text-purple-500">
                Abrir explorador de archivos
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <div className="rounded-xl bg-gray-200 p-2">
                <SaveAltIcon />
              </div>
              <p className="text-gray-400">
                Arrastrar y soltar la imagen aquí.
              </p>
            </div>

            {image && (
              <div className="flex justify-center pt-4">
                <div className="relative group w-64 h-64">
                  <img
                    src={image.url}
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
            )}

            <button className="mt-4 px-6 py-2 bg-[#51B4C3] text-white rounded-xl hover:bg-purple-700">
              Guardar imagen
            </button>
          </div>

          <div className="flex justify-end pt-6">
            <button className="px-6 py-2 bg-[#51B4C3] rounded-xl text-white hover:bg-purple-700">
              Guardar Detalles del Producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
