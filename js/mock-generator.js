import {getRandomFromInterval} from './utils.js';

/**
 *
 * Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
 {
  id: 135,
  avatar: 'img/avatar-6.svg',
  message: 'В целом всё неплохо. Но не всё.',
  name: 'Артём',
}
 У каждого комментария есть идентификатор — id — случайное число. Идентификаторы не должны повторяться.
 Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg.
 Аватарки подготовлены в директории img.
 Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
 */
const commonComment = `
 Всё отлично!
 В целом всё неплохо. Но не всё.
 Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
 Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
 Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
 Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!
 Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
 `;
const generateMockComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomFromInterval(1, 6)}.svg`,
  message: commonComment.slice(0, getRandomFromInterval(11, commonComment.length)),
  name: `userName_${id}`,
});

/**
 *  Структура каждого объекта должна быть следующей:
 id, число — идентификатор описания. Это число от 1 до 25. Идентификаторы не должны повторяться.
 url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
 description, строка — описание фотографии. Описание придумайте самостоятельно.
 likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
 comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии вы определяете на своё усмотрение.
 */
const commonDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie quam non nibh dapibus placerat. Praesent maximus rutrum felis, sed venenatis risus. In quis odio varius, porta mi eu, ullamcorper orci. Morbi quis sodales neque. Nulla at bibendum nibh. Morbi vel interdum urna, eget pellentesque elit. Donec at ligula suscipit, egestas tortor nec, cursus leo. Aenean vel nunc scelerisque, imperdiet ligula eu, finibus mi. Suspendisse dignissim mauris et leo maximus consequat.';
const generateMockPost = (postId) => {
  // получение массива случайной длинны для набора комментариев
  const commentsArray = [...('123456878'.slice(0, getRandomFromInterval(1, 7)))];

  return {
    postId,
    url: `photos/${postId}.jpg`,
    description: commonDescription.slice(0, getRandomFromInterval(1, commonDescription.length)),
    likes: getRandomFromInterval(15, 200),
    comments: commentsArray.map((value, index) => {
      const commentId = `1${index}${postId}`;
      return generateMockComment(commentId);
    }),
  };
};

export {
  generateMockComment,
  generateMockPost
};
