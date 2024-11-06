"use strict";
const form = document.getElementById("form");
const formContainer = document.getElementById("formContainer");
const resumeContainer = document.getElementById("resumeContainer");
const displayName = document.getElementById("displayName");
const displayEmail = document.getElementById("displayEmail");
const displayPhone = document.getElementById("displayPhone");
const displaySummary = document.getElementById("displaySummary");
const displayEducation = document.getElementById("displayEducation");
const displaySkills = document.getElementById("displaySkills");
const displayExperience = document.getElementById("displayExperience");
const summaryButton = document.getElementById("toggle-summary");
const skillsButton = document.getElementById("toggle-skills");
const experienceButton = document.getElementById("toggle-experience");
const printButton = document.getElementById("printResume");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const fullName = document.getElementById("fullName")
        .value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const FormSkills = document.getElementById("FormSkills").value;
    const summary = document.getElementById("summaryInput").value;
    const education = document.getElementById("educationInput").value;
    const experience = document.getElementById("experienceInput").value;
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
    const userName = fullName.trim().replace(" ", "-").toLowerCase();
    const newUrl = `${window.location.origin}${window.location.pathname}?resume-of-${userName}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    formContainer.style.display = "none";
    resumeContainer.removeAttribute("hidden");
});
skillsButton.addEventListener("click", () => {
    const skillsSection = document.getElementById("skills");
    skillsSection.style.display =
        skillsSection.style.display === "none" ? "block" : "none";
});
summaryButton.addEventListener("click", () => {
    const summarySection = document.getElementById("summary");
    summarySection.style.display =
        summarySection.style.display === "none" ? "block" : "none";
});
experienceButton.addEventListener("click", () => {
    const experienceSection = document.getElementById("work-experience");
    experienceSection.style.display =
        experienceSection.style.display === "none" ? "block" : "none";
});
printButton.addEventListener("click", () => {
    window.print();
});
