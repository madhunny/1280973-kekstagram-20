var n_photos = 25;
var n_comments = 5;

var names = ["Anton", "Katia", "Maks", "Sergej", "Olga", "Vika"];
var messages = [
  "Всё отлично!",
  "В целом всё неплохо.Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают.",
  "Как можно было поймать такой неудачный момент ? !",
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function makeComment() {
  var comments = {
    avatar: "img/avatar-" + getRandomInt(1, 6) + ".svg",
    message: messages[getRandomInt(0, messages.length)],
    name: names[getRandomInt(0, names.length)],
  };
  return comments;
}

function makePhotos() {
  var photos = [];
  for (var i = 1; i <= n_photos; i++) {
    var photo = {
      url: "photos/" + i + ".jpg",
      description: "text",
      likes: getRandomInt(15, 200),
      comments: [],
    };
    for (var j = 1; j <= n_comments; j++) {
      photo.comments.push(makeComment());
    }
    photos.push(photo);
  }
  return photos;
}

var photos = makePhotos();

var template = document.querySelector("#picture").content;
for (var i = 0; i < photos.length; i++) {
  var currPhoto = photos[i];
  var item = template.cloneNode(true);
  item.querySelector("a.picture").setAttribute("href", currPhoto.url);
  item.querySelector("img.picture__img").setAttribute("src", currPhoto.url);
  item.querySelector(".picture__likes").innerHTML = currPhoto.likes;
  item.querySelector(".picture__comments").innerHTML =
    currPhoto.comments.length;
  var fragment = new DocumentFragment();
  fragment.appendChild(item);
  document.querySelector("section.pictures").appendChild(fragment);
}

// Напишите функцию для создания массива из 25 сгенерированных JS - объектов.
// Каждый объект массива ‐ описание фотографии, опубликованной пользователем.

// Поля объекта:

// url, строка — адрес картинки вида photos / {{ i }}.jpg, где { { i } } это число от 1 до 25. Адреса картинок не должны повторяться.

// description, строка — описание фотографии.

// likes, число — количество лайков, поставленных фотографии.Случайное число от 15 до 200

// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии.
// Количество комментариев к каждой фотографии вы определяете на своё усмотрение.
// Все комментарии генерируются случайным образом.

// Пример описания объекта с комментарием:

// {
//   avatar: "img/avatar-6.svg",
//     message: "В целом всё неплохо. Но не всё.",
//       name: "Артем"
// }
// Поле avatar — это строка, значение которой формируется по правилу img / avatar - {{ случайное число от 1 до 6 }}.svg.

// Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
// Всё отлично!
// В целом всё неплохо.Но не всё.
// Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.
// Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
// Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
// Лица у людей на фотке перекошены, как будто их избивают.
// Как можно было поймать такой неудачный момент ? !

// Имена авторов также должны быть случайными.

// Аватарки подготовлены в директории img.
// Набор имён для комментаторов составьте сами.
// Подставляйте случайное имя в поле name.

// На основе данных, созданных в предыдущем пункте, и шаблона #picture создайте DOM - элементы,
// соответствующие фотографиям, и заполните их данными из массива:

// Адрес изображения url подставьте как src изображения.
// Количество лайков likes подставьте как текстовое содержание элемента.picture__likes.
// Количество комментариев comments подставьте как текстовое содержание элемента.picture__comments.
// Отрисуйте сгенерированные DOM - элементы в блок.pictures.
// Для вставки элементов используйте DocumentFragment.
