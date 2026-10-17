(function () {

    const THEME_KEY = "resumeTheme";

    const savedTheme =
        localStorage.getItem(THEME_KEY);

    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme =
        savedTheme ||
        (prefersDark ? "dark" : "light");


    document.documentElement.setAttribute(
        "data-theme",
        initialTheme
    );


    function updateThemeButton() {

        const button =
            document.getElementById("themeToggle");

        if (!button) {
            return;
        }

        const currentTheme =
            document.documentElement.getAttribute("data-theme");


        if (currentTheme === "dark") {

            button.textContent = "☀️";

            button.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            button.setAttribute(
                "title",
                "Switch to light mode"
            );

        } else {

            button.textContent = "🌙";

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
            document.documentElement.getAttribute("data-theme");

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";


        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );


        localStorage.setItem(
            THEME_KEY,
            newTheme
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
