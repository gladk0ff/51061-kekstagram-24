export const errorContainerElement = document.querySelector('.errors-container');
export const errorContentElement = document.querySelector('.error__content');
export const errorCloseElement = document.querySelector('.errors__cancel');


errorCloseElement.addEventListener('click',()=>{
  errorContainerElement.classList.toggle('visually-hidden');
});

export const showError=(text)=>{
  errorContainerElement.classList.toggle('visually-hidden');
  errorContentElement.textContent = text;
};
