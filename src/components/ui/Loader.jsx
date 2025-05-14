import { useLoader } from "../../context/loaderContext";

export const Loader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80">
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ "--i": i }} className="slider"></div>
        ))}
      </div>
    </div>
  );
};
