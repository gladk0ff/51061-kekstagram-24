import * as utils from './utils.js';
import {createThumbnails} from './thumbnail.js';
import './form/form.js';
import {loadPosts} from './api.js';
import {showError} from './errors.js';

utils.getRandomFromInterval(1, 7);
utils.hasStringLength('Ололо', 3);

loadPosts.then((response) => {
  if (response.ok) {
    response.json().then((data) => {
      const containerThumbs = document.querySelector('.pictures');
      const thumbsHtml = createThumbnails(data);
      containerThumbs.append(...thumbsHtml);
    });
  } else {
    showError('Данные не удалось загрузить');
  }
});
