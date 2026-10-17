const config = window.MULTI_CONFIG;

const storageKey =
  STORAGE_KEYS[config.key];

let entries =
  getArray(storageKey);

let editIndex = -1;

const entryList =
  document.getElementById("entryList");

const entryForm =
  document.getElementById("entryForm");

const saveButton =
  document.getElementById("saveBtn");

const cancelButton =
  document.getElementById("cancelEdit");


function clearForm() {

  config.fields.forEach(field => {

    const element =
      document.getElementById(field.id);

    if (!element) return;

    if (field.type === "checkbox") {

      element.checked = false;

    } else {

      element.value = "";

    }

  });

  editIndex = -1;

  cancelButton.style.display =
    "none";

  saveButton.textContent =
    config.addText || "+ Add Entry";

}


function renderEntries() {

  if (!entries.length) {

    entryList.innerHTML =
      `<div class="empty">
        No entries added yet.
      </div>`;

    return;

  }


  entryList.innerHTML =
    entries.map((entry,index) => {

      return `
        <div class="entry-card">

          <h3>
            ${escapeHTML(
              config.title(entry)
            )}
          </h3>

          <div class="entry-meta">
            ${escapeHTML(
              config.meta(entry)
            )}
          </div>

          ${
            entry.description
              ? `<p>${escapeHTML(
                  entry.description
                )}</p>`
              : ""
          }

          <div class="entry-actions">

            <button
              type="button"
              class="btn small secondary"
              data-edit="${index}"
            >
              Edit
            </button>

            <button
              type="button"
              class="btn small danger"
              data-delete="${index}"
            >
              Delete
            </button>

          </div>

        </div>
      `;

    }).join("");


  document
    .querySelectorAll("[data-edit]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          editEntry(
            Number(
              button.dataset.edit
            )
          );

        }
      );

    });


  document
    .querySelectorAll("[data-delete]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.delete
            );

          if (
            !confirm(
              "Delete this entry?"
            )
          ) return;

          entries =
            deleteEntry(
              storageKey,
              index
            );

          renderEntries();

        }
      );

    });

}


function editEntry(index) {

  const entry =
    entries[index];

  if (!entry) return;

  editIndex = index;


  config.fields.forEach(field => {

    const element =
      document.getElementById(
        field.id
      );

    if (!element) return;

    if (
      field.type ===
      "checkbox"
    ) {

      element.checked =
        Boolean(
          entry[field.id]
        );

    } else {

      element.value =
        entry[field.id] || "";

    }

  });


  cancelButton.style.display =
    "inline-flex";

  saveButton.textContent =
    "Update Entry";


  entryForm.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


entryForm.addEventListener(
  "submit",
  function (event) {

    event.preventDefault();

    const entry = {};


    config.fields.forEach(field => {

      const element =
        document.getElementById(
          field.id
        );

      if (!element) return;

      if (
        field.type ===
        "checkbox"
      ) {

        entry[field.id] =
          element.checked;

      } else {

        entry[field.id] =
          element.value.trim();

      }

    });


    const updating =
      editIndex >= 0;


    if (updating) {

      entries =
        updateEntry(
          storageKey,
          editIndex,
          entry
        );

    } else {

      entries =
        addEntry(
          storageKey,
          entry
        );

    }


    renderEntries();

    clearForm();


    setStatus(
      "status",
      updating
        ? "Entry updated successfully."
        : "Entry added successfully."
    );

  }
);


cancelButton.addEventListener(
  "click",
  clearForm
);


renderEntries();
