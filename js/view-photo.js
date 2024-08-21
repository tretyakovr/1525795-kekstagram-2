import { photosList } from './show-photos.js';

const SHOW_COMMENTS_COUNT = 5;
const modalView = document.querySelector('.big-picture');
const closeButton = modalView.querySelector('.big-picture__cancel');
const modalViewImg = document.querySelector('.big-picture__img img');


document.querySelector('.pictures').addEventListener('click', photoModalViewHandler);


function fillComments(commentsList) {
  const comments = document.querySelector('ul.social__comments');
  comments.innerHTML = '';

  const commentNode = document.createElement('template');
  commentNode.setAttribute('id', 'comment');
  commentNode.innerHTML = `
      <li class="social__comment">
        <img class="social__picture" src="" alt="" width="35" height="35">
        <p class="social__text"></p>
      </li>`;
  const commentTemplate = document.body.appendChild(commentNode).content.querySelector('li');

  const commentsFragment = document.createDocumentFragment();

  for (const {avatar, name, message} of commentsList.slice(0, SHOW_COMMENTS_COUNT)) {
    const commentItem = commentTemplate.cloneNode(true);
    commentItem.querySelector('img').setAttribute('src', avatar);
    commentItem.querySelector('img').setAttribute('alt', name);
    commentItem.querySelector('p').textContent = message;
    commentsFragment.appendChild(commentItem);
  }
  comments.appendChild(commentsFragment);
}


function getPhotoItem(photoNode) {
  return photosList[photoNode.dataset.id - 1];
}


function photoModalViewHandler(evt) {
  // Проверяем, что click был на картинке
  if (evt.target.nodeName === 'IMG') {
    modalView.classList.remove('hidden');

    // Добавляем события на закрытие модального окна
    document.addEventListener('keydown', checkEscKey);
    closeButton.addEventListener('click', closeModalViewHandler);

    // Получаем photo из preview и заполняем свойства полноразмерного изображения
    const {url, likes, comments, description} = getPhotoItem(evt.target.parentNode);
    modalViewImg.setAttribute('src', url);
    document.querySelector('.likes-count').textContent = likes;
    document.querySelector('.social__comment-total-count').textContent = comments.length;
    document.querySelector('.social__caption').textContent = description;

    fillComments(comments);

    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
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
