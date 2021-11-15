export const loadPosts = fetch('https://24.javascript.pages.academy/kekstagram/data');

export const createPosts = (data) => fetch('https://24.javascript.pages.academy/kekstagram', {
  method: 'POST',
  body: data,
});
