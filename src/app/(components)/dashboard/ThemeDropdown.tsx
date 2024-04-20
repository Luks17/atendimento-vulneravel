"use client";

import { PaintBrushIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

export default function ThemeDropdown({
  showText = true,
}: {
  showText?: boolean;
}) {
  useEffect(() => {
    const currentTheme = localStorage.getItem("data-theme");

    if (currentTheme) {
      document.firstElementChild?.setAttribute("data-theme", currentTheme);
    }
  }, []);

  function handleThemeChange(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const value = e.currentTarget.value;

    document.firstElementChild?.setAttribute("data-theme", value);
    localStorage.setItem("data-theme", value);
  }

  const themes = [
    "corporate",
    "cupcake",
    "pastel",
    "cmyk",
    "dracula",
    "business",
    "halloween",
  ];

  return (
    <div className="dropdown dropdown-end">
      <div
        aria-label="Selação de tema"
        tabIndex={0}
        role="button"
        className="btn btn-ghost rounded-btn"
      >
        <PaintBrushIcon className="w-5 sm:w-6 h-5 sm:h-6" />
        {showText && <span>Tema</span>}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow bg-base-100 text-base-content rounded-box w-52"
      >
        {themes.map((theme, i) => (
          <li key={i}>
            <button
              className="btn btn-sm btn-block btn-ghost capitalize justify-start"
              value={theme}
              onClick={handleThemeChange}
            >
              {theme}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
