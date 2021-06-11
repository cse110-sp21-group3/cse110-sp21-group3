import { createdJournalKey } from './storageKeys.js';

// Register service worker, if available option in browser
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

// Check to see if user has ever been on website before. If yes, send straight to daily log.
document.addEventListener('DOMContentLoaded', () => {
  const createdJournal = localStorage.getItem(createdJournalKey);
  if (createdJournal) {
    window.location.href = './home-dailylog/home.html';
  }
});

// Make button to send user to pick journal after onboarding.
const finishOnboardingBtn = document.getElementById('finish-onboarding');

finishOnboardingBtn.addEventListener('click', () => {
  window.location.href = './journal-creation/journal-picker.html';
});
