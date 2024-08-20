import { photosList } from './get-photos';

const DEFAULT_COMMENTS_COUNT = 5;

document.querySelector('.pictures').addEventListener('click', photoModalViewHandler);

function photoModalViewHandler(evt) {
  if (evt.target.nodeName === 'IMG') {
    const bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');
    bigPicture.addEventListener('keydown', checkEvtKey);
    bigPicture.querySelector('.big-picture__cancel').addEventListener('click', closeModalViewHandler);

    const parentNode = evt.target.parentNode;
    const photoId = parentNode.getAttribute('data-id');
    const photoItem = photosList[photoId - 1];
    const bigPictureImg = document.querySelector('.big-picture__img img');

    bigPictureImg.setAttribute('src', photoItem.url);
    document.querySelector('.likes-count').textContent = photoItem.likes;
    document.querySelector('.social__comment-total-count').textContent = photoItem.comments.length;
    document.querySelector('.social__caption').textContent = photoItem.description;

    // Очистить содержимое ul.social__comments
    const comments = document.querySelector('ul.social__comments');
    comments.innerHTML = '';

    const commentCount = photoItem.comments.length <= DEFAULT_COMMENTS_COUNT ? photoItem.comments.length : DEFAULT_COMMENTS_COUNT;

    for (let i = 0; i < commentCount; i++) {
      const photoComment = photoItem.comments[i];
      const commentItem = document.createElement('li');
      commentItem.innerHTML =
        `<li class="social__comment">
          <img
            class="social__picture"
            src="${photoComment.avatar}"
            alt="${photoComment.name}"
            width="35" height="35">
          <p class="social__text">${photoComment.message}</p>
        </li>`;
      comments.appendChild(commentItem);
    }

    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
  }
}

function checkEvtKey(evt) {
  if (evt.key === 'Escape') {
    closeModalViewHandler();
  }
}

function closeModalViewHandler() {
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}
