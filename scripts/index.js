const initialCards = [
    {
        name: "Val Thorens",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
    },
    {
        name: "Restaurant terrace",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
    },
    {
        name: "An outdoor cafe",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
    },
    {
        name: "A very long bridge, over the forest and through the trees",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
    },
    {
        name: "Tunnel with morning light",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
    },
    {
        name: "Mountain house",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
    },
    {
        name: "A sunny bridge",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
    },
];

const profileEditBtn = document.querySelector("#edit-profile-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileCloseBtn = editProfileModal.querySelector("#edit-profile-close-btn");

const addCardModal = document.querySelector("#add-card-modal");
const addCardNewPost = document.querySelector(".profile__new-post");
const addCardCloseBtn = addCardModal.querySelector("#add-card-close-btn");
const cardForm = addCardModal.querySelector(".modal__form");
const cardSubmitButton = addCardModal.querySelector(".modal__submit-btn");
const cardNameInput = addCardModal.querySelector("#add-card-name-input");
const cardLinkInput = addCardModal.querySelector("#add-card-link-input");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editProfileName = editProfileModal.querySelector("#profile-name-input");
const editProfileDescription = editProfileModal.querySelector("#profile-description-input");

const editFormElement = editProfileModal.querySelector(".modal__form");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector("#prview-close-btn");
const previewImg = previewModal.querySelector(".modal__image");
const previewCap = previewModal.querySelector(".modal__caption");


function openModal(modal) {
    modal.classList.add("modal_opened");
}

function closeModal() {
    const modalOpened = document.querySelector(".modal_opened");
    if (isModalOpen()) {
        modalOpened.classList.remove("modal_opened");
    }
}

function initModal() {
    document.addEventListener("click", function (event) {
        if (isModalOpen() && isClickOutsideModal(event)) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (isModalOpen() && event.key === "Escape") {
            closeModal();
        }
    });
}

function isClickOutsideModal(event) {
    const modalOpened = document.querySelector(".modal_opened");
    const modalContainer = modalOpened.querySelector(".modal__container");
    return !modalContainer.contains(event.target);
}

function isModalOpen() {
    const modalOpened = document.querySelector(".modal_opened");
    return modalOpened !== null && modalOpened.classList.contains("modal_opened");
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editProfileName.value;
    profileDescription.textContent = editProfileDescription.value;
    closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
    const cardEl = getCardElement(inputValues);
    cardsList.prepend(cardEl);
    evt.target.reset();
    disableButton(cardSubmitButton, settings);
    closeModal(addCardModal);
}

function getCardElement(data) {
    const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
    const cardNameElement = cardElement.querySelector(".card__title");
    const imgElement = cardElement.querySelector(".card__image");
    const cardLikeBtn = cardElement.querySelector(".card__like-btn");
    const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");


    cardNameElement.textContent = data.name;
    imgElement.alt = data.name;
    imgElement.src = data.link;

    cardLikeBtn.addEventListener("click", () => {
        cardLikeBtn.classList.toggle("card__like-btn_liked");
    });

    cardDeleteBtn.addEventListener("click", () => {
        cardElement.remove();
    });

    imgElement.addEventListener("click", () => {
        openModal(previewModal);
        previewImg.alt = data.name;
        previewImg.src = data.link;
        previewCap.textContent = data.name;
    });

    return cardElement;
}



profileEditBtn.addEventListener("click", () => {
    editProfileName.value = profileName.textContent;
    editProfileDescription.value = profileDescription.textContent;
    //resetValidation(cardForm, [editProfileName, editProfileDescription]);
    openModal(editProfileModal);
});

profileCloseBtn.addEventListener("click", () => {
    closeModal(editProfileModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

/*
for (let i = 0; i < initialCards.length; i++) {
    const cardElement = getCardElement(initialCards[i]);   Replacing for loop with forEach method
    cardsList.prepend(cardElement);
}
*/
initialCards.forEach((item) => { // first parem is the object, second can reference the index of that object and third parem references the intial array
    const cardElement = getCardElement(item);
    cardsList.prepend(cardElement);
});

addCardNewPost.addEventListener("click", (evt) => {
    evt.stopPropagation();
    openModal(addCardModal);
});

addCardCloseBtn.addEventListener("click", () => {
    closeModal(addCardModal);
});

previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
});

document.addEventListener("DOMContentLoaded", function () {
    initModal();
});