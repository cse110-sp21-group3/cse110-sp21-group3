import colorThemes from '../../colorThemes.js'
import { colorStyleKey } from '../../storageKeys.js';
import {populateEventWrappers, setTaskEditor} from './setupEditors.js'

// Set Display CSS Styles
let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === 'null') selectedColorStyle = 'default';

const root = document.documentElement;
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].background);

// Set event editors
document.addEventListener('DOMContentLoaded', () => {
    populateEventWrappers({0: [1], 1: ['', []]});
    setTaskEditor({0: [1], 1: ['', false, []]});
})