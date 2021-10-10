//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomFromInterval = (min, max) => {
  if (max < 0 || min < 0) {
    throw 'диапазон может быть только положительный, включая ноль.';
  }
  if (max <= min) {
    throw 'Параметры заданы неверно : max > min';
  }
  return Math.floor(Math.random() * (max - min) + min);
};


//Функция для проверки максимальной длины строки.
const hasStringLength = (str, limit) => {
  if (!str || !limit) {
    throw 'Не заданы параметры функции';
  }

  return str.length <= limit;
};


export {
  hasStringLength,
  getRandomFromInterval
};

