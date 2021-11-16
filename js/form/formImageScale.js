import {previewUploadImageElement, scaleControlElement, scaleControlBiggerElement, scaleControlSmallerElement} from './formNodes.js';

const SCALE_STEP = 25;

export const setScaleControlValue = (scale) => {
  scaleControlElement.value = `${scale}%`;
  previewUploadImageElement.style.transform = `scale(${scaleControlElement.value})`;
};

export const changeImageScale = (value) => {
  let scale = +scaleControlElement.value.slice(0, -1);
  scale += (SCALE_STEP * value);
  if (25 > scale || scale > 100) {
    return;
  }
  setScaleControlValue(scale);
};

export const scaleUp = () => {
  changeImageScale(+1);
};

export const scaleDown = () => {
  changeImageScale(-1);
};

export const removeScaleListeners=()=>{
  scaleControlSmallerElement.removeEventListener('click', scaleDown);
  scaleControlBiggerElement.removeEventListener('click', scaleUp);
};

export const initScaleControl=()=>{
  scaleControlSmallerElement.addEventListener('click', scaleDown);
  scaleControlBiggerElement.addEventListener('click', scaleUp);
};
