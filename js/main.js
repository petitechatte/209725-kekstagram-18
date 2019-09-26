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
  var MAX_COMMENTS = 15;
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
  var MOCK_PHOTOS_NUMBER = 25; // Число моковых объектов-фотографий

  // Находим в разметке шаблон для оформления фотографий пользователей

  var template = document.querySelector('#picture').content;

  // Выбираем случайное значение из массива

  var getRandomValue = function (valuesList) {
    var randomIndex = Math.floor(Math.random() * valuesList.length);
    return valuesList[randomIndex];
  };

  // Получаем случайное значение из диапазона

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Создаем массив URL для картинок

  var generatePicturesUrl = function (picturesNumber, fileName, fileExtension) {
    var pictures = [];
    var url = '';

    for (var i = 1; i <= picturesNumber; i++) {
      url = fileName + String(i) + fileExtension;
      pictures.push(url);
    }

    return pictures;
  };

  // Создаем массив моковых аватарок
  var avatars = generatePicturesUrl(MOCK_AVATARS_NUMBER, 'img/avatar-', '.svg');

  // Создаем массив моковых фотографий
  var userPhotos = generatePicturesUrl(MOCK_PHOTOS_NUMBER, 'photos/', '.jpg');

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
    var photoComments = [];
    var currentComment = {};

    for (var i = 0; i < commentsNumber; i++) {
      currentComment = generateComment();
      photoComments.push(currentComment);
    }
    return photoComments;
  };

  // Собираем пост со случайными комментариями

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

  var generatePostsList = function () {
    var posts = [];
    var currentPost = {};

    for (var i = 0; i < MOCK_PHOTOS_NUMBER; i++) {
      currentPost = generatePost(i);
      posts.push(currentPost);
    }

    return posts;
  };

  var photoPosts = generatePostsList();

  // Создаем разметку для поста с фотографией

  var createPhotoCard = function (index) {
    var currentPost = photoPosts[index];
    var photoCard = template.cloneNode(true);
    var picture = photoCard.querySelector('.picture__img');
    var pictureLikesNumber = photoCard.querySelector('.picture__likes');
    var pictureCommentsNumber = photoCard.querySelector('.picture__comments');

    picture.src = currentPost.url;
    picture.alt = currentPost.description;
    pictureLikesNumber.textContent = currentPost.likes;
    pictureCommentsNumber.textContent = currentPost.comments.length;

    return photoCard;
  };

  // Добавляем фотографии на страницу

  var renderPhotos = function () {
    var picturesBlock = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    var currentCard;

    for (var i = 0; i < MOCK_PHOTOS_NUMBER; i++) {
      currentCard = createPhotoCard(i);
      fragment.appendChild(currentCard);
    }

    picturesBlock.appendChild(fragment);
  };

  renderPhotos();
})();
