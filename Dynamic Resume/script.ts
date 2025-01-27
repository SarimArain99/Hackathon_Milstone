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
const shareButton = document.getElementById("shareResume") as HTMLButtonElement;

interface ResumeData {
  fullName: string;
  email: string;
  phoneNumber: string;
  skills: string[];
  summary: string;
  education: string;
  experience: string;
}

const displayResumeData = (data: ResumeData) => {
  displayName.textContent = data.fullName.toUpperCase();
  displayEmail.textContent = data.email;
  displayPhone.textContent = data.phoneNumber;
  displaySummary.textContent = data.summary;
  displayEducation.textContent = data.education;
  displayExperience.textContent = data.experience;
  displaySkills.innerHTML = "";
  data.skills.forEach((skill) => {
    const li = document.createElement("li");
    li.textContent = skill.trim();
    displaySkills.appendChild(li);
  });
};

const saveResumeToLocalStorage = (data: ResumeData) => {
  const userName = data.fullName.trim().toLowerCase().replace(/\s+/g, "_");
  localStorage.setItem(`resume_${userName}`, JSON.stringify(data));
  return userName;
};

const loadResumeFromLocalStorage = (userName: string): ResumeData | null => {
  const data = localStorage.getItem(`resume_${userName}`);
  return data ? JSON.parse(data) : null;
};

const handleQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const userName = params.get("resume_of");

  if (userName) {
    const resumeData = loadResumeFromLocalStorage(userName);
    if (resumeData) {
      formContainer.style.display = "none";
      resumeContainer.removeAttribute("hidden");
      displayResumeData(resumeData);
    } else {
      formContainer.style.display = "block";
      resumeContainer.setAttribute("hidden", "");
    }
  } else {
    formContainer.style.display = "block";
    resumeContainer.setAttribute("hidden", "");
  }
};
window.addEventListener("load", handleQueryParams);
window.addEventListener("popstate", handleQueryParams);
form.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  const resumeData: ResumeData = {
    fullName: (document.getElementById("fullName") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    phoneNumber: (document.getElementById("phoneNumber") as HTMLInputElement)
      .value,
    skills: (
      document.getElementById("FormSkills") as HTMLInputElement
    ).value.split(","),
    summary: (document.getElementById("summaryInput") as HTMLInputElement)
      .value,
    education: (document.getElementById("educationInput") as HTMLInputElement)
      .value,
    experience: (document.getElementById("experienceInput") as HTMLInputElement)
      .value,
  };

  const userName = saveResumeToLocalStorage(resumeData);
  const params = new URLSearchParams(window.location.search);
  params.set("resume_of", userName);
  window.history.pushState({}, "", `?${params.toString()}`);

  formContainer.style.display = "none";
  resumeContainer.removeAttribute("hidden");
  displayResumeData(resumeData);
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

shareButton.addEventListener("click", () => {
  const params = new URLSearchParams(window.location.search);
  const userName = params.get("resume_of");

  if (userName) {
    const resumeUrl = `${window.location.origin}${window.location.pathname}?resume_of=${userName}`;

    navigator.clipboard
      .writeText(resumeUrl)
      .then(() => {
        alert("Link Copied!!!");
      })
      .catch(() => {
        alert("Failed to copy the link.");
      });
  } else {
    alert("No resume data available to share.");
  }
});
