import {
  fieldComment,
  fieldFileUpload,
  fieldHashtags, filterList,
  formCloseButton,
  formView, overlay, previewUploadImage, sliderContainer
} from './formNodes.js';
import {initScaleControls, removeScaleListeners, setScaleControlValue} from './formImageScale.js';
import {handleChangeFilters, initSlider, removeFiltersListeners} from './formImageFilters.js';


fieldHashtags.addEventListener('input', (event) => {
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
  formView.classList.add('hidden');
  fieldFileUpload.value = null;
  document.body.classList.remove('modal-open');
  removeScaleListeners();
  removeFiltersListeners();
};

formCloseButton.addEventListener('click', closePreview);
overlay.addEventListener('click', (event) => {
  event.stopPropagation();
  if (event.target === overlay) {
    closePreview();
  }
});

const handleEscapeKeyPress = (e) => {
  if (e.target === fieldHashtags
    || e.target === fieldComment) {
    return;
  }
  if (e.key === 'Escape') {
    closePreview();
  }
  document.body.removeEventListener('keydown', handleEscapeKeyPress);
};

fieldFileUpload.addEventListener('change', () => {
  formView.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', handleEscapeKeyPress);
  sliderContainer.style.visibility='hidden';

  const reader = new FileReader();
  reader.readAsDataURL(fieldFileUpload.files[0]);
  reader.onload = () => {
    previewUploadImage.src = reader.result;
    setScaleControlValue(100);
  };

  initSlider();
  filterList.addEventListener('click', handleChangeFilters);
  initScaleControls();
});


