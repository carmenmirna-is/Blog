export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-forest px-6 py-3 font-body font-semibold text-cream transition-transform duration-300 hover:scale-105"
    >
      {children}
    </button>
  );
}