import { isDuplicates } from './utils';

const uploadForm = document.querySelector('.img-upload__form');
const inputTags = uploadForm.querySelector('.text__hashtags');
const inputComment = uploadForm.querySelector('.text__description');
const pristine = new Pristine(uploadForm, {}, false);
const errorDiv = document.createElement('div');

pristine.addValidator(inputTags, validateHashtags);


export function validateHashtags() {
  if (!inputTags.value) {
    return true;
  }

  inputTags.classList.remove('pristine-error');
  inputTags.classList.remove('img-upload__field-wrapper--error');
  errorDiv.textContent = '';

  let tags = inputTags.value.toUpperCase().split(' ');
  // Принудительно удаляем пустые теги (replaceAll работает некорректно при нескольких подряд идущих пробелах)
  tags = tags.filter((item) => item.trim().length > 0);

  const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  let isError = false;
  let errText = '';

  if (tags.length > 5) {
    errText += 'Не более 5 хэштегов!';
    isError = true;
  }

  if (!tags.every((tag) => hashtag.test(tag))) {
    errText += 'Один из хэштегов не соответствует требуемому формату!';
    isError = true;
  }

  if (isDuplicates(tags)) {
    errText += 'Присутствуют дубликаты хэштегов!';
    isError = true;
  }

  if (isError) {
    errorDiv.textContent = errText;
    inputTags.parentNode.insertAdjacentElement('beforeend', errorDiv);
    errorDiv.classList.add('pristine-error');
    errorDiv.classList.add('img-upload__field-wrapper--error');

    return false;
  }
  errorDiv.remove();
  return true;
}

export function validateComment() {
  inputComment.classList.remove('pristine-error');
  inputComment.classList.remove('img-upload__field-wrapper--error');
  errorDiv.textContent = '';
  if (inputComment.value.length > 140) {
    errorDiv.textContent = 'Длина комментария не может быть больше 140 символов!';
    inputComment.parentNode.insertAdjacentElement('beforeend', errorDiv);
    inputComment.classList.add('pristine-error');
    inputComment.classList.add('img-upload__field-wrapper--error');

    return false;
  }
  errorDiv.remove();
  return true;
}
