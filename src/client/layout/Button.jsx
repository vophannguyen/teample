export default function Botton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex w-fit justify-center gap-x-1.5 rounded-md  bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {children}
    </button>
  );
}
