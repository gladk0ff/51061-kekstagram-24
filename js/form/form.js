import {
  fieldCommentElement,
  fieldFileUploadElement,
  fieldHashtagsElement, filterListElement,
  formCloseButtonElement,
  formViewElement,
  overlayElement,
  previewUploadImageElement,
  sliderContainerElement,
  formElement
} from './formNodes.js';
import {initScaleControl, removeScaleListeners, setScaleControlValue} from './formImageScale.js';
import {handleChangeFilters, initSlider, removeFiltersListeners} from './formImageFilters.js';
import {createPost} from '../api.js';
import {showError} from '../errors.js';


fieldHashtagsElement.addEventListener('input', (event) => {
  const input = event.target;
  const value = input.value;
  input.setCustomValidity('');

  const hashtags = value.toLowerCase();
  const hashtagsArray = hashtags.split(' ');
  const matchCount = hashtagsArray.reduce((acc, item) => {
    const founds = hashtags.match(new RegExp(`^${item}`, 'g'));

    if (founds) {
      acc += founds.length;
    }
    return acc;
  }, 0);
  if (matchCount !== hashtagsArray.length) {
    input.setCustomValidity('есть одинаковые теги');
  }
});

const closePreview = () => {
  formViewElement.classList.add('hidden');
  fieldFileUploadElement.value = null;
  document.body.classList.remove('modal-open');
  removeScaleListeners();
  removeFiltersListeners();
};

formCloseButtonElement.addEventListener('click', closePreview);
overlayElement.addEventListener('click', (event) => {
  event.stopPropagation();
  if (event.target === overlayElement) {
    closePreview();
  }
});

const handleEscapeKeyPress = (e) => {
  if (e.target === fieldHashtagsElement
    || e.target === fieldCommentElement) {
    return;
  }
  if (e.key === 'Escape') {
    closePreview();
  }
  document.body.removeEventListener('keydown', handleEscapeKeyPress);
};

fieldFileUploadElement.addEventListener('change', () => {
  formViewElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', handleEscapeKeyPress);
  sliderContainerElement.style.visibility = 'hidden';

  const reader = new FileReader();
  reader.readAsDataURL(fieldFileUploadElement.files[0]);
  reader.onload = () => {
    previewUploadImageElement.src = reader.result;
    setScaleControlValue(100);
  };

  initSlider();
  filterListElement.addEventListener('click', handleChangeFilters);
  initScaleControl();
});

formElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(formElement);
  createPost(formData).then(() => {
    formElement.reset();
    const successMessageTemplate = document.getElementById('success').content.querySelector('.success');
    const successMessage = successMessageTemplate.cloneNode(true);
    const successMessageButton = successMessage.querySelector('.success__button');
    document.body.append(successMessage);
    successMessageButton.addEventListener('click', () => {
      successMessage.remove();
    });
    closePreview();
  }).catch((error) => {
    showError(`Не удалось загрузить изображение : ${error.message}`);
  });
});


