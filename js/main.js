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
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 10;
  var MOCK_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var COMMENTATORS = ['Каролина', 'Димон', 'Звезда Кестаграмма', 'Безымянный Качок', 'Эстет', 'Нелюбитель'];
  var MOCK_AVATARS_NUMBER = 6; // Число аватар-заглушек в папке
  var MOCK_PHOTOS_NUMBER = 5; // Число моковых объектов-фотографий

  // Выбираем случайное значение из массива

  var getRandomValue = function (array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  // Получаем случайное значение из диапазона

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

  // Создаем массив моковых аватарок
  var avatars = generateUrlArray(MOCK_AVATARS_NUMBER, 'img/avatar-', '.svg');

  // Создаем массив моковых фотографий
  var userPhotos = generateUrlArray(MOCK_PHOTOS_NUMBER, 'photos/', '.jpg');

  // Создаем случайный моковый комментарий

  var generateComment = function () {
    var randomComment = {
      avatar: getRandomValue(avatars),
      message: getRandomValue(MOCK_COMMENTS),
      name: getRandomValue(COMMENTATORS)
    };

    return randomComment;
  };

  // Создаем список комментариев к посту

  var generateCommentsList = function () {
    // Получаем случайное количество комментариев к посту
    var commentsNumber = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
    var commentsList = [];
    var currentComment;

    for (var i = 0; i < commentsNumber; i++) {
      currentComment = generateComment();
      commentsList.push(currentComment);
    }
    return commentsList;
  };

  // Собираем пост с комментариями

  var generatePost = function (index) {

    var post = {
      url: userPhotos[index],
      description: getRandomValue(MOCK_PICTURE_TITLES),
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: generateCommentsList()
    };

    return post;
  };

  // Собираем массив постов

  var generatePostsArray = function () {
    var postsArray = [];
    var currentPost;

    for (var i = 0; i < MOCK_PHOTOS_NUMBER; i++) {
      currentPost = generatePost(i);
      postsArray.push(currentPost);
    }

    return postsArray;
  };

  var postsArray = generatePostsArray();

  // Создаем разметку для поста с фотографией

  var createElement = function (index) {
    var currentPost = postsArray[index];
    var template = document.querySelector('#picture');
    var element = template.content.querySelector('.picture');
    var picture = element.querySelector('.picture__img');
    var pictureLikes = element.querySelector('.picture__likes');
    var pictureComments = element.querySelector('.picture__comments');

    picture.src = currentPost.url;
    picture.alt = currentPost.description;
    pictureLikes.textContent = currentPost.likes;
    pictureComments.textContent = currentPost.comments.length;

    return element;
  };
})();
