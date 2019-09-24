'use strict';

(function () {
  // Моковые данные для фотографий и комментариев
  var MOCK_PICTURE_TITLES = [
    'Мое рабочее место',
    'Зажгли вчера с ребятами',
    'Идеальный завтрак',
    'Зацените свежий look!',
    'Две загорелые коленки на фоне моря',
    'Королева спортзала',
    'Потратила на ногти ползарплаты'
  ];
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MOCK_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var COMMENTATORS = ['Каролина', 'Димон', 'Звезда Кестаграмма', 'Безымянный Качок', 'Эстет'];
  var MOCK_AVATARS_NUMBER = 6; // Число аватар-заглушек в папке
  var MOCK_PHOTOS_NUMBER = 5; // Число моковых объектов-фотографий

  // Создаем массив моковых аватарок
  var avatars = generateUrlArray(MOCK_AVATARS_NUMBER, 'img/avatar-', '.svg');

  // Создаем массив моковых фотографий
  var userPhotos = generatePhotos(MOCK_PHOTOS_NUMBER, 'photos/', '.jpg');

  // Выбираем случайное значение из массива

  var getRandomValue = function (array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  // Получаем случайное количество лайков к посту

  var generateLikes = function () {
    return Math.floor(Math.random() * (MAX_LIKES - MIN_LIKES + 1)) + MIN_LIKES;
  };

  // Создаем массив URL для картинок

  var generateUrlArray = function (arrayLength, fileName, fileExtension) {
    var array = [];
    var url = '';

    for (var i = 1; i <= arrayLength; i++) {
      url = fileName + String(i) + fileExtension;
      array.push(url);
    }

    return array;
  };

  // Создаем случайный моковый комментарий

  var generateComment = function () {
    var randomComment = {
      avatar: getRandomValue(avatars),
      message: getRandomValue(MOCK_COMMENTS),
      name: getRandomValue(COMMENTATORS)
    };

    return randomComment;
  };

  var generatePost = function (index) {
    var post = {
      url: userPhotos[index],
      description: MOCK_PICTURE_TITLES[0],
      likes: generateLikes(),
      comments: [generateComment(), generateComment()]
    };

    return post;
  };

  var post = {
    url: 'photos/25.jpg',
    description: MOCK_PICTURE_TITLES[0],
    likes: generateLikes(),
    comments: [generateComment(), generateComment()]
  }

  console.log(post);
})();
