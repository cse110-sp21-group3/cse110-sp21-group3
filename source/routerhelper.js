import { router } from './router.js';
import { themeKey } from './storageKeys.js';
//when the page first loads go to hom or make a journal if you don't have one
document.addEventListener('DOMContentLoaded', () => {
    //router.setState('home');
    
    if(window.location.hash == '/') {
        console.log("going home");
        router.setState('home');
    }
    else {
        console.log("going else");
        router.setState(window.location.hash.substring(1));
    }
    
    
});

//when the back button is hit will go to right page
window.addEventListener('popstate', e => {
    
    router.setState(e.state?.page, true);
   
});