import '/nouislider/nouislider.js';
import {filterList, slider, previewUploadImage, sliderContainer, sliderValue} from './formNodes.js';

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
  noUiSlider.create(slider, options||DEFAULT_SLIDER_OPTIONS);

  slider.noUiSlider.on('update',  ()=> {
    const value = slider.noUiSlider.get();
    sliderValue.value = value;
    const effect = previewUploadImage.dataset.effect;
    if (effect) {
      const filter = `${EFFECT_FILTERS[effect]}(${value + (EFFECT_PREFIX[effect] || '')})`;
      previewUploadImage.style.filter=filter;
    }
  });
};

export const handleChangeFilters = (event) => {
  if (event.target.id) {

    previewUploadImage.removeAttribute('class');
    previewUploadImage.removeAttribute('data-effect');
    previewUploadImage.style.filter='';
    const effect = event.target.id.replace('effect-', '');
    if (EFFECT_FILTERS[effect]) {
      const isSliderVisible=sliderContainer.style.visibility==='visible';
      if (!isSliderVisible) {
        sliderContainer.style.visibility='visible';
      }
      slider.noUiSlider.destroy();
      initSlider(getSliderSettingByEffect(effect));
      previewUploadImage.setAttribute('data-effect', effect);
      previewUploadImage.setAttribute('class', `effects__preview--${effect}`);
    } else {
      sliderContainer.style.visibility='hidden';
    }
  }
};


export const removeFiltersListeners=()=>{
  filterList.removeAttribute('click', handleChangeFilters);
  slider.noUiSlider.destroy();
};
