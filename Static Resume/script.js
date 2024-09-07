"use strict";
const toggleSummaryButton = document.getElementById('toggle-summary');
const toggleSkillsButton = document.getElementById('toggle-skills');
const toggleExperienceButton = document.getElementById('toggle-experience');

const summarySection = document.getElementById('summary');
const skillsSection = document.getElementById('skills');
const experienceSection = document.getElementById('work-experience');

toggleSummaryButton.addEventListener('click', () => {
    if (summarySection.style.display === 'none' || !summarySection.style.display) {
        summarySection.style.display = 'block';
    }
    else {
        summarySection.style.display = 'none';
    }
});
toggleSkillsButton.addEventListener('click', () => {
    if (skillsSection.style.display === 'none' || !skillsSection.style.display) {
        skillsSection.style.display = 'block';
    }
    else {
        skillsSection.style.display = 'none';
    }
});
toggleExperienceButton.addEventListener('click', () => {
    if (experienceSection.style.display === 'none' || !experienceSection.style.display) {
        experienceSection.style.display = 'block';
    }
    else {
        experienceSection.style.display = 'none';
    }
});
