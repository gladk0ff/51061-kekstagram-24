import * as utils from './utils.js';
import {generateMockPost} from './mock-generator.js';

utils.getRandomFromInterval(1, 7);
utils.hasStringLength('Ололо', 3);
// создания массива из 25 сгенерированных объектов.
// Каждый объект массива — описание фотографии, опубликованной пользователем.
// получение массива случайной длинны для набора комментариев

// консоль нельзя, но и не использовать нельзя - поэтому только такой вариант =)
// eslint-disable-next-line
const mockPosts = [...'0123456789012345678901234'].map((value, index) => generateMockPost(index));
