import sampleData from './sampleData.js';

const key = 'sampleData';

let listDataTree = localStorage.getItem(key);
if (listDataTree === null) {
  // localStorage.setItem(key, JSON.stringify(sampleData));
  listDataTree = sampleData;
} else {
  listDataTree = JSON.parse(listDataTree);
}

const setSaveCallback = (data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
const list = document.querySelector('bullet-list');
list.setValue(listDataTree);
list.setSaveDataCallback(setSaveCallback);
