import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

const DashboardChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:5000/dashboard/datos-prediccion"
      );
      const data = await response.json();

      // Validación para evitar errores si la API no responde como se espera
      const historicos = Array.isArray(data.historicos) ? data.historicos : [];
      const futuros = Array.isArray(data.futuros) ? data.futuros : [];

      const mesesNombres = {
        1: "Enero",
        2: "Febrero",
        3: "Marzo",
        4: "Abril",
        5: "Mayo",
        6: "Junio",
        7: "Julio",
        8: "Agosto",
        9: "Septiembre",
        10: "Octubre",
        11: "Noviembre",
        12: "Diciembre",
      };

      const labels = [
        ...historicos.map((item) => mesesNombres[item.mes]),
        ...futuros.map((item) => mesesNombres[item.mes]),
      ];

      const historicosData = [
        ...historicos.map((item) => item.cantidad),
        ...Array(futuros.length).fill(null),
      ];
      const futurosData = [
        ...Array(historicos.length).fill(null),
        ...futuros.map((item) => item.cantidad),
      ];

      // Ahora ambos arrays tienen la misma longitud que labels
      setChartData({
        labels,
        datasets: [
          {
            label: "Datos históricos",
            data: historicosData,
            borderColor: "blue",
            backgroundColor: "blue",
            pointBackgroundColor: "blue",
            pointBorderColor: "blue",
            fill: false,
            tension: 0,
          },
          {
            label: "Predicción futura",
            data: futurosData,
            borderColor: "red",
            backgroundColor: "red",
            pointBackgroundColor: "red",
            pointBorderColor: "red",
            borderDash: [5, 5],
            fill: false,
            tension: 0,
          },
        ],
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3>Predicción de Solicitudes</h3>
      {chartData ? <Line data={chartData} /> : <p>Cargando datos...</p>}
    </div>
  );
};

export default DashboardChart;
