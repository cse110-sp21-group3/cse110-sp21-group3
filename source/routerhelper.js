import { router } from './router.js';
import { themeKey } from './storageKeys.js';
//when the page first loads go to hom or make a journal if you don't have one
document.addEventListener('DOMContentLoaded', () => {
    
    router.setState('home');
    
});

//when the back button is hit will go to right page
window.addEventListener('popstate', e => {
    
    router.setState(e.state?.page, true);
   
});