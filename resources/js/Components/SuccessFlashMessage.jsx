export default function SuccessFlashMessage({ message }) {
  const handleCloseSuccessMessage = () => {
    const el = document.getElementById("success_message");
    if (el) {
      // Clear any pending timeout to avoid conflicts
      clearTimeout(el.timeout);
      el.classList.add("opacity-0");
      setTimeout(() => {
        el.style.display = "none";
      }, 500);
    }
  };

  return (
    <>
      <div
        id="success_message"
        className="bg-green-300 border border-green-700 text-green-700 px-4 py-3 rounded-md relative shadow-lg transition-opacity duration-500 ease-in-out"
        role="alert"
      >
        <strong className="block text-xl font-bold">Success!</strong>
        <p className="mt-1">{message}</p>
        <span className="absolute top-0 right-0 px-4 py-3 cursor-pointer">
          <svg
            className="fill-current h-6 w-6 text-green-700 hover:text-green-900 transition-colors"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l3.029-2.651-3.029-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-3.029 2.651 3.029 2.651a1.2 1.2 0 0 1 0 1.697z" />
          </svg>
        </span>
      </div>
    </>
  );
}
