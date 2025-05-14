import { getImageUrl } from "../utils/getImageUrl";
import AddIcon from "@mui/icons-material/Add";
import { LineChart } from "@mui/x-charts/LineChart";

export const HomeAdmin = () => {
  return (
    <article className="mb-8">
      <div className="grid md:grid-cols-5 gap-4 mb-4">
        <div className="flex flex-col gap-4 col-span-4 md:col-span-1">
          <div className="bg-white p-6 h-full rounded-2xl shadow-md text-[#7D7878] ">
            <p>Órdenes</p>
            <span className="font-bold">2,76k</span>
          </div>
          <div className="bg-white p-6 h-full rounded-2xl shadow-md text-[#7D7878] ">
            <p>Beneficios</p>
            <span className="font-bold">6,24k</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl col-span-4 shadow-md md:flex lg:items-center lg:justify-evenly relative">
          <p className="text-[#7D7878] text-lg text-center md:text-left mb-6 md:mb-0 absolute top-4 left-4">
            Estadísticas
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-20 mt-8">
            <div className="flex items-center gap-4">
              <img
                className="w-20"
                src={getImageUrl("icon-ventas", "png")}
                alt="Icono ventas"
              />
              <p className="text-[#7D7878]">
                <span className="text-lg">230K</span> <br /> Ventas
              </p>
            </div>

            <div className="flex items-center gap-4">
              <img
                className="w-20"
                src={getImageUrl("icon-clientes", "png")}
                alt="Icono clientes"
              />
              <p className="text-[#7D7878]">
                <span className="text-lg">8.549k</span> <br /> Clientes
              </p>
            </div>

            <div className="flex items-center gap-4">
              <img
                className="w-20"
                src={getImageUrl("icon-productos", "png")}
                alt="Icono productos"
              />
              <p className="text-[#7D7878]">
                <span className="text-lg">1.423k</span> <br /> Productos
              </p>
            </div>

            <div className="flex items-center gap-4">
              <img
                className="w-20"
                src={getImageUrl("icon-ingresos", "png")}
                alt="Icono ingresos"
              />
              <p className="text-[#7D7878]">
                <span className="text-lg">$9745</span> <br /> Ingresos
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full bg-white p-6 rounded-2xl shadow-md">
          <p>Ventas</p>

          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={300}
          />
        </div>

        <div className="relative md:w-fit h-64 rounded-lg overflow-hidden cursor-pointer group shadow-md">
          <img
            src={getImageUrl("add-image", "jpg")}
            alt="Imagen de fondo"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-[#51b4c344] opacity-50"></div>
          <input
            type="file"
            id="fileUpload"
            className="absolute inset-0 opacity-0 z-10 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files[0];
              console.log("Archivo seleccionado:", file);
            }}
          />

          <label
            htmlFor="fileUpload"
            className="absolute inset-0 m-auto bg-[#51b4c3] rounded-full p-3 text-white w-14 h-14 flex items-center justify-center z-0"
          >
            <AddIcon sx={{ fontSize: "3rem" }} />
          </label>
        </div>
      </div>
    </article>
  );
};
