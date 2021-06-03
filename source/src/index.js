import { createdJournalKey } from './storageKeys.js';

document.addEventListener('DOMContentLoaded', () => {
    const createdJournal = localStorage.getItem(createdJournalKey);
    if (createdJournal) {
        window.location.href = './home-dailylog/home.html';
    } 
});

const finishOnboardingBtn = document.getElementById('finish-onboarding');

finishOnboardingBtn.addEventListener('click', () => {
  window.location.href = './journal-creation/journal-picker.html';
});
