# CV Builder – Stepper Form Application

## Project Overview  
The CV Builder App is a step-by-step form application that allows users to create a complete, professional CV.  
Users can enter their personal and professional information, track progress through a visual stepper, dynamically add sections such as skills or experiences, and preview or download their CV using customizable templates.

---

## Key Features

### 1. Stepper Form with Validation  
A guided, multi-step form for building a CV:
- Personal Information: Full name, profile picture, email, phone, address, LinkedIn, GitHub, portfolio, etc.  
- Professional Details: Job title and profile summary.  
- Technical & Soft Skills: Separate lists for hard and soft skills, with the ability to dynamically add new entries.  
- Languages: List of languages with proficiency levels; dynamic add/remove functionality.  
- Hobbies & Interests: Add and remove hobbies dynamically.  
- University Courses: Add multiple academic courses dynamically.  
- Professional Experience: Add multiple job experiences dynamically.  
- Certifications: Add multiple certifications with names and links.

Each section includes input validation using regex patterns (e.g., email, phone number, and URL formats).

---

### 2. Progress Tracking  
A dynamic progress bar visually indicates the user’s current position in the form and how many steps remain.

---

### 3. Customizable CV Templates  
- Two distinct CV template designs are available for selection.  
- Users can preview how their data appears in real time.  
- Templates can be customized before printing or downloading.

---

### 4. Save Options  
- Option to save CV data locally for future editing or modification.

---

### 5. Field Validation  
Built-in validation ensures data accuracy using regex-based checks:  
- Email format  
- Phone number  
- URL fields (LinkedIn, GitHub, Portfolio)  
- Required field validation before progressing to the next step

---

## Required Technologies  
- HTML5  
- TailwindCSS  
- JavaScript (Native DOM manipulation)  
- Regex validation patterns

---

## User Stories and Acceptance Criteria

### 1. Creating a CV  
As a user, I want to create a CV by filling out a step-by-step form to organize my personal and professional details clearly.  

**Acceptance Criteria:**  
- I can access the form and see clearly defined steps.  
- I can navigate between steps without losing entered data.  
- Each step focuses on a specific category of information.  

---

### 2. Step-by-Step Form  
As a user, I want a multi-step form that guides me through CV creation.  

**Acceptance Criteria:**  
- Each step name indicates its purpose.  
- I can navigate with “Next” and “Previous” buttons.  
- A progress bar updates dynamically as I advance.  

---

### 3. Dynamic Forms for Multiple Entries  
As a user, I want to add multiple skills, languages, or experiences dynamically.  

**Acceptance Criteria:**  
- Each section with repetitive data includes an “Add” button.  
- New fields appear instantly without page reload.  
- I can remove entries before submitting my CV.  

---

### 4. Field Validation  
As a user, I want to be alerted when invalid information is entered.  

**Acceptance Criteria:**  
- Each field is validated according to type.  
- Clear error messages appear under invalid inputs.  
- I cannot proceed to the next step until all required fields are valid.  

---

### 5. Progress Tracking  
As a user, I want a visual progress bar to show how far I’ve progressed.  

**Acceptance Criteria:**  
- The bar updates with each completed step.  
- Going backward decreases progress accordingly.  

---

### 6. CV Template Selection  
As a user, I want to choose from two CV templates before downloading.  

**Acceptance Criteria:**  
- I can preview both templates with my data.  
- I can switch templates easily.  
- My selected template is used for download or print.  

---

### 7. Downloading and Printing the CV  
As a user, I want to download or print my completed CV.  

**Acceptance Criteria:**  
- A “Download” button generates a PDF version.  
- A “Print” button allows direct printing.  
- The output retains the chosen template’s layout and design.  

---

## License  
This project is for educational purposes and may be freely used or modified for learning and personal development.
