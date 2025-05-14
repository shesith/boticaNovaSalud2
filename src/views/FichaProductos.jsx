import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

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

  const handleChange = (e) => {};

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
    </div>
  );
};
