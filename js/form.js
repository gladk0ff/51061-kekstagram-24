const formView = document.querySelector('.img-upload__overlay');
const formCloseButton = document.getElementById('upload-cancel');
const overlay = document.querySelector('.overlay');

const previewUploadImage = document.querySelector('.img-upload__preview img');

const fieldFileUpload = document.getElementById('upload-file');
const fieldHashtags = document.querySelector('.text__hashtags');
const fieldComment = document.querySelector('.text__description');

const closePreview = () => {
  formView.classList.add('hidden');
  fieldFileUpload.value=null;
  document.body.classList.remove('modal-open');
};
formCloseButton.addEventListener('click', closePreview);

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

overlay.addEventListener('click', (event) => {
  event.stopPropagation();

  if (event.target === overlay) {
    closePreview();
  }
});

fieldFileUpload.addEventListener('change', () => {
  formView.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', handleEscapeKeyPress);

  const reader = new FileReader();
  reader.readAsDataURL(fieldFileUpload.files[0]);
  reader.onload = () => {
    previewUploadImage.src = reader.result;
  };
});

fieldHashtags.addEventListener('input',  (event)=> {
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

