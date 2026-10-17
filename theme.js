(function () {

    const STORAGE_KEY = "resumeTheme";

    /*
     * Apply saved theme immediately.
     * This prevents the page from flashing
     * into the wrong theme.
     */

    const savedTheme =
        localStorage.getItem(STORAGE_KEY);

    const systemPrefersDark =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

    const initialTheme =
        savedTheme ||
        (systemPrefersDark ? "dark" : "light");


    document.documentElement.setAttribute(
        "data-theme",
        initialTheme
    );


    /*
     * Update the theme button
     */

    function updateThemeButton() {

        const button =
            document.getElementById("themeToggle");

        if (!button) {
            return;
        }


        const currentTheme =
            document.documentElement.getAttribute(
                "data-theme"
            );


        if (currentTheme === "dark") {

            button.textContent = "☀️";

            button.title =
                "Switch to light mode";

            button.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

        } else {

            button.textContent = "🌙";

            button.title =
                "Switch to dark mode";

            button.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        }

    }


    /*
     * Theme toggle
     */

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
            STORAGE_KEY,
            newTheme
        );


        updateThemeButton();

    };


    /*
     * Initialize button
     */

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
                    window.toggleTheme
                );

            }

        }
    );

})();
