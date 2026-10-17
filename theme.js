(function () {

  const root =
    document.documentElement;


  function applyTheme(theme) {

    root.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem(
      "resumeTheme",
      theme
    );


    const button =
      document.getElementById(
        "themeToggle"
      );


    if (button) {

      button.textContent =
        theme === "dark"
          ? "☀️"
          : "🌙";

      button.title =
        theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode";

    }

  }


  const saved =
    localStorage.getItem(
      "resumeTheme"
    );


  const systemDark =
    window.matchMedia &&
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;


  applyTheme(
    saved ||
    (systemDark
      ? "dark"
      : "light")
  );


  window.toggleTheme =
    function () {

      const current =
        root.getAttribute(
          "data-theme"
        ) || "light";


      applyTheme(
        current === "dark"
          ? "light"
          : "dark"
      );

    };


  document.addEventListener(
    "DOMContentLoaded",
    function () {

      const button =
        document.getElementById(
          "themeToggle"
        );


      if (button) {

        button.onclick =
          window.toggleTheme;

      }


      applyTheme(
        root.getAttribute(
          "data-theme"
        ) || "light"
      );

    }
  );

})();
