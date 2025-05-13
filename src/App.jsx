import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { HomeAdmin } from "./views/HomeAdmin";
import { ListaProductos } from "./views/ListaProductos";
import { RenderPrincipal } from "./components/RenderPrincipal";

function App() {
  return (
    <>
      <RenderPrincipal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route path="/lista-productos" element={<ListaProductos />} />
      </Routes>
    </>
  );
}

export default App;
