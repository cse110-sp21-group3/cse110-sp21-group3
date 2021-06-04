/**
 * Menu
 */
import { router } from '../../router.js';

let flyoutMenu = document.querySelector('navbar-elem').shadowRoot.querySelector('#nav');

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
let menuButton = document.querySelector('.menu');
menuButton.addEventListener('click', showMenu, false);

let oldbodyid = document.body.id;

/**
 * Close menu button
 */
let navSpan = document.querySelector('navbar-elem').shadowRoot.querySelector('.close-nav');
navSpan.addEventListener('click', hideMenu, false);


const callback = function (mutations) {
    mutations.forEach(function (mutation) {
      if (document.body.id != oldbodyid) {
        
        oldbodyid = document.body.id;
        
        setup();
      }
  });  
};
const observer = new MutationObserver(callback);
const config = { attributes: true };
observer.observe(document.body, config);

function setup() {
  

  flyoutMenu = document.querySelector('navbar-elem').shadowRoot.querySelector('#nav');
  menuButton = document.querySelector('.menu');
  menuButton.addEventListener('click', showMenu, false);

  const navSpan = document.querySelector('navbar-elem').shadowRoot.querySelector('.close-nav');
  
  navSpan.addEventListener('click', hideMenu, false);
  const buttonsA = document.querySelector('navbar-elem').shadowRoot.querySelectorAll(".nav-component")
  Array.from(buttonsA).forEach(navto => {
  let loc = navto.getElementsByTagName("p")[0].innerHTML;
    switch(loc) {
      case 'home':
        navto.addEventListener('click', () => {
          //console.log(loc);
          router.setState('home');
        });
        break;  
      case 'statistics':
        navto.addEventListener('click', () => {
          
          router.setState('trends');
        });
        break;  
      case 'monthly log':
        navto.addEventListener('click', () => {
          console.log(loc);
          router.setState('monthly-log');
        });
        break;  
      case 'collections':
        navto.addEventListener('click', () => {
          console.log(loc);
          router.setState('settings');
        });
        break;  
      case 'settings':
        navto.addEventListener('click', () => {
          console.log(loc);
          router.setState('settings');
        });
        break;  
    }
  
  });
}

setup();