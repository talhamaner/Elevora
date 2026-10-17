/* =========================================
   RESUME BUILDER THEME SYSTEM
========================================= */

(function () {

    const savedTheme =
        localStorage.getItem("resumeTheme");

    const systemDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme =
        savedTheme ||
        (systemDark ? "dark" : "light");

    document.documentElement.setAttribute(
        "data-theme",
        initialTheme
    );


    function updateThemeButton() {

        const button =
            document.getElementById("themeToggle");

        if (!button) return;

        const currentTheme =
            document.documentElement.getAttribute(
                "data-theme"
            );

        if (currentTheme === "dark") {

            button.innerHTML = "☀️";

            button.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            button.setAttribute(
                "title",
                "Switch to light mode"
            );

        } else {

            button.innerHTML = "🌙";

            button.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            button.setAttribute(
                "title",
                "Switch to dark mode"
            );

        }

    }


    window.toggleTheme = function () {

        const currentTheme =
            document.documentElement.getAttribute(
                "data-theme"
            );

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";


        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );


        localStorage.setItem(
            "resumeTheme",
            newTheme
        );


        updateThemeButton();

    };


    document.addEventListener(
        "DOMContentLoaded",
        function () {

            updateThemeButton();

            const button =
                document.getElementById(
                    "themeToggle"
                );

            if (button) {

                button.addEventListener(
                    "click",
                    toggleTheme
                );

            }

        }
    );

})();
