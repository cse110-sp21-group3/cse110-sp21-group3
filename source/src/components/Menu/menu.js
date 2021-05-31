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
