import { useLoader } from "../../context/loaderContext";
import { getImageUrl } from "../../utils/getImageUrl";

export const Loader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#ffffffa6] bg-opacity-50 z-50">
      <div className="text-center">
        <img
          loading="lazy"
          src={getImageUrl("loader", "gif")}
          alt="Cargando..."
          className="w-30"
        />
      </div>
    </div>
  );
};
