const ALERT_SHOW_TIME = 5000;
const loadErrorTemplate = document.querySelector('#data-error').content;
const sendErrorTemplate = document.querySelector('#error').content;
const successTemplate = document.querySelector('#success').content;


export const showLoadErrMessage = () => {
  const errDiv = document.createElement('div');
  errDiv.appendChild(loadErrorTemplate);
  document.body.appendChild(errDiv);

  setTimeout(() => {
    errDiv.remove();
  }, ALERT_SHOW_TIME);
};


export const showSendErrMessage = () => {
  document.body.appendChild(sendErrorTemplate.cloneNode(true));

  document.addEventListener('keydown', closeErrorAlertByEsc);
  document.addEventListener('click', closeErrorAlertByClick);
};


export const showSuccessMessage = () => {
  document.body.appendChild(successTemplate.cloneNode(true));

  document.addEventListener('keydown', closeSuccessAlertByEsc);
  document.addEventListener('click', closeSuccessAlertByClick);
};


function closeSuccessAlertByEsc(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeSuccessAlert();
  }
}


function closeSuccessAlertByClick(evt) {
  if (evt.target === document.querySelector('.success') || evt.target === document.querySelector('.success__button')) {
    evt.preventDefault();
    closeSuccessAlert();
  }
}


function closeSuccessAlert() {
  document.removeEventListener('keydown', closeSuccessAlertByEsc);
  document.removeEventListener('click', closeSuccessAlertByClick);
  document.querySelector('.success').remove();
}


function closeErrorAlertByEsc(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeErrorAlert();
  }
}


function closeErrorAlertByClick(evt) {
  if (evt.target === document.querySelector('.error') || evt.target === document.querySelector('.error__button')) {
    evt.preventDefault();
    closeErrorAlert();
  }
}


function closeErrorAlert() {
  document.removeEventListener('keydown', closeErrorAlertByEsc);
  document.removeEventListener('click', closeErrorAlertByClick);
  document.querySelector('.error').remove();
}
