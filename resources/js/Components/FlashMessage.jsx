import React, { useEffect } from "react";
import $ from "jquery";

export default function FlashMessage({ messageType, message }) {
  const successMessageType = {
    main: `bg-green-100 border border-green-400 text-green-800`,
    button: `text-green-700 hover:text-green-900`,
    messageType: "Success!",
  };

  const errorMessageType = {
    main: `bg-red-100 border border-red-400 text-red-800`,
    button: `text-red-700 hover:text-red-900`,
    messageType: "Error!",
  };

  const cautionMessageType = {
    main: `bg-amber-100 border border-amber-400 text-amber-800`,
    button: `text-amber-700 hover:text-amber-900`,
    messageType: "Caution!",
  };

  let classes;

  if (messageType === "success") {
    classes = successMessageType;
  } else if (messageType === "caution") {
    classes = cautionMessageType;
  } else {
    classes = errorMessageType;
  }

  const handleCloseMessage = () => {
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

  /*
   * Auto closure, automatically hide the component after loading
   * we wait for approximately 7.5 seconds and then execute the fadeOut
   * from jQuery's library.
   */

  useEffect(() => {
    const el = $("#flash_message");
    if (el) {
      const rawEl = el[0];
      clearTimeout(rawEl.timeout);

      rawEl.timeout = setTimeout(() => {
        el.fadeOut(1750);
      }, 7500);
    }
  }, []);

  return (
    <>
      <div
        id="flash_message"
        className={`${classes.main} px-6 py-4 rounded-lg relative shadow-xl mx-2 my-5 transition-opacity duration-3000 ease-in-out opacity-100`}
        role="alert"
      >
        <strong className="block text-xl font-bold">
          {classes.messageType}
        </strong>
        <p className="mt-1">{message}</p>
        <span
          className={`${classes.button} absolute top-0 right-0 px-4 py-3 cursor-pointer`}
          onClick={() => handleCloseMessage()}
        >
          <svg
            className="fill-current h-6 w-6  transition-colors"
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
