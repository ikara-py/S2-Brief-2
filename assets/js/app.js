document.addEventListener("DOMContentLoaded", () => {
  const educationContainer = document.getElementById("educationContainer");
  const addExperienceBtn = document.getElementById("addExperienceBtn");
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

  function createEducationBlock() {
    const div = document.createElement("div");
    div.className = "bg-gray-50 p-4 rounded relative education-block";
    div.innerHTML = `
            <input
                type="text"
                name="edu_title[]"
                placeholder="e.g. BSc in Computer Science"
                class="w-full mb-2 p-2 border rounded"
                required
            />

            <div class="flex gap-4">
                <div class="flex-1">
                    <label class="block text-sm">From</label>
                    <input
                        type="date"
                        name="edu_from[]"
                        class="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div class="flex-1">
                    <label class="block text-sm">To</label>
                    <input
                        type="date"
                        name="edu_to[]"
                        class="w-full p-2 border rounded"
                        required
                    />
                </div>
            </div>

            <label class="inline-flex items-center mt-2">
                <input type="checkbox" class="currentCheckbox mr-2" /> Current
            </label>

            <button
                type="button"
                class="removeBtn absolute top-1 right-1 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-700"
            >
                ✕
            </button>
        `;
    return div;
  }

  addExperienceBtn.addEventListener("click", () => {
    const newBlock = createEducationBlock();
    educationContainer.appendChild(newBlock);
  });

  educationContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeBtn")) {
      e.target.closest(".education-block").remove();
    }
  });

  educationContainer.addEventListener("change", (e) => {
    if (e.target.classList.contains("currentCheckbox")) {
      const toInput = e.target
        .closest(".education-block")
        .querySelector('input[name="edu_to[]"]');
      toInput.disabled = e.target.checked;
      if (e.target.checked) {
        toInput.value = "";
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

    if (!isFormValid) {
      e.preventDefault();
    }
  });
});
