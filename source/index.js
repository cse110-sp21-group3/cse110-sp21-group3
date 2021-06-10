import { createdJournalKey } from './storageKeys.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, (err) => {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const createdJournal = localStorage.getItem(createdJournalKey);
  if (createdJournal) {
    window.location.href = './public';
  }
});

const finishOnboardingBtn = document.getElementById('finish-onboarding');

finishOnboardingBtn.addEventListener('click', () => {
  window.location.href = './journal-creation/journal-picker.html';
});