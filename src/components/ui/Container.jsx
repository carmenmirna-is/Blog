/**
 * Container — controla el ancho máximo y el padding horizontal
 * de forma consistente en todo el sitio.
 */
export default function Container({ as: Component = "div", className = "", children }) {
  return (
    <Component className={`mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </Component>
  );
}
