import { bulletTypes, bulletModifiers } from '../../components/TextEditor/Bullet/bulletTypes.js';
import colorThemes from '../../colorThemes.js';
import { colorStyleKey } from '../../storageKeys.js';

let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === 'null') selectedColorStyle = 'default';

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].background);

function saveDailyLog() {
    const data = JSON.parse(localStorage.getItem('dailyLogData')); //dailyLogArchive
    
    const bullets = (Object.values(data));
    bullets.shift();

  
    bullets.forEach((item) => {
        let div = document.createElement('div');
        div.innerHTML = `
            <style>
                * {
                    font-family: 'Nunito', sans-serif;
                }
                .past-container {
                    border: 2px solid black;
                    margin-top: 1rem;
                    padding-left: 1rem;
                    border-radius: 2rem;
                    box-shadow: 0.5rem 0.5rem;
                }
                p {
                    font-size: 1.5rem;
                }
            </style>
            <div class="past-container">
                <p>${bulletTypes[item[2]]}&nbsp;${item[0]}</p>
            </div>
        `;
        document.getElementsByClassName('past-dailylogs-container')[0].appendChild(div);


        const styles = {
            'font-style': bulletModifiers[item[3]]['font-style'],
            'font-weight': bulletModifiers[item[3]]['font-weight'],
            'text-decoration': item[1] ? 'line-through' : 'none',
        };
        Object.assign(div.style, styles);

    });
    
  
}

document.addEventListener('DOMContentLoaded', () => {
    saveDailyLog();
});