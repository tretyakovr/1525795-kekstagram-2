export const showThumbnail = (photos) => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  const documentFragment = document.createDocumentFragment();

  while (true) {
    const pictureElement = document.querySelector('.picture');
    if (pictureElement) {
      pictureElement.parentNode.removeChild(pictureElement);
    } else {
      break
    }
  }
  // if (pictureElements.length) {
  //   const parentNode = pictureElements[0].parentNode;
  //   console.log('elements', pictureElements);
  //   let i = 0;
  //   while (pictureElements.length > 0) {
  //     console.log(++i);
  //     console.log('parentnode', parentNode);
  //     parentNode.removeChild(pictureElements[0]);
  //   }
  // }
  // if (picturesContainer) {
  //   pictiresContainer.textContext = '';
  // }

  console.log('@@@', photos, photos.length);

  if (photos.length) {
    photos.forEach((photo) => {
      const photoItem = pictureTemplate.cloneNode(true);
      photoItem.dataset.id = photo.id;

      photoItem.querySelector('img').setAttribute('src', photo.url);
      photoItem.querySelector('img').setAttribute('alt', photo.description);
      photoItem.querySelector('.picture__likes').textContent = photo.likes;
      photoItem.querySelector('.picture__comments').textContent = photo.comments.length;

      documentFragment.appendChild(photoItem);
    });
  } else {
    console.log('Nothing to render');
  }

  const pictures = document.querySelector('.pictures');
  // picturesContainer = document.createElement('div');
  // picturesContainer.setAttribute('id', 'pictures-container');
  // picturesContainer.appendChild(documentFragment);
  pictures.appendChild(documentFragment);
};
