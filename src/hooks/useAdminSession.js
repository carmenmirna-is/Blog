import { useEffect, useState } from "react";
import { isAdminAuthorized } from "../lib/adminAuth";

/**
 * Hook simple que expone si la sesión actual del navegador ya pasó
 * por la contraseña del Panel (ver lib/adminAuth.js). Se usa en
 * cualquier página pública donde, si eres tú, quieras ver controles
 * extra (como el botón de eliminar en Playlist).
 */
export function useAdminSession() {
  const [isAdmin, setIsAdmin] = useState(isAdminAuthorized());

  useEffect(() => {
    // Por si el usuario entra al Panel en otra pestaña mientras esta
    // sigue abierta, revisamos de nuevo al reenfocar la ventana.
    const recheck = () => setIsAdmin(isAdminAuthorized());
    window.addEventListener("focus", recheck);
    return () => window.removeEventListener("focus", recheck);
  }, []);

  return { isAdmin };
}