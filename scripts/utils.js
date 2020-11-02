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

function closePopupByEscape(evt) {
  const esc = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(esc);
  }
}

function closePopupByOverlay(evt) {
  if (evt.target.closest(".popup")) {
    closePopup(evt.target);
  }
}