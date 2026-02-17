import React from 'react';

export default function LinkedButton({
  location,
  children,
  size = 'md',
  className = '',
  disabled = false,
}) {

  // Size variants --
  // Small: 'sm', Medium: 'md', Large 'lg'

  const sizeStyles = {
    sm: `
      px-4 py-2 text-sm
      rounded-md shdow-sm
    `,
    md: `
      px-5 py-2.5 text-base
      rounded-lg shadow-md
    `,
    lg: `
      px-6 py-3 text-lg
      rounded-xl shadow-lg
    `,
  };

  // Core Styling
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium tracking-tight
    text-white
    bg-gradient-to-b from-indigo-500 to-indigo-600
    hover:from-indigo-600 hover:to-indigo-700
    active:from-indigo-700 active:to-indigo-800
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
    transition-all duration-150 ease-in-out
    disabled:opacity-60 disabled:cursor-not-allowed
    cursor-pointer
    select-none
  `;

  // combine everything
  const buttonClasses = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  return (
    <a
      href={disabled ? '#' : location}
      className={buttonClasses}
      onClick={handleClick}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
    >
      {children}
    </a>
  );
};
