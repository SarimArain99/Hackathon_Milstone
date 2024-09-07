

const summaryButton = document.getElementById('toggle-summary') as HTMLButtonElement;
const skillsButton = document.getElementById('toggle-skills') as HTMLButtonElement;
const experienceButton = document.getElementById('toggle-experience') as HTMLButtonElement;

const summarySection = document.getElementById('summary') as HTMLElement;
const skillsSection = document.getElementById('skills') as HTMLElement;
const experienceSection = document.getElementById('work-experience') as HTMLElement;

summaryButton.addEventListener('click', () => {
  if (summarySection.style.display === 'none' || !summarySection.style.display) {
    summarySection.style.display = 'block';
  } else {
    summarySection.style.display = 'none';
  }
});

skillsButton.addEventListener('click', () => {
  if (skillsSection.style.display === 'none' || !skillsSection.style.display) {
    skillsSection.style.display = 'block';
  } else {
    skillsSection.style.display = 'none';
  }
});

experienceButton.addEventListener('click', () => {
  if (experienceSection.style.display === 'none' || !experienceSection.style.display) {
    experienceSection.style.display = 'block';
  } else {
    experienceSection.style.display = 'none';
  }
});
