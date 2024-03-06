"use client";

import { useEffect } from "react";

export default function ThemeDropdown() {
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

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
        Theme
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            className="btn btn-sm btn-block btn-ghost justify-start"
            value="corporate"
            onClick={handleThemeChange}
          >
            Corporate
          </button>
        </li>
        <li>
          <button
            className="btn btn-sm btn-block btn-ghost justify-start"
            value="dracula"
            onClick={handleThemeChange}
          >
            Dracula
          </button>
        </li>
      </ul>
    </div>
  );
}
