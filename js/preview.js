// Необходимые элементы для работы превью
const overlay = document.querySelector('.overlay');

const previewContainer = document.querySelector('.big-picture');
const previewImg = previewContainer.querySelector('.big-picture__img-preview');
const previewLikes = previewContainer.querySelector('.likes-count');
const previewCaption = previewContainer.querySelector('.social__caption');
const previewComments = previewContainer.querySelector('.comments-count');
const previewCloseButton = document.getElementById('picture-cancel');
const previewCommentsContainer = previewContainer.querySelector('.social__comments');

const commentTamplate = document.getElementById('social__comment').content;

// После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader,
// добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.
// спрятал пока сразу раз это временное решение
previewContainer.querySelector('.social__comment-count').classList.add('hidden');
previewContainer.querySelector('.comments-loader').classList.add('hidden');


const closePreview = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const handleEscapeKeyPress = (e) => {
  if (e.key === 'Escape') {
    closePreview();
  }
  document.body.removeEventListener('keydown', handleEscapeKeyPress);
};

overlay.addEventListener('click', (event) => {
  event.stopPropagation();
  if (event.target === overlay) {
    closePreview();
  }
});
previewCloseButton.addEventListener('click', closePreview);

/**
 * @desc создание комментариев на основе даннах
 * @param comments - массив комментариев
 * @return HTMLElement[]
 * */
const createComments = (comments) => comments.map((comment) => {
  const commentHTML = commentTamplate.cloneNode(true);

  const avatar = commentHTML.querySelector('.social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;

  const text = commentHTML.querySelector('.social__text');
  text.textContent = comment.message;

  return commentHTML;
});

/**
 * @desc
 *  обработчик клика по миниатюре для показа превью (модального окна),
 *  сохраняет данные о посте при первом вызове
 * @param postData - данные о посте
 * */
export const showPreview = (postData) => () => {
  previewContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', handleEscapeKeyPress);

  previewImg.src = postData.url;
  previewLikes.textContent = postData.likes;
  previewCaption.textContent = postData.likes;
  previewComments.textContent = postData.description;
  previewCommentsContainer.innerHTML = '';

  const commentsHTML = createComments(postData.comments);
  previewCommentsContainer.append(...commentsHTML);
};
