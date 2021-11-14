export const errorsContainer = document.querySelector('.errors-container');
export const errorBlock = document.querySelector('.error');
export const errorContent = document.querySelector('.error__content');
export const errorClose = document.querySelector('.errors__cancel');


errorClose.addEventListener('click',()=>{
  errorsContainer.classList.toggle('visually-hidden');
});

export const showError=(text)=>{
  errorsContainer.classList.toggle('visually-hidden');
  errorContent.textContent = text;
};
