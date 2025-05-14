import { useLoader } from "../../context/loaderContext";

export const Loader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80">
      <svg
        class="loader"
        viewBox="0 0 384 384"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="active"
          pathLength="360"
          fill="transparent"
          stroke-width="32"
          cx="192"
          cy="192"
          r="176"
        ></circle>
        <circle
          class="track"
          pathLength="360"
          fill="transparent"
          stroke-width="32"
          cx="192"
          cy="192"
          r="176"
        ></circle>
      </svg>
    </div>
  );
};
