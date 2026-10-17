(function () {

  const root = document.documentElement;

  const savedTheme = localStorage.getItem("resumeTheme");

  const systemDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  root.setAttribute(
    "data-theme",
    savedTheme || (systemDark ? "dark" : "light")
  );


  function updateThemeButton() {

    const button = document.getElementById("themeToggle");

    if (!button) {
      return;
    }

    const isDark =
      root.getAttribute("data-theme") === "dark";

    button.textContent = isDark ? "☀️" : "🌙";

    button.title = isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

    button.setAttribute(
      "aria-label",
      button.title
    );
  }


  window.toggleTheme = function () {

    const current =
      root.getAttribute("data-theme");

    const next =
      current === "dark"
        ? "light"
        : "dark";

    root.setAttribute("data-theme", next);

    localStorage.setItem(
      "resumeTheme",
      next
    );

    updateThemeButton();
  };


  document.addEventListener(
    "DOMContentLoaded",
    function () {

      updateThemeButton();

      const button =
        document.getElementById("themeToggle");

      if (button) {

        button.addEventListener(
          "click",
          window.toggleTheme
        );

      }

    }
  );

})();
