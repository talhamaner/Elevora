/* =====================================================
   ELEVORA DATA STORAGE
===================================================== */

const DATA_KEYS = {

    personal:
        "resumePersonalData",

    summary:
        "section_summary",

    education:
        "section_education",

    experience:
        "section_experience",

    projects:
        "section_projects",

    skills:
        "section_skills",

    certifications:
        "section_certifications",

    languages:
        "section_languages",

    achievements:
        "section_achievements",

    coverLetter:
        "section_cover_letter"
};


/* =====================================================
   GET DATA
===================================================== */

function getData(key, fallback = {}) {

    try {

        const data =
            localStorage.getItem(key);

        if (!data) {
            return fallback;
        }

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Unable to read saved data:",
            error
        );

        return fallback;
    }
}


/* =====================================================
   SAVE DATA
===================================================== */

function saveData(key, data) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to save data:",
            error
        );

        return false;
    }
}


/* =====================================================
   GET SECTION
===================================================== */

function getSection(
    section,
    fallback = {}
) {

    const key =
        DATA_KEYS[section] || section;

    return getData(
        key,
        fallback
    );
}


/* =====================================================
   SAVE SECTION
===================================================== */

function saveSection(
    section,
    data
) {

    const key =
        DATA_KEYS[section] || section;

    return saveData(
        key,
        data
    );
}


/* =====================================================
   HTML ESCAPE
===================================================== */

function escapeHTML(value) {

    return String(
        value ?? ""
    ).replace(
        /[&<>"']/g,
        function (character) {

            const entities = {

                "&": "&amp;",

                "<": "&lt;",

                ">": "&gt;",

                '"': "&quot;",

                "'": "&#039;"
            };

            return entities[character];
        }
    );
}


/* =====================================================
   CHARACTER COUNTERS
===================================================== */

function setupCounters() {

    const fields =
        document.querySelectorAll(
            "[data-counter]"
        );


    fields.forEach(function (field) {

        const counter =
            document.querySelector(
                field.dataset.counter
            );


        if (!counter) {
            return;
        }


        function updateCounter() {

            counter.textContent =
                field.value.length +
                " / " +
                field.maxLength;
        }


        field.addEventListener(
            "input",
            updateCounter
        );


        updateCounter();
    });
}


document.addEventListener(
    "DOMContentLoaded",
    setupCounters
);
