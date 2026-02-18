import React from "react";
import $ from "jquery";

export default function SuccessFlashMessage({ message }) {
  const handleCloseSuccessMessage = () => {
    const $el = $("#flash_message");
    if ($el.length) {
      // Clear any existing timeouts assigned to the DOM element
      const rawEl = $el[0];
      clearTimeout(rawEl.timeout);

      // Set 5-second delay then fade out over 1 second
      rawEl.timeout = setTimeout(() => {
        $el.fadeOut(1750);
      }, 100);
    }
  };

  return (
    <>
      <div
        id="flash_message"
        className="bg-green-100 border border-green-400 text-green-800 px-6 py-4 rounded-lg relative shadow-xl mx-2 my-5 transition-opacity duration-3000 ease-in-out opacity-100"
        role="alert"
      >
        <strong className="block text-xl font-bold">Success!</strong>
        <p className="mt-1">{message}</p>
        <span
          className="absolute top-0 right-0 px-4 py-3 cursor-pointer"
          onClick={() => handleCloseSuccessMessage()}
        >
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
