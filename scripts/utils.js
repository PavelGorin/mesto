import {closePopupByOverlay, closePopupByEscape} from './index.js';

export function openPopup(block) {
  block.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEscape);
  document.addEventListener("click", closePopupByOverlay);
}

export function closePopup(block) {
  block.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEscape);
  document.removeEventListener("click", closePopupByOverlay);
}