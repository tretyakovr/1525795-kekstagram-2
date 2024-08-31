import { photosList } from './show-photos.js';
import { getArrayPages } from './pagination.js';

const SHOW_COMMENTS_COUNT = 5;
const modalView = document.querySelector('.big-picture');
const closeButton = modalView.querySelector('.big-picture__cancel');
const modalViewImg = document.querySelector('.big-picture__img img');
const commentsDiv = document.querySelector('ul.social__comments');
// let startCommentNum;
let comments;
let currentPageNum = 0;
let commentsPages = {};
let shownCommentsCount = 0;
const commentTemplateAsText = `
  <li class="social__comment">
    <img class="social__picture" src="" alt="" width="35" height="35">
    <p class="social__text"></p>
  </li>`;



// Обработка событий:
// на клик по миниатюре
document.querySelector('.pictures').addEventListener('click', photoModalViewHandler);
// на подгрузку комментариев
document.querySelector('.social__comments-loader').addEventListener('click', loadCommentsHandler);


// function getCommentsSlice() {
//   const fromNum = startCommentNum;
//   let toNum = fromNum + SHOW_COMMENTS_COUNT;

//   if (toNum > comments.length) {
//     toNum = comments.length;
//   }
//   document.querySelector('.social__comment-shown-count').textContent = toNum;

//   startCommentNum += SHOW_COMMENTS_COUNT;

//   return comments.slice(fromNum, toNum);
// }


// function fillComments00(commentsSlice) {
//   // Шаблон для заполнения комментариями
//   const commentNode = document.createElement('template');
//   commentNode.setAttribute('id', 'comment');
//   commentNode.innerHTML = `
//       <li class="social__comment">
//         <img class="social__picture" src="" alt="" width="35" height="35">
//         <p class="social__text"></p>
//       </li>`;
//   // Добавляем его в конец страницы
//   const commentTemplate = document.body.appendChild(commentNode).content.querySelector('li');

//   // Создаем фрагмент, куда будем вставлять заполненные шаблоны комментариев
//   const commentsFragment = document.createDocumentFragment();

//   // Проход по странице (срезу) комментариев
//   for (const {avatar, name, message} of commentsSlice) {
//     // Клонируем шаблон
//     const commentItem = commentTemplate.cloneNode(true);
//     // Заполняем шаблон данными из комментария
//     commentItem.querySelector('img').setAttribute('src', avatar);
//     commentItem.querySelector('img').setAttribute('alt', name);
//     commentItem.querySelector('p').textContent = message;

//     // Добавляем во фрагмент заполненный шаблон комментария
//     commentsFragment.appendChild(commentItem);
//   }
//   // Добавляем фрагмент в подготовленное место на странице
//   commentsDiv.appendChild(commentsFragment);
// }


function fillComments() {
  // Шаблон для заполнения комментариями
  const commentNode = document.createElement('template');
  commentNode.setAttribute('id', 'comment');
  commentNode.innerHTML = commentTemplateAsText;
  // Добавляем его в конец страницы
  const commentTemplate = document.body.appendChild(commentNode).content.querySelector('li');

  // Создаем фрагмент, куда будем вставлять заполненные шаблоны комментариев
  const commentsFragment = document.createDocumentFragment();

  // Проход по странице (срезу) комментариев
  for (const {avatar, name, message} of commentsPages[currentPageNum]) {
    // Клонируем шаблон
    const commentItem = commentTemplate.cloneNode(true);
    // Заполняем шаблон данными из комментария
    commentItem.querySelector('img').setAttribute('src', avatar);
    commentItem.querySelector('img').setAttribute('alt', name);
    commentItem.querySelector('p').textContent = message;

    // Добавляем во фрагмент заполненный шаблон комментария
    commentsFragment.appendChild(commentItem);
  }
  // Добавляем фрагмент в подготовленное место на странице
  commentsDiv.appendChild(commentsFragment);
  shownCommentsCount += commentsPages[currentPageNum].length;
  document.querySelector('.social__comment-shown-count').textContent = shownCommentsCount;
  currentPageNum += 1;
}


function loadCommentsHandler() {
  fillComments();
  // if (startCommentNum < comments.length) {
  //   // fillComments(getCommentsSlice());
  // }
}


function clearComments() {
  // Обнуляем комментарии
  currentPageNum = 0;
  commentsPages = {};
  shownCommentsCount = 0;
}

function getPhotoItem(photoNode) {
  const photoItem = photosList[photoNode.dataset.id - 1];
  comments = photoItem.comments;
  document.querySelector('.social__comment-total-count').textContent = comments.length;
  commentsPages = getArrayPages(comments, SHOW_COMMENTS_COUNT);

  return photoItem;
}


function photoModalViewHandler(evt) {
  // Проверяем, что click был на картинке
  if (evt.target.nodeName === 'IMG') {
    modalView.classList.remove('hidden');

    // Добавляем события на закрытие модального окна
    document.addEventListener('keydown', checkEscKey);
    closeButton.addEventListener('click', closeModalViewHandler);

    // Получаем photo из preview и заполняем свойства полноразмерного изображения
    clearComments();
    const {url, likes, description} = getPhotoItem(evt.target.parentNode);

    modalViewImg.setAttribute('src', url);
    document.querySelector('.likes-count').textContent = likes;
    document.querySelector('.social__caption').textContent = description;

    commentsDiv.innerHTML = '';

    // startCommentNum = 0;
    // fillComments(getCommentsSlice());
    fillComments();

    document.querySelector('body').classList.add('modal-open');
  }
}


function checkEscKey(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModalViewHandler();
  }
}


function closeModalViewHandler() {
  modalView.classList.add('hidden');
  document.body.classList.remove('modal-open');
  modalView.removeEventListener('keydown', checkEscKey);
  closeButton.removeEventListener('click', closeModalViewHandler);
}
