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

  // Выбираем случайное значение из массива

  var getRandomValue = function (array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  // Получаем случайное количество лайков к посту

  var generateLikes = function () {
    return Math.floor(Math.random() * (MAX_LIKES - MIN_LIKES + 1)) + MIN_LIKES;
  };

  // Создаем массив моковых аватарок

  var generateAvatars = function () {
    var avatarsArray = [];
    var avatarUrl = '';

    for (var i = 1; i <= MOCK_AVATARS_NUMBER; i++) {
      avatarUrl = 'img/avatar-' + i + '.svg';
      avatarsArray.push(avatarUrl);
    }

    return avatarsArray;
  };

  // Создаем случайный моковый комментарий

  var generateComment = function () {
    var avatars = generateAvatars(MOCK_COMMENTS); // Вызов функции перенести в приличное место

    var randomComment = {
      avatar: getRandomValue(avatars),
      message: getRandomValue(MOCK_COMMENTS),
      name: getRandomValue(COMMENTATORS)
    };

    return randomComment
  };

  var post = {
    url: 'photos/25.jpg',
    description: MOCK_PICTURE_TITLES[0],
    likes: generateLikes(),
    comments: [generateComment(), generateComment()]
  }

  console.log(post);
})();
