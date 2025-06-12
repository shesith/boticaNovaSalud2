import { useEffect, useState } from "react";
import { services } from "../service/api";
import { useLoader } from "../context/loaderContext";
import { Alert } from "../components/ui/Alert";
import { getCredentials } from "../utils/CredentialsLocalStorage";

export const ReportesAnalisis = () => {
  const { showLoader, hideLoader } = useLoader();
  const [data, setData] = useState([]);

  const getHistorialSolicitudes = async () => {
    showLoader();
    const response = await services({
      method: "GET",
      service: `http://localhost:5000/`,
    });

    if (response.status === 200) {
      setData(response.data);
    } else {
      Alert("error", "Error al obtener los datos");
    }
    hideLoader();
  };

  useEffect(() => {
    getHistorialSolicitudes();
  }, []);

  return (
    <article className="container mx-auto py-6 bg-white p-4 rounded-2xl mb-4 shadow-md">
      <div className="ms-4">
        <h2 className="text-2xl font-bold text-[#7D7878] w-full">
          Reportes y análisis
        </h2>
        <div className="border-b-2 border-[#eee8e8] my-4" />
      </div>
    </article>
  );
};
