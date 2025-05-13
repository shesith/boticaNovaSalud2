export const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center py-16 h-screen">
      <h2 className="text-8xl">404</h2>
      <h2 className="text-5xl">La página que buscas no existe</h2>
      <a
        href="/"
        className="flex justify-center items-center gap-1 my-4 bg-[#51B4C3] text-white p-3 w-50 text-center rounded-md text-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
        Volver
      </a>
    </div>
  );
};
