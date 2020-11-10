'use strict';
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`, `svg`];
const avatarFileChooser = window.global.adForm.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = window.global.adForm.querySelector(`.ad-form-header__preview img`);
const housePhotoFileChooser = window.global.adForm.querySelector(`.ad-form__upload input[type=file]`);
const housePhotoBlock = window.global.adForm.querySelector(`.ad-form__photo`);

const housePhotoImg = document.createElement(`img`);
housePhotoImg.src = `img/muffin-grey.svg`;
housePhotoImg.width = 70;
housePhotoImg.height = 70;

const housePhotoPreview = housePhotoBlock.appendChild(housePhotoImg);

const choosers = [avatarFileChooser, housePhotoFileChooser];
const previews = [avatarPreview, housePhotoPreview];

choosers.forEach((chooser, i) => {
  chooser.addEventListener(`change`, () => {
    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, () => {
        previews[i].src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
});

