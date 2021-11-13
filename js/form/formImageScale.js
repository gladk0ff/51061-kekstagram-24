import {previewUploadImage, scaleControl, scaleControlBigger, scaleControlSmaller} from './formNodes.js';

const SCALE_STEP = 25;

export const setScaleControlValue = (scale) => {
  scaleControl.value = `${scale}%`;
  previewUploadImage.style.transform = `scale(${scaleControl.value})`;
};

export const changeImageScale = (value) => {
  let scale = +scaleControl.value.slice(0, -1);
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
  scaleControlSmaller.removeEventListener('click', scaleDown);
  scaleControlBigger.removeEventListener('click', scaleUp);
};

export const initScaleControls=()=>{
  scaleControlSmaller.addEventListener('click', scaleDown);
  scaleControlBigger.addEventListener('click', scaleUp);
};
