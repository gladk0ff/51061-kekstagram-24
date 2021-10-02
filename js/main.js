//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomFromInterval = (min, max)=> {
  if (max < 0 || min < 0) {
    console.error('диапазон может быть только положительный, включая ноль.');
    return;
  }
  if (max <= min) {
    console.error('переметры заданы неверно : max > min');
    return;
  }
  return Math.floor(Math.random() * (max - min) + min);
}
getRandomFromInterval(1, 7);

//Функция для проверки максимальной длины строки.
const hasStringLength=(str, limit)=> {
  if (!str || !limit) {
    console.error('Не заданы параметры функции');
  }

  return str.length <= limit;
}
hasStringLength('Ололо', 3);
