// Необходимые элементы для работы превью
const overlayElement = document.querySelector('.overlay');

const previewContainerElement = document.querySelector('.big-picture');
const previewImgElement = previewContainerElement.querySelector('.big-picture__img-preview');
const previewLikesElement = previewContainerElement.querySelector('.likes-count');
const previewCaptionElement = previewContainerElement.querySelector('.social__caption');
const previewCommentsCountElement = previewContainerElement.querySelector('.comments-count');
const previewCommentsCountLoadedElement = previewContainerElement.querySelector('.comments-count-loaded');
const previewCloseButtonElement = document.getElementById('picture-cancel');
const previewCommentsContainerElement = previewContainerElement.querySelector('.social__comments');
const previewCommentsCounterElement = previewContainerElement.querySelector('.social__comment-count');
const previewCommentsLoaderElement = previewContainerElement.querySelector('.comments-loader');
const commentTemplateElement = document.getElementById('social__comment').content;


let commentData = null;
/**
 * @desc создание хранилища для информации о комментариях поста
 * @return {
 *   data - массив комментариев
 *   hasLoaded - кол-во загруженных
 *   length - общая длина
 * }
 * */
const generateCommentData=(comments)=>{
  commentData =  {
    data:comments,
    hasLoaded:0,
    length:comments.length,
  };
};
/**
 * @desc создание комментариев на основе даннах
 * @param comments - массив комментариев
 * @return HTMLElement[]
 * */
const createComments = (comments) => comments.map((comment) => {
  const commentHTML = commentTemplateElement.cloneNode(true);

  const avatar = commentHTML.querySelector('.social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;

  const text = commentHTML.querySelector('.social__text');
  text.textContent = comment.message;

  return commentHTML;
});

/**
 * @desc загрузка 5 комментариев или менее в зависимости от общей длины массива
 * */
const loadPartComments=()=>{
  const startIndex = commentData.hasLoaded;
  const newPartLength = commentData.length-commentData.hasLoaded>5 ? 5:commentData.length-commentData.hasLoaded;
  const endIndex =startIndex + newPartLength;
  const commentArray = commentData.data.slice(startIndex,endIndex);
  const commentsHTML = createComments(commentArray);
  previewCommentsContainerElement.append(...commentsHTML);
  previewCommentsCountLoadedElement.textContent = endIndex;
  commentData.hasLoaded = endIndex;
  /**
   * если загружены все :
   * -сбрасываем данные по комментам,
   * -скрываем кнопку "загрузить еще"
   * -удаляем обработчик загрузки
   */
  if (commentData.hasLoaded===commentData.length){
    previewCommentsLoaderElement.removeEventListener('click',loadPartComments);
    commentData=null;
    previewCommentsLoaderElement.classList.add('hidden');
  }
};

const closePreview = () => {
  overlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  previewCommentsLoaderElement.removeEventListener('click',loadPartComments);
  previewCommentsContainerElement.innerHTML = '';
};

const handleEscapeKeyPress = (e) => {
  if (e.key === 'Escape') {
    closePreview();
  }
  document.body.removeEventListener('keydown', handleEscapeKeyPress);
};

overlayElement.addEventListener('click', (event) => {
  event.stopPropagation();
  if (event.target === overlayElement) {
    closePreview();
  }
});
previewCloseButtonElement.addEventListener('click', closePreview);


/**
 * @desc
 *  обработчик клика по миниатюре для показа превью (модального окна),
 *  сохраняет данные о посте при первом вызове
 * @param postData - данные о посте
 * */
export const showPreview = (postData) => () => {
  previewContainerElement.classList.remove('hidden');
  previewCommentsCounterElement.classList.remove('hidden');
  previewCommentsLoaderElement.classList.remove('hidden');
  previewCommentsContainerElement.innerHTML = '';

  generateCommentData(postData.comments);

  previewCommentsCountElement.textContent = commentData.length;
  previewCommentsLoaderElement.addEventListener('click',loadPartComments);
  previewCommentsLoaderElement.click();

  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', handleEscapeKeyPress);

  previewImgElement.src = postData.url;
  previewLikesElement.textContent = postData.likes;
  previewCaptionElement.textContent = postData.likes;
};
