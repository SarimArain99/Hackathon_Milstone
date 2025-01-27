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
const saveResumeToLocalStorage = (data) => {
    const userName = data.fullName.trim().toLowerCase().replace(/\s+/g, "_");
    localStorage.setItem(`resume_${userName}`, JSON.stringify(data));
    return userName;
};
const loadResumeFromLocalStorage = (userName) => {
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
window.addEventListener("load", handleQueryParams);
window.addEventListener("popstate", handleQueryParams);
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const resumeData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber")
            .value,
        skills: document.getElementById("FormSkills").value.split(","),
        summary: document.getElementById("summaryInput")
            .value,
        education: document.getElementById("educationInput")
            .value,
        experience: document.getElementById("experienceInput")
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
    }
    else {
        alert("No resume data available to share.");
    }
});
