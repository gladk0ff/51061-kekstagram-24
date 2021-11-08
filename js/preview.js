// Необходимые элементы для работы превью
const overlay = document.querySelector('.overlay');

const previewContainer = document.querySelector('.big-picture');
const previewImg = previewContainer.querySelector('.big-picture__img-preview');
const previewLikes = previewContainer.querySelector('.likes-count');
const previewCaption = previewContainer.querySelector('.social__caption');
const previewCommentsCount = previewContainer.querySelector('.comments-count');
const previewCommentsCountLoaded = previewContainer.querySelector('.comments-count-loaded');
const previewCloseButton = document.getElementById('picture-cancel');
const previewCommentsContainer = previewContainer.querySelector('.social__comments');
const previewCommentsCounter = previewContainer.querySelector('.social__comment-count');
const previewCommentsLoader = previewContainer.querySelector('.comments-loader');
const commentTemplate = document.getElementById('social__comment').content;


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
  const commentHTML = commentTemplate.cloneNode(true);

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
  previewCommentsContainer.append(...commentsHTML);
  previewCommentsCountLoaded.textContent = endIndex;
  commentData.hasLoaded = endIndex;
  /**
   * если загружены все :
   * -сбрасываем данные по комментам,
   * -скрываем кнопку "загрузить еще"
   * -удаляем обработчик загрузки
   */
  if (commentData.hasLoaded===commentData.length){
    previewCommentsLoader.removeEventListener('click',loadPartComments);
    commentData=null;
    previewCommentsLoader.classList.add('hidden');
  }
};

const closePreview = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  previewCommentsLoader.removeEventListener('click',loadPartComments);
  previewCommentsContainer.innerHTML = '';
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
 * @desc
 *  обработчик клика по миниатюре для показа превью (модального окна),
 *  сохраняет данные о посте при первом вызове
 * @param postData - данные о посте
 * */
export const showPreview = (postData) => () => {
  previewContainer.classList.remove('hidden');
  previewCommentsCounter.classList.remove('hidden');
  previewCommentsLoader.classList.remove('hidden');
  previewCommentsContainer.innerHTML = '';

  generateCommentData(postData.comments);

  previewCommentsCount.textContent = commentData.length;
  previewCommentsLoader.addEventListener('click',loadPartComments);
  previewCommentsLoader.click();

  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', handleEscapeKeyPress);

  previewImg.src = postData.url;
  previewLikes.textContent = postData.likes;
  previewCaption.textContent = postData.likes;
};
