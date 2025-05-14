import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { HomeAdmin } from "./views/HomeAdmin";
import { ListaProductos } from "./views/ListaProductos";
import { RenderPrincipal } from "./components/RenderPrincipal";
import { NotFound } from "./views/NotFound";
import { Login } from "./components/Login";
import { useEffect } from "react";
import { LoaderProvider } from "./context/loaderContext";
import { Loader } from "./components/ui/Loader";
import { FichaProductos } from "./views/FichaProductos";
import Chatbot from "./components/Chatbot";

function App() {
  const isAuthenticated = () => {
    return !!localStorage.getItem("access_granted");
  };

  const PrivateRoute = () => {
    if (!localStorage.getItem("access_granted")) {
      localStorage.setItem("access_granted", "false");
    }

    const isAuthorized = localStorage.getItem("access_granted") === "true";
    return isAuthorized ? <Outlet /> : <Navigate to="/" />;
  };

  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  function PrivateRouteWithLayout() {
    const isAuthorized = localStorage.getItem("access_granted") === "true";
    return isAuthorized ? (
      <RenderPrincipal>
        <Outlet />
      </RenderPrincipal>
    ) : (
      <Navigate to="/" />
    );
  }

  useEffect(() => {
    if (location.pathname === "/") {
      const access = localStorage.getItem("access_granted");
      if (!access || access === "false") {
        localStorage.clear();
      }
    }
  }, [location.pathname]);

  return (
    <>
      <LoaderProvider>
        {/* {isAuthenticated() && !isLoginPage && <RenderPrincipal />} */}
        <Loader />
        <Chatbot />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRouteWithLayout />}>
            <Route path="/home-admin" element={<HomeAdmin />} />
            <Route path="/lista-productos" element={<ListaProductos />} />
            <Route path="/ficha-productos" element={<FichaProductos />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LoaderProvider>
    </>
  );
}

export default App;
