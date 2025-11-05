document.addEventListener("DOMContentLoaded", () => {
  const educationContainer = document.getElementById("educationContainer");
  const educationDisplay = document.getElementById("educationDisplay");
  const addEducationBtn = document.getElementById("addEducationBtn");
  const experienceContainer = document.getElementById("experienceContainer");
  const experienceDisplay = document.getElementById("experienceDisplay");
  const addExperienceBtn = document.getElementById("addExperienceBtn");
  const languageContainer = document.getElementById("languageContainer");
  const languageDisplay = document.getElementById("languageDisplay");
  const addLanguageBtn = document.getElementById("addLanguageBtn");
  const cvForm = document.getElementById("cvForm");

  const validationRules = {
    fullName: {
      regex: /^[a-zA-Z\s]+$/,
      error: "Name must contain only letters and spaces.",
    },
    email: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      error: "Please enter a valid email address.",
    },
    phone: {
      regex: /^(06|07|05)\d{8}$/,
      error: "Phone number must be 10 digits and start with 05, 06, or 07.",
    },
    linkedin: {
      regex: /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/,
      error: "Please enter a valid LinkedIn URL.",
    },
  };

  function validateBlock(
    containerId,
    blockClass,
    currentCheckboxClass,
    checkAll = false,
    blockToValidate = null
  ) {
    const container = document.getElementById(containerId);
    const blocks = container.querySelectorAll(`.${blockClass}`);
    if (blocks.length === 0) return true;

    const blocksToCheck = blockToValidate
      ? [blockToValidate]
      : checkAll
      ? blocks
      : [blocks[blocks.length - 1]];
    let isOverallValid = true;

    blocksToCheck.forEach((block) => {
      const requiredInputs = block.querySelectorAll("[required]");
      let isValid = true;

      requiredInputs.forEach((input) => {
        const isToDate =
          input.type === "date" &&
          (input.name === "edu_to[]" || input.name === "exp_to[]");
        const currentCheckbox = block.querySelector(`.${currentCheckboxClass}`);

        if (isToDate && currentCheckbox && currentCheckbox.checked) {
          input.classList.remove("border-red-500", "border-green-500");
          return;
        }

        if (
          input.value.trim() === "" ||
          (input.tagName === "SELECT" && input.value === "")
        ) {
          input.classList.remove("border-green-500");
          input.classList.add("border-red-500");
          isValid = false;
        } else {
          input.classList.remove("border-red-500");
          input.classList.add("border-green-500");
        }
      });
      if (!isValid) {
        isOverallValid = false;
      }
    });
    return isOverallValid;
  }

  function createLanguageBlock() {
    const lastBlock = languageContainer.querySelector(
      ".language-block:last-child"
    );

    if (
      lastBlock &&
      !validateBlock(
        "languageContainer",
        "language-block",
        null,
        false,
        lastBlock
      )
    ) {
      return;
    }

    if (lastBlock) {
      saveAndDisplayLanguage(lastBlock);
    }

    const newBlock = document.createElement("div");
    newBlock.className = "bg-gray-50 p-4 rounded relative language-block";
    newBlock.innerHTML = `
      <div class="flex gap-4">
        <div class="flex-1">
          <input
            type="text"
            name="lang_name[]"
            placeholder="Language (e.g., French)"
            class="w-full p-2 border rounded lang_name"
            required
          />
        </div>
        <div class="flex-1">
          <select
            name="lang_level[]"
            class="w-full p-2 border rounded lang_level bg-white"
            required
          >
            <option value="" disabled selected>Select Level</option>
            <option value="Native">Native</option>
            <option value="Fluent">Fluent</option>
            <option value="Professional Working Proficiency">
              Professional Working Proficiency
            </option>
            <option value="Limited Working Proficiency">
              Limited Working Proficiency
            </option>
            <option value="Elementary Proficiency">
              Elementary Proficiency
            </option>
          </select>
        </div>
      </div>
    `;

    languageContainer.appendChild(newBlock);
    newBlock.querySelector(".lang_name").focus();
  }

  function saveAndDisplayLanguage(blockToSave) {
    const name = blockToSave.querySelector(".lang_name").value;
    const level = blockToSave.querySelector(".lang_level").value;
    const levelText = blockToSave.querySelector(
      ".lang_level option:checked"
    ).textContent;

    const displayDiv = document.createElement("div");
    displayDiv.className =
      "p-4 border-l-4 border-teal-500 bg-teal-50 relative saved-language-block";

    displayDiv.innerHTML = `
        <div class="font-bold text-lg text-teal-800">${name}</div>
        <div class="text-sm text-gray-600">${levelText}</div>
        <button type="button" class="removeLangDisplayBtn absolute top-1 right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs hover:bg-red-600">✕</button>
        
        <input type="hidden" name="saved_lang_name[]" value="${name}">
        <input type="hidden" name="saved_lang_level[]" value="${level}">
    `;

    languageDisplay.appendChild(displayDiv);
    blockToSave.remove();
  }

  function saveAndDisplayEducation() {
    const blocks = educationContainer.querySelectorAll(".education-block");
    const blockToSave = blocks[blocks.length - 1];

    if (
      !validateBlock(
        "educationContainer",
        "education-block",
        "currentCheckbox",
        false,
        blockToSave
      )
    ) {
      return;
    }

    const title = blockToSave.querySelector(".edu_title").value;
    const fromDate = blockToSave.querySelector(".edu_from").value;
    const toDateInput = blockToSave.querySelector(".edu_to");
    const isCurrent = blockToSave.querySelector(".edu_current").checked;
    const toDate = isCurrent ? "Current" : toDateInput.value;

    const displayDiv = document.createElement("div");
    displayDiv.className =
      "p-4 border-l-4 border-blue-500 bg-blue-50 relative saved-education-block";

    const formattedFrom = new Date(fromDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    let formattedTo = toDate;
    if (!isCurrent && toDate) {
      formattedTo = new Date(toDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    displayDiv.innerHTML = `
          <div class="font-bold text-lg text-blue-800">${title}</div>
          <div class="text-sm text-gray-600">${formattedFrom} - ${formattedTo}</div>
          <button type="button" class="removeDisplayBtn absolute top-1 right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs hover:bg-red-600">✕</button>
          
          <input type="hidden" name="saved_edu_title[]" value="${title}">
          <input type="hidden" name="saved_edu_from[]" value="${fromDate}">
          <input type="hidden" name="saved_edu_to[]" value="${
            isCurrent ? "Current" : toDateInput.value
          }">
    `;

    educationDisplay.appendChild(displayDiv);

    blockToSave.querySelector(".edu_title").value = "";
    blockToSave.querySelector(".edu_from").value = "";
    toDateInput.value = "";
    blockToSave.querySelector(".edu_current").checked = false;
    toDateInput.disabled = false;

    blockToSave.querySelectorAll("input").forEach((input) => {
      input.classList.remove("border-red-500", "border-green-500");
    });
  }

  function saveAndDisplayExperience() {
    const blocks = experienceContainer.querySelectorAll(".experience-block");
    const blockToSave = blocks[blocks.length - 1];

    if (
      !validateBlock(
        "experienceContainer",
        "experience-block",
        "currentExpCheckbox",
        false,
        blockToSave
      )
    ) {
      return;
    }

    const title = blockToSave.querySelector(".exp_title").value;
    const company = blockToSave.querySelector(".exp_company").value;
    const fromDate = blockToSave.querySelector(".exp_from").value;
    const toDateInput = blockToSave.querySelector(".exp_to");
    const isCurrent = blockToSave.querySelector(".exp_current").checked;
    const description = blockToSave.querySelector(".exp_description").value;
    const toDate = isCurrent ? "Current" : toDateInput.value;

    const displayDiv = document.createElement("div");
    displayDiv.className =
      "p-4 border-l-4 border-purple-500 bg-purple-50 relative saved-experience-block";

    const formattedFrom = new Date(fromDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    let formattedTo = toDate;
    if (!isCurrent && toDate) {
      formattedTo = new Date(toDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    displayDiv.innerHTML = `
          <div class="font-bold text-lg text-purple-800">${title} at ${company}</div>
          <div class="text-sm text-gray-600 mb-1">${formattedFrom} - ${formattedTo}</div>
          <ul class="list-disc list-inside text-sm text-gray-700 ml-4">
            <li>${description}</li>
          </ul>
          <button type="button" class="removeExpDisplayBtn absolute top-1 right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs hover:bg-red-600">✕</button>
          
          <input type="hidden" name="saved_exp_title[]" value="${title}">
          <input type="hidden" name="saved_exp_company[]" value="${company}">
          <input type="hidden" name="saved_exp_from[]" value="${fromDate}">
          <input type="hidden" name="saved_exp_to[]" value="${
            isCurrent ? "Current" : toDateInput.value
          }">
          <input type="hidden" name="saved_exp_description[]" value="${description}">
    `;

    experienceDisplay.appendChild(displayDiv);

    blockToSave.querySelector(".exp_title").value = "";
    blockToSave.querySelector(".exp_company").value = "";
    blockToSave.querySelector(".exp_from").value = "";
    toDateInput.value = "";
    blockToSave.querySelector(".exp_current").checked = false;
    blockToSave.querySelector(".exp_description").value = "";
    toDateInput.disabled = false;

    blockToSave.querySelectorAll("input, textarea").forEach((input) => {
      input.classList.remove("border-red-500", "border-green-500");
    });
  }

  addLanguageBtn.addEventListener("click", createLanguageBlock);

  languageContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeLangBtn")) {
      e.target.closest(".language-block").remove();
    }
  });

  languageDisplay.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeLangDisplayBtn")) {
      e.target.closest(".saved-language-block").remove();
    }
  });

  languageContainer.addEventListener("input", (e) => {
    const input = e.target;
    if (
      (input.hasAttribute("required") || input.tagName === "SELECT") &&
      input.closest(".language-block")
    ) {
      if (
        input.value.trim() === "" ||
        (input.tagName === "SELECT" && input.value === "")
      ) {
        input.classList.remove("border-green-500");
        input.classList.add("border-red-500");
      } else {
        input.classList.remove("border-red-500");
        input.classList.add("border-green-500");
      }
    }
  });

  addEducationBtn.addEventListener("click", saveAndDisplayEducation);
  addExperienceBtn.addEventListener("click", saveAndDisplayExperience);

  educationDisplay.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeDisplayBtn")) {
      e.target.closest(".saved-education-block").remove();
    }
  });

  experienceDisplay.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeExpDisplayBtn")) {
      e.target.closest(".saved-experience-block").remove();
    }
  });

  educationContainer.addEventListener("change", (e) => {
    if (e.target.classList.contains("currentCheckbox")) {
      const block = e.target.closest(".education-block");
      const toInput = block.querySelector('input[name="edu_to[]"]');
      toInput.disabled = e.target.checked;
      if (e.target.checked) {
        toInput.value = "";
        toInput.classList.remove("border-red-500", "border-green-500");
      } else if (!toInput.disabled && toInput.value === "") {
        toInput.classList.remove("border-green-500");
        toInput.classList.add("border-red-500");
      }
    }
  });

  educationContainer.addEventListener("input", (e) => {
    const input = e.target;
    if (input.hasAttribute("required") && input.closest(".education-block")) {
      if (input.value.trim() === "") {
        input.classList.remove("border-green-500");
        input.classList.add("border-red-500");
      } else {
        input.classList.remove("border-red-500");
        input.classList.add("border-green-500");
      }
    }
  });

  experienceContainer.addEventListener("change", (e) => {
    if (e.target.classList.contains("currentExpCheckbox")) {
      const toInput = e.target
        .closest(".experience-block")
        .querySelector('input[name="exp_to[]"]');
      toInput.disabled = e.target.checked;
      if (e.target.checked) {
        toInput.value = "";
        toInput.classList.remove("border-red-500", "border-green-500");
      } else if (!toInput.disabled && toInput.value === "") {
        toInput.classList.remove("border-green-500");
        toInput.classList.add("border-red-500");
      }
    }
  });

  experienceContainer.addEventListener("input", (e) => {
    const input = e.target;
    if (input.hasAttribute("required") && input.closest(".experience-block")) {
      if (input.value.trim() === "") {
        input.classList.remove("border-green-500");
        input.classList.add("border-red-500");
      } else {
        input.classList.remove("border-red-500");
        input.classList.add("border-green-500");
      }
    }
  });

  const personalInfoInputs = document.querySelectorAll(
    "#fullName, #email, #phone, #linkedin"
  );

  function validateInput(input) {
    const rules = validationRules[input.id];
    const errorElement = document.getElementById(`${input.id}Error`);
    const value = input.value.trim();

    if (!rules) return true;

    if (!input.hasAttribute("required") && value === "") {
      errorElement.classList.add("hidden");
      input.classList.remove("border-red-500", "border-green-500");
      return true;
    }

    if (rules.regex.test(value)) {
      errorElement.classList.add("hidden");
      input.classList.remove("border-red-500");
      input.classList.add("border-green-500");
      return true;
    } else {
      errorElement.textContent = rules.error;
      errorElement.classList.remove("hidden");
      input.classList.remove("border-green-500");
      input.classList.add("border-red-500");
      return false;
    }
  }

  personalInfoInputs.forEach((input) => {
    input.addEventListener("blur", () => {
      validateInput(input);
    });

    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        validateInput(input);
      } else {
        const errorElement = document.getElementById(`${input.id}Error`);
        errorElement.classList.add("hidden");
        input.classList.remove("border-red-500", "border-green-500");
      }
    });
  });

  cvForm.addEventListener("submit", (e) => {
    let isFormValid = true;

    personalInfoInputs.forEach((input) => {
      if (!validateInput(input)) {
        isFormValid = false;
      }
    });

    if (
      !validateBlock(
        "educationContainer",
        "education-block",
        "currentCheckbox",
        false
      )
    ) {
      isFormValid = false;
    }

    if (
      !validateBlock(
        "experienceContainer",
        "experience-block",
        "currentExpCheckbox",
        false
      )
    ) {
      isFormValid = false;
    }

    const lastLangBlock = languageContainer.querySelector(
      ".language-block:last-child"
    );
    if (lastLangBlock) {
      if (
        !validateBlock(
          "languageContainer",
          "language-block",
          null,
          false,
          lastLangBlock
        )
      ) {
        isFormValid = false;
      } else {
        saveAndDisplayLanguage(lastLangBlock);
      }
    }

    if (!isFormValid) {
      e.preventDefault();
    }
  });
});
