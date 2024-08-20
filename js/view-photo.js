document.querySelector('.pictures').addEventListener('click', photoViewHandler);

function photoViewHandler(evt) {
  if (evt.target.nodeName === 'IMG') {
    const bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.remove('hidden');

    console.log('target =', evt.target);
    // console.log(evt.target.src);
    // console.log(evt.target.textContent);

    const bigPictureImg = document.querySelector('.big-picture__img');
    bigPictureImg.setAttribute('src', evt.target.src);




  }
}
