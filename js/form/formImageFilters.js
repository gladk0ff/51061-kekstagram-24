import '/nouislider/nouislider.js';
import {filterListElement, sliderElement, previewUploadImageElement, sliderContainerElement, sliderValueElement} from './formNodes.js';

export const EFFECT_PREFIX = {
  marvin: '%',
  phobos: 'px',
};

const DEFAULT_SLIDER_OPTIONS ={
  start: 1,
  step: 0.1,
  range: {
    'min': 0,
    'max': 1,
  },
};

/**
 Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
 Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
 Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
 Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
 Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
 */
export const getSliderSettingByEffect = (name) => {
  switch (name) {
    case 'heat' :
      return {
        start: 3,
        step: 0.1,
        range: {
          'min': 1,
          'max': 3,
        },
      };
    case 'phobos':
      return {
        start: 3,
        step: 0.1,
        range: {
          'min': 0,
          'max': 3,
        },
      };
    case 'marvin' :
      return {
        start: 100,
        step: 1,
        range: {
          'min': 0,
          'max': 100,
        },
      };
    default:
      return DEFAULT_SLIDER_OPTIONS;
  }
};


export const EFFECT_FILTERS = {
  phobos: 'blur',
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  heat: 'brightness',
};


export const initSlider = (options) => {
  noUiSlider.create(sliderElement, options||DEFAULT_SLIDER_OPTIONS);

  sliderElement.noUiSlider.on('update',  ()=> {
    const value = sliderElement.noUiSlider.get();
    sliderValueElement.value = value;
    const effect = previewUploadImageElement.dataset.effect;
    if (effect) {
      previewUploadImageElement.style.filter=`${EFFECT_FILTERS[effect]}(${value + (EFFECT_PREFIX[effect] || '')})`;
    }
  });
};

export const handleChangeFilters = (event) => {
  if (event.target.id) {

    previewUploadImageElement.removeAttribute('class');
    previewUploadImageElement.removeAttribute('data-effect');
    previewUploadImageElement.style.filter='';
    const effect = event.target.id.replace('effect-', '');
    if (EFFECT_FILTERS[effect]) {
      const isSliderVisible=sliderContainerElement.style.visibility==='visible';
      if (!isSliderVisible) {
        sliderContainerElement.style.visibility='visible';
      }
      sliderElement.noUiSlider.destroy();
      initSlider(getSliderSettingByEffect(effect));
      previewUploadImageElement.setAttribute('data-effect', effect);
      previewUploadImageElement.setAttribute('class', `effects__preview--${effect}`);
    } else {
      sliderContainerElement.style.visibility='hidden';
    }
  }
};


export const removeFiltersListeners=()=>{
  filterListElement.removeAttribute('click', handleChangeFilters);
  sliderElement.noUiSlider.destroy();
};
