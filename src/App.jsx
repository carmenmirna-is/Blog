import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Biblioteca from "./pages/Biblioteca";
import Blog from "./pages/Blog";
import Tecnologia from "./pages/Tecnologia";
import IngenieriaDeDatos from "./pages/IngenieriaDeDatos";
import Sociedad from "./pages/Sociedad";
import Investigacion from "./pages/Investigacion";
import ProyectoCafeteria from "./pages/ProyectoCafeteria";
import Playlist from "./pages/Playlist";
import Novelas from "./pages/Novelas";
import Poemas from "./pages/Poemas";
import MisPerros from "./pages/MisPerros";
import Diario from "./pages/Diario";
import SobreMi from "./pages/SobreMi";
import Contacto from "./pages/Contacto";
import Escribir from "./pages/Escribir";
import PostDetail from "./pages/PostDetail";
import EscribirPlaylist from "./pages/EscribirPlaylist";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/ingenieria-de-datos" element={<IngenieriaDeDatos />} />
        <Route path="/sociedad" element={<Sociedad />} />
        <Route path="/investigacion" element={<Investigacion />} />
        <Route path="/proyecto-cafeteria" element={<ProyectoCafeteria />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/novelas" element={<Novelas />} />
        <Route path="/poemas" element={<Poemas />} />
        <Route path="/mis-perros" element={<MisPerros />} />
        <Route path="/diario" element={<Diario />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/escribir" element={<Escribir />} />
        <Route path="/entrada/:id" element={<PostDetail />} />
        <Route path="/escribir-playlist" element={<EscribirPlaylist />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;