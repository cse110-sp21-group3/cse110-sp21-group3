import { router } from './router.js';

//redirects the page to the correct url
document.addEventListener('DOMContentLoaded', () => {
    if(window.location.hash == '/') {
        router.setState('home');
    }
    else {
        router.setState(window.location.hash.substring(1));
    }
});

//when the back button is hit will go to right page
window.addEventListener('popstate', e => {
    router.setState(e.state?.page, true);
});