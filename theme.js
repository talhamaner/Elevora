/* =========================================================
   ELEVORA RESUME BUILDER
   GLOBAL LIGHT / DARK THEME
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       ROOT
    ===================================================== */

    const root =
        document.documentElement;


    /* =====================================================
       GET SAVED THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem(
            "resumeTheme"
        );


    /* =====================================================
       CHECK SYSTEM THEME
    ===================================================== */

    const systemPrefersDark =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;


    /* =====================================================
       INITIAL THEME
    ===================================================== */

    let initialTheme;


    if (
        savedTheme === "dark" ||
        savedTheme === "light"
    ) {

        initialTheme =
            savedTheme;

    } else {

        initialTheme =
            systemPrefersDark
                ? "dark"
                : "light";

    }


    /* =====================================================
       APPLY INITIAL THEME
    ===================================================== */

    root.setAttribute(
        "data-theme",
        initialTheme
    );


    /* =====================================================
       UPDATE THEME BUTTON
    ===================================================== */

    function updateThemeButton() {

        const button =
            document.getElementById(
                "themeToggle"
            );


        if (!button) {

            return;

        }


        const currentTheme =
            root.getAttribute(
                "data-theme"
            );


        if (
            currentTheme === "dark"
        ) {

            button.textContent =
                "☀️";


            button.setAttribute(
                "aria-label",
                "Switch to light mode"
            );


            button.setAttribute(
                "title",
                "Switch to light mode"
            );

        } else {

            button.textContent =
                "🌙";


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


    /* =====================================================
       SET THEME
    ===================================================== */

    function setTheme(theme) {

        if (
            theme !== "dark" &&
            theme !== "light"
        ) {

            theme = "light";

        }


        root.setAttribute(
            "data-theme",
            theme
        );


        localStorage.setItem(
            "resumeTheme",
            theme
        );


        updateThemeButton();

    }


    /* =====================================================
       TOGGLE THEME
    ===================================================== */

    window.toggleTheme =
        function () {

            const currentTheme =
                root.getAttribute(
                    "data-theme"
                );


            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";


            setTheme(
                newTheme
            );

        };


    /* =====================================================
       PAGE LOAD
    ===================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            updateThemeButton();


            const button =
                document.getElementById(
                    "themeToggle"
                );


            if (!button) {

                return;

            }


            /* Avoid attaching listener twice */

            if (
                button.dataset.themeReady ===
                "true"
            ) {

                return;

            }


            button.dataset.themeReady =
                "true";


            button.addEventListener(
                "click",
                function () {

                    window.toggleTheme();

                }
            );

        }
    );


    /* =====================================================
       OPTIONAL GLOBAL FUNCTION
    ===================================================== */

    window.setResumeTheme =
        setTheme;


})();
