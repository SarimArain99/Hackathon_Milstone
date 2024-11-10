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
const shareButton = document.getElementById("shareResume");
const displayResumeData = (data) => {
    displayName.textContent = data.fullName;
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
const saveResumeToLocalStorage = (data) => {
    const userName = data.fullName.trim().toLowerCase().replace(/\s+/g, "_");
    localStorage.setItem(`resume_${userName}`, JSON.stringify(data));
    return userName;
};
const loadResumeFromLocalStorage = (userName) => {
    const data = localStorage.getItem(`resume_${userName}`);
    return data ? JSON.parse(data) : null;
};
const handleHashChange = () => {
    const hash = window.location.hash;
    const match = hash.match(/^#resume_of_(.+)$/);
    if (match) {
        const userName = match[1];
        const resumeData = loadResumeFromLocalStorage(userName);
        if (resumeData) {
            formContainer.style.display = "none";
            resumeContainer.removeAttribute("hidden");
            displayResumeData(resumeData);
        }
        else {
            formContainer.style.display = "block";
            resumeContainer.setAttribute("hidden", "");
        }
    }
    else {
        formContainer.style.display = "block";
        resumeContainer.setAttribute("hidden", "");
    }
};
window.addEventListener("hashchange", handleHashChange);
window.addEventListener("load", handleHashChange);
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const resumeData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        skills: document.getElementById("FormSkills").value.split(","),
        summary: document.getElementById("summaryInput").value,
        education: document.getElementById("educationInput").value,
        experience: document.getElementById("experienceInput").value
    };
    const userName = saveResumeToLocalStorage(resumeData);
    window.location.hash = `resume_of_${userName}`;
    formContainer.style.display = "none";
    resumeContainer.removeAttribute("hidden");
    displayResumeData(resumeData);
});
skillsButton.addEventListener("click", () => {
    const skillsSection = document.getElementById("skills");
    skillsSection.style.display = skillsSection.style.display === "none" ? "block" : "none";
});
summaryButton.addEventListener("click", () => {
    const summarySection = document.getElementById("summary");
    summarySection.style.display = summarySection.style.display === "none" ? "block" : "none";
});
experienceButton.addEventListener("click", () => {
    const experienceSection = document.getElementById("work-experience");
    experienceSection.style.display = experienceSection.style.display === "none" ? "block" : "none";
});
printButton.addEventListener("click", () => {
    window.print();
});
shareButton.addEventListener("click", () => {
    const hash = window.location.hash;
    const match = hash.match(/^#resume_of_(.+)$/);
    if (match) {
        const userName = match[1];
        const resumeUrl = `${window.location.origin}${window.location.pathname}#resume_of_${userName}`;
        navigator.clipboard
            .writeText(resumeUrl)
            .then(() => {
            alert("Resume link copied to clipboard!");
        })
            .catch(() => {
            alert("Failed to copy the link. Please try again.");
        });
    }
    else {
        alert("No resume data available to share.");
    }
});
