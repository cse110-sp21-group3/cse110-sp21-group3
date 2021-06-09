import { router } from '../../router.js';
/**
 * Menu
 */
const flyoutMenu = document.querySelector('navbar-elem').shadowRoot.querySelector('#nav');

function showMenu() {
  flyoutMenu.classList.add('show');
}

function hideMenu(e) {
  flyoutMenu.classList.remove('show');
  e.stopPropagation();
  document.body.style.overflow = 'auto';
}


/**
 * Hamburger menu button
 */
const menuButton = document.querySelector('.menu');
menuButton.addEventListener('click', showMenu, false);

/**
 * Close menu button
 */
const navSpan = document.querySelector('navbar-elem').shadowRoot.querySelector('.close-nav');
navSpan.addEventListener('click', hideMenu, false);
 
const buttonsA = document.querySelector('navbar-elem').shadowRoot.querySelectorAll(".nav-component");
Array.from(buttonsA).forEach(navto => {
  let loc = navto.getElementsByTagName("p")[0].innerHTML;
  console.log(loc);
  switch(loc) {
    
    case 'home':
      navto.addEventListener('click', () => {
        flyoutMenu.classList.remove('show');
        router.setState('home');
      });
      break;  
    case 'habits &amp; trends':
      navto.addEventListener('click', () => {
        router.setState('trends');
        flyoutMenu.classList.remove('show');
      });
      break;  
    case 'monthly log':
      navto.addEventListener('click', () => {
        router.setState('monthly-log');
        flyoutMenu.classList.remove('show');
      });
      break;  
    case 'past logs':
      navto.addEventListener('click', () => {
        router.setState('past-logs');
        flyoutMenu.classList.remove('show');
      });
      break;
    case 'collections':
      navto.addEventListener('click', () => {
        
        router.setState('collections');
        flyoutMenu.classList.remove('show');
      });
      break;  
    case 'settings':
      navto.addEventListener('click', () => {
        router.setState('settings');
        flyoutMenu.classList.remove('show');
      });
      break;  
  }
});