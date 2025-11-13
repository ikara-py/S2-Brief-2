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
  const certificateContainer = document.getElementById("certificateContainer");
  const certificateDisplay = document.getElementById("certificateDisplay");
  const addCertificateBtn = document.getElementById("addCertificateBtn");
  const cvForm = document.getElementById("cvForm");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const form = document.getElementById("cvForm");
  const sections = form.querySelectorAll("section");
  const submitBtn = document.getElementById("generateCvBtn");
  const progressFill = document.getElementById("progressFill");
  const steps = document.querySelectorAll(".step");
  const savePersonalInfoBtn = document.getElementById("savePersonalInfoBtn");
  const skillInput = document.getElementById("skillInput");
  const addSkillBtn = document.getElementById("addSkillBtn");

  let personalInfo = {};

  savePersonalInfoBtn.addEventListener("click", function () {
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const linkedin = document.getElementById("linkedin").value.trim();

    if (!fullName || !email || !phone) return;

    personalInfo = {
      fullName,
      email,
      phone,
      linkedin,
    };

    console.log(personalInfo);
  });

  //______________________________________________________________________________

  const languages = [];

  addLanguageBtn.addEventListener("click", function () {
    const langNameInput = document.querySelector("input[name='lang_name[]']");
    const langLevelSelect = document.querySelector(
      "select[name='lang_level[]']"
    );

    const language = langNameInput.value.trim();
    const level = langLevelSelect.value;
    const languageObj = {
      language: language,
      level: level,
    };

    if (!langNameInput || !langLevelSelect) return;

    languages.push(languageObj);

    console.log(languages);
  });

  //______________________________________________________________________________

  const certificates = [];

  addCertificateBtn.addEventListener("click", function () {
    const certNameInput = document.querySelector("input[name='cert_name[]']");
    const certIssuerInput = document.querySelector(
      "input[name='cert_issuer[]']"
    );
    const certDateInput = document.querySelector("input[name='cert_date[]']");
    const certUrlInput = document.querySelector("input[name='cert_url[]']");

    const certName = certNameInput.value.trim();
    const certIssuer = certIssuerInput.value.trim();
    const certDate = certDateInput.value;
    const certUrl = certUrlInput.value.trim();
    const certificate = {
      name: certName,
      issuer: certIssuer,
      date: certDate,
      url: certUrl || null,
    };

    if (!certNameInput || !certIssuerInput || !certDateInput) return;

    certificates.push(certificate);

    console.log(certificates);
  });

  //______________________________________________________________________________

  const workExperiences = [];
  const addBtn = document.getElementById("addExperienceBtn");
  const expContainer = document.getElementById("experienceContainer");

  addBtn.addEventListener("click", () => {
    const block = expContainer.lastElementChild;
    const jobTitle = block.querySelector("[name='exp_title[]']").value.trim();
    const company = block.querySelector("[name='exp_company[]']").value.trim();

    if (!jobTitle || !company) return;

    workExperiences.push({ jobTitle, company });

    console.log(workExperiences);
  });

  //______________________________________________________________________________

  const skills = [];
  
  addSkillBtn.addEventListener("click", () => {
    const skill = skillInput.value.trim();
    if (!skill) return;
    skillInput.value = "";
    skills.push(skill);
    console.log(skills);
  });

  //_______________________________________________________________________________

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
  };

  function validateBlock(containerId, blockClass, checkboxClass) {
    const container = document.getElementById(containerId);
    const blocks = container.querySelectorAll(`.${blockClass}`);
    if (blocks.length === 0) return true;

    const lastBlock = blocks[blocks.length - 1];
    const requiredInputs = lastBlock.querySelectorAll("[required]");
    let isValid = true;

    requiredInputs.forEach((input) => {
      const currentCheckbox = lastBlock.querySelector(`.${checkboxClass}`);
      const isToDate =
        input.type === "date" &&
        (input.name === "edu_to[]" || input.name === "exp_to[]");

      if (isToDate && currentCheckbox && currentCheckbox.checked) {
        input.classList.remove("border-red-500", "border-green-500");
        return;
      }

      const isEmpty =
        input.value.trim() === "" ||
        (input.tagName === "SELECT" && input.value === "");

      if (isEmpty) {
        input.classList.remove("border-green-500");
        input.classList.add("border-red-500");
        isValid = false;
      } else {
        input.classList.remove("border-red-500");
        input.classList.add("border-green-500");
      }
    });

    return isValid;
  }

  function manageDynamicBlock(
    container,
    blockClass,
    saveFunction,
    createFunction,
    checkboxClass = null
  ) {
    const lastBlock = container.querySelector(`.${blockClass}:last-child`);

    if (lastBlock) {
      if (!validateBlock(container.id, blockClass, checkboxClass, lastBlock)) {
        return false;
      }
      saveFunction(lastBlock);
    }

    if (createFunction) {
      createFunction();
    }

    return true;
  }

  function createCertificateBlock() {
    const newBlock = document.createElement("div");
    newBlock.className = "bg-gray-50 p-4 rounded relative certificate-block";
    newBlock.innerHTML = `
            <input
                type="text"
                name="cert_name[]"
                placeholder="Certificate Name (e.g., AWS Certified Developer)"
                class="w-full mb-2 p-2 border rounded cert_name"
                required
            />
            <input
                type="text"
                name="cert_issuer[]"
                placeholder="Issuing Organization (e.g., Coursera, Microsoft)"
                class="w-full mb-2 p-2 border rounded cert_issuer"
                required
            />

            <div class="flex gap-4">
                <div class="flex-1">
                    <label class="block text-sm">Issue Date</label>
                    <input
                        type="date"
                        name="cert_date[]"
                        class="w-full p-2 border rounded cert_date"
                        required
                    />
                </div>
                <div class="flex-1">
                    <label class="block text-sm">URL (Optional)</label>
                    <input
                        type="url"
                        name="cert_url[]"
                        placeholder="Certificate link"
                        class="w-full p-2 border rounded cert_url"
                    />
                </div>
            </div>
            
        `;
    certificateContainer.appendChild(newBlock);
    newBlock.querySelector(".cert_name").focus();
  }

  function saveAndDisplayCertificate(blockToSave) {
    const name = blockToSave.querySelector(".cert_name").value;
    const issuer = blockToSave.querySelector(".cert_issuer").value;
    const date = blockToSave.querySelector(".cert_date").value;
    const url = blockToSave.querySelector(".cert_url").value;

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });

    const displayDiv = document.createElement("div");
    displayDiv.className =
      "p-4 border-l-4 border-amber-500 bg-amber-50 relative saved-certificate-block";

    displayDiv.innerHTML = `
            <div class="font-bold text-lg text-amber-800">${name}</div>
            <div class="text-sm text-gray-600">${issuer} (${formattedDate})</div>
            ${
              url
                ? `<div class="text-xs mt-1"><a href="${url}" target="_blank" class="text-amber-700 hover:underline">View Credential</a></div>`
                : ""
            }
            <button type="button" class="removeCertDisplayBtn absolute top-1 right-1 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs hover:bg-red-600">✕</button>
            
            <input type="hidden" name="saved_cert_name[]" value="${name}">
            <input type="hidden" name="saved_cert_issuer[]" value="${issuer}">
            <input type="hidden" name="saved_cert_date[]" value="${date}">
            <input type="hidden" name="saved_cert_url[]" value="${url}">
        `;
    certificateDisplay.appendChild(displayDiv);
    blockToSave.remove();
  }

  function createLanguageBlock() {
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

  addCertificateBtn.addEventListener("click", () => {
    manageDynamicBlock(
      certificateContainer,
      "certificate-block",
      saveAndDisplayCertificate,
      createCertificateBlock
    );
  });

  certificateContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeCertBtn")) {
      e.target.closest(".certificate-block").remove();
    }
  });

  certificateDisplay.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeCertDisplayBtn")) {
      e.target.closest(".saved-certificate-block").remove();
    }
  });

  addLanguageBtn.addEventListener("click", () => {
    manageDynamicBlock(
      languageContainer,
      "language-block",
      saveAndDisplayLanguage,
      createLanguageBlock
    );
  });

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

  const personalInfoInputs = document.querySelectorAll(
    "#fullName, #email, #phone"
  );

  function validateInput(input) {
    const rules = validationRules[input.id];

    // console.log(input.id);

    const errorElement = document.getElementById(`${input.id}Error`);
    const value = input.value.trim();

    if (!rules) {
      return true;
    }

    if (!input.hasAttribute("required") && value === "") {
      errorElement.classList.add("hidden");
      input.classList.remove("border-red-500", "border-green-500");
      return true;
    }

    if (input.hasAttribute("required") && value === "") {
      // console.log("Required field is empty");

      errorElement.textContent = "This field is required.";
      errorElement.classList.remove("hidden");
      input.classList.remove("border-green-500");
      input.classList.add("border-red-500");
      return false;
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
    personalInfoInputs.forEach((input) => {
      if (!validateInput(input)) {
        e.preventDefault();
      }
    });

    if (
      !validateBlock("educationContainer", "education-block", "currentCheckbox")
    ) {
      e.preventDefault();
    }

    if (
      !validateBlock(
        "experienceContainer",
        "experience-block",
        "currentExpCheckbox"
      )
    ) {
      e.preventDefault();
    }

    if (
      !manageDynamicBlock(
        languageContainer,
        "language-block",
        saveAndDisplayLanguage,
        null
      )
    ) {
      e.preventDefault();
    }

    if (
      !manageDynamicBlock(
        certificateContainer,
        "certificate-block",
        saveAndDisplayCertificate,
        null
      )
    ) {
      e.preventDefault();
    }
  });

  let currentStep = 0;

  function updateUI() {
    // console.log("Current Step:", currentStep);

    sections.forEach((section, index) => {
      if (index === currentStep) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });

    const lastStepIndex = sections.length - 1;

    if (currentStep === lastStepIndex) {
      nextBtn.classList.add("hidden");
      submitBtn.classList.remove("hidden");
    } else {
      nextBtn.classList.remove("hidden");
      submitBtn.classList.add("hidden");
    }
    if (currentStep === 0) {
      prevBtn.classList.add("hidden");
    } else {
      prevBtn.classList.remove("hidden");
    }

    changeNumStyle();
  }

  function nextStep() {
    if (currentStep < sections.length - 1) {
      currentStep++;
      updateUI();
      progressBar();
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      updateUI();
      progressBar();
    }
  }

  function progressBar() {
    if (currentStep === 0) {
      progressFill.style.width = "14.28%";
    } else if (currentStep === 1) {
      progressFill.style.width = "28.56%";
    } else if (currentStep === 2) {
      progressFill.style.width = "42.84%";
    } else if (currentStep === 3) {
      progressFill.style.width = "57.12%";
    } else if (currentStep === 4) {
      progressFill.style.width = "71.4%";
    } else if (currentStep === 5) {
      progressFill.style.width = "85.68%";
    } else if (currentStep === 6) {
      progressFill.style.width = "100%";
    }
  }

  nextBtn.addEventListener("click", nextStep);
  prevBtn.addEventListener("click", prevStep);

  updateUI();

  function changeNumStyle() {
    // console.log("just a test");

    steps.forEach((step, index) => {
      const circle = step.querySelector("div");
      const label = step.querySelector("span");

      if (index <= currentStep) {
        circle.classList.remove("bg-white", "text-gray-600");
        circle.classList.add("bg-blue-600", "text-white");

        label.classList.remove("text-gray-500", "font-medium");
        label.classList.add("text-blue-600", "font-bold");
      } else {
        circle.classList.remove("bg-blue-600", "text-white");
        circle.classList.add("bg-white", "text-gray-600");

        label.classList.remove("text-blue-600", "font-bold");
        label.classList.add("text-gray-500", "font-medium");
      }
    });
  }

  // const savedData = {
  //   personalInfo: {},
  //   education: [],
  //   experience: [],
  //   languages: [],
  //   certificates: [],
  // };
});
