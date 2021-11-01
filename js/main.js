import * as utils from './utils.js';
import {generateMockPost} from './mock-generator.js';
import {createThumbnails} from './thumbnail.js';
import './form.js';

utils.getRandomFromInterval(1, 7);
utils.hasStringLength('Ололо', 3);

// создания массива из 25 сгенерированных объектов.
// Каждый объект массива — описание фотографии, опубликованной пользователем.
// получение массива случайной длинны для набора комментариев
const mockPosts = [...'1234567891234567891234567'].map((value) => generateMockPost(value));
// наполнение миниатюрами контейнера "pictures" на основе данных
const containerThumbs = document.querySelector('.pictures');
const thumbsHtml = createThumbnails(mockPosts);
containerThumbs.append(...thumbsHtml);


