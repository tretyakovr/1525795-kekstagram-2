const imgPreview = document.querySelector('.img-upload__preview img');
const filters = document.querySelector('.effects__list');
const imgEffectLevel = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const defaultEffect = document.querySelector('#effect-none');

let currentFilter = 'none';
const FilterSettings = {
  'none': {
    MIN: 0,
    MAX: 0,
    STEP: 0,
    START: 0
  },
  'chrome': {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    START: 1,
    FUNCTION: 'grayscale',
    UNIT: '',
  },
  'sepia': {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    START: 1,
    FUNCTION: 'sepia',
    UNIT: '',
  },
  'marvin': {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    START: 100,
    FUNCTION: 'invert',
    UNIT: '%',
  },
  'phobos': {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    START: 3,
    FUNCTION: 'blur',
    UNIT: 'px'
  },
  'heat': {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    START: 3,
    FUNCTION: 'brightness',
    UNIT: ''
  }
};
const defaultSliderOptions = {
  range: {
    min: FilterSettings[currentFilter]['MIN'],
    max: FilterSettings[currentFilter]['MAX'],
  },
  start: FilterSettings[currentFilter]['START'],
  step: FilterSettings[currentFilter]['STEP'],
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
};

filters.addEventListener('click', updateFilter);


function initSlider() {
  noUiSlider.create(slider, defaultSliderOptions);

  slider.noUiSlider.on('update', () => {
    valueElement.value = slider.noUiSlider.get();
    imgPreview.style.filter = `${FilterSettings[currentFilter]['FUNCTION']}(${valueElement.value}${FilterSettings[currentFilter]['UNIT']})`;
  });
}


export function resetEffectPreview() {
  currentFilter = 'none';
  imgPreview.style = '';
  imgEffectLevel.hidden = true;
  defaultEffect.checked = true;

  slider.noUiSlider.updateOptions(defaultSliderOptions);
}


function updateFilter(evt) {
  if (evt.target.nodeName === 'INPUT') {
    currentFilter = evt.target.value;

    if (currentFilter === 'none') {
      imgPreview.style = '';
      imgEffectLevel.hidden = true;
    } else {
      imgEffectLevel.hidden = false;

      slider.noUiSlider.updateOptions({
        range: {
          min: FilterSettings[currentFilter]['MIN'],
          max: FilterSettings[currentFilter]['MAX'],
        },
        start: FilterSettings[currentFilter]['START'],
        step: FilterSettings[currentFilter]['STEP']
      });

      slider.value = FilterSettings[currentFilter]['MAX'];
      valueElement.value = FilterSettings[currentFilter]['MAX'];
    }
  }
}

imgEffectLevel.hidden = true;
initSlider();
resetEffectPreview();
