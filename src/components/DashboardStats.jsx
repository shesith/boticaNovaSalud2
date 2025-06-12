import React, { useEffect, useState } from "react";

const DashboardStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/dashboard/estadisticas-tramites"
        );
        const data = await response.json();
        setStats(data);
      } catch (error) {
        setStats({ error: "No se pudieron cargar las estadísticas." });
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Cargando estadísticas...</div>;
  if (stats.error) return <div>{stats.error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-20 mt-8">
      <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md">
        <span className="text-2xl font-bold">{stats.total_tramites}</span>
        <span className="text-[#7D7878]">Total Trámites</span>
      </div>
      <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md">
        <span className="text-2xl font-bold">{stats.aprobados}</span>
        <span className="text-[#7D7878]">Aprobados</span>
      </div>
      <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md">
        <span className="text-2xl font-bold">{stats.pendientes}</span>
        <span className="text-[#7D7878]">Pendientes</span>
      </div>
      <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md">
        <span className="text-2xl font-bold">{stats.rechazados}</span>
        <span className="text-[#7D7878]">Rechazados</span>
      </div>
    </div>
  );
};

export default DashboardStats;
