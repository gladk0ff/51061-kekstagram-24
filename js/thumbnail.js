import { showPreview } from './preview.js';

/**
 * @description функция для создания миниатюр-изображений
 * @param posts - данные постов пользователей
 * @return HTMLElement[] - массив элементов в соответствии с <template id="picture">
 * */
export const createThumbnails = (posts) => {
  const thumbTemplateElement = document.getElementById('picture').content.querySelector('.picture');
  return posts.map((post) => {
    const thumb = thumbTemplateElement.cloneNode(true);
    thumb.addEventListener('click', showPreview(post));

    const img = thumb.querySelector('.picture__img');
    img.src = post.url;

    const likes = thumb.querySelector('.picture__likes');
    likes.textContent = post.likes;

    const comments = thumb.querySelector('.picture__comments');
    comments.textContent = post.comments.length;

    return thumb;
  });
};
