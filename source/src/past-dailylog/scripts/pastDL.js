import { bulletTypes, bulletModifiers } from '../../components/TextEditor/Bullet/bulletTypes.js';
import colorThemes from '../../colorThemes.js';
import { colorStyleKey } from '../../storageKeys.js';

let selectedColorStyle = localStorage.getItem(colorStyleKey);
if (selectedColorStyle === 'null') selectedColorStyle = 'default';

// Set Display CSS Styles
const root = document.documentElement;
root.style.setProperty('--light-bg', colorThemes[selectedColorStyle].background);
root.style.setProperty('--main-bg', colorThemes[selectedColorStyle].main);

function getDailyLog(date) {
  // TODO: clear old daily log
  const container = document.querySelector('.past-dailylogs-container');

  // get daily log of date
  const data = JSON.parse(localStorage.getItem('dailyLogData')); //dailyLogArchive
  
  const bullets = (Object.values(data));
  bullets.shift();

  bullets.forEach((item) => {
      let div = document.createElement('div');
      div.innerHTML = `
          <style>
              p {
                  font-size: 1.5rem;
                  margin: 1rem;
              }
          </style>
          <p>${bulletTypes[item[2]]}&nbsp;${item[0]}</p>
      `;
      container.appendChild(div);

      const styles = {
          'font-style': bulletModifiers[item[3]]['font-style'],
          'font-weight': bulletModifiers[item[3]]['font-weight'],
          'text-decoration': item[1] ? 'line-through' : 'none',
      };
      Object.assign(div.style, styles);
  });
}

const title = document.getElementById('title');
title.addEventListener('change', () => {
  const [year, month, date] = title.value.split('-');
  const d = new Date();
  d.setDate(date);
  d.setMonth(month - 1);
  d.setFullYear(year);
  getDailyLog(d);
});

document.addEventListener('DOMContentLoaded', () => {
  const d = new Date();
  let date = d.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let month = d.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  const today = `${d.getFullYear()}-${month}-${date}`;
  title.value = today;
  getDailyLog(d);
});