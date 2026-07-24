import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * Expone si hay una sesión real de Supabase Auth activa (el mismo
 * sistema que usa Panel.jsx con correo + contraseña). A diferencia
 * de la versión anterior (que miraba sessionStorage), esta consulta
 * la sesión de verdad y se actualiza sola en cuanto el usuario
 * inicia o cierra sesión, sin depender de recargar la página.
 */
export function useAdminSession() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Revisa si ya hay una sesión activa al cargar el componente
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setIsAdmin(!!session);
        setLoading(false);
      }
    });

    // Se suscribe a cambios de sesión (login/logout) en tiempo real,
    // así cualquier página que use este hook se entera al instante
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, loading };
}x