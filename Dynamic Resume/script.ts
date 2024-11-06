const form = document.getElementById("form") as HTMLFormElement;
const formContainer = document.getElementById("formContainer") as HTMLElement;
const resumeContainer = document.getElementById(
  "resumeContainer"
) as HTMLElement;

const displayName = document.getElementById("displayName") as HTMLElement;
const displayEmail = document.getElementById("displayEmail") as HTMLElement;
const displayPhone = document.getElementById("displayPhone") as HTMLElement;
const displaySummary = document.getElementById("displaySummary") as HTMLElement;
const displayEducation = document.getElementById(
  "displayEducation"
) as HTMLElement;
const displaySkills = document.getElementById("displaySkills") as HTMLElement;
const displayExperience = document.getElementById(
  "displayExperience"
) as HTMLElement;

const summaryButton = document.getElementById(
  "toggle-summary"
) as HTMLButtonElement;
const skillsButton = document.getElementById(
  "toggle-skills"
) as HTMLButtonElement;
const experienceButton = document.getElementById(
  "toggle-experience"
) as HTMLButtonElement;

const printButton = document.getElementById("printResume") as HTMLButtonElement;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = (document.getElementById("fullName") as HTMLInputElement)
    .value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phoneNumber = (
    document.getElementById("phoneNumber") as HTMLInputElement
  ).value;
  const FormSkills = (document.getElementById("FormSkills") as HTMLInputElement)
    .value;
  const summary = (document.getElementById("summaryInput") as HTMLInputElement)
    .value;
  const education = (
    document.getElementById("educationInput") as HTMLInputElement
  ).value;
  const experience = (
    document.getElementById("experienceInput") as HTMLInputElement
  ).value;

  displayName.textContent = fullName;
  displayEmail.textContent = email;
  displayPhone.textContent = phoneNumber;
  displaySummary.textContent = summary;
  displayEducation.textContent = education;
  displayExperience.textContent = experience;
  displaySkills.innerHTML = "";
  const skillsArray = FormSkills.split(",");
  skillsArray.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill.trim();
    displaySkills.appendChild(li);
  });

  const userName = fullName.trim().toLowerCase().replace(" ", "_");
  const newUrl = `${window.location.origin}${window.location.pathname}resume_of_${userName}`;
  window.history.pushState(null, "", newUrl);

  formContainer.style.display = "none";
  resumeContainer.removeAttribute("hidden");
});

skillsButton.addEventListener("click", () => {
  const skillsSection = document.getElementById("skills") as HTMLElement;
  skillsSection.style.display =
    skillsSection.style.display === "none" ? "block" : "none";
});

summaryButton.addEventListener("click", () => {
  const summarySection = document.getElementById("summary") as HTMLElement;
  summarySection.style.display =
    summarySection.style.display === "none" ? "block" : "none";
});

experienceButton.addEventListener("click", () => {
  const experienceSection = document.getElementById(
    "work-experience"
  ) as HTMLElement;
  experienceSection.style.display =
    experienceSection.style.display === "none" ? "block" : "none";
});

printButton.addEventListener("click", () => {
  window.print();
});

