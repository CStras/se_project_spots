import { enableValidation, settings, disableButton } from "../scripts/validation.js"
import "./index.css"
import headerSrc from "../images/logo.svg"
import avatarSrc from "../images/avatar.jpg"
import pencilSrc from "../images/pencil.svg"
import plusSrc from "../images/plus-sign.svg"


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
const editModal = editProfileModal.querySelector(".modal__form");

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

//image src elements
const headerImg = document.getElementById("headerLogo");
headerImg.src = headerSrc;
const avaterImg = document.getElementById("profileAvatar");
avaterImg.src = avatarSrc;
const pencilImg = document.getElementById("profilePencil");
pencilImg.src = pencilSrc;
const plusImg = document.getElementById("profilePlusSign");
plusImg.src = plusSrc;

function openModal(modal) {
    modal.classList.add("modal_opened");
    modal.addEventListener("click", handleOverlay);
    document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
    modal.classList.remove("modal_opened");
    modal.removeEventListener("click", handleOverlay);
    document.removeEventListener("keydown", handleEscape);
}

function handleEscape(event) {
    if (event.key === "Escape") {
        const modalOpened = document.querySelector(".modal_opened");
        if (modalOpened) {
            closeModal(modalOpened);
        }
    }
}

function handleOverlay(event) {
    if (event.target.classList.contains("modal_opened")) {
        closeModal(event.target);
    }
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

    imgElement.addEventListener("click", (evt) => {
        evt.stopPropagation();
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
    resetValidation(editModal, [editProfileName, editProfileDescription]);
    openModal(editProfileModal);
});

profileCloseBtn.addEventListener("click", () => {
    closeModal(editProfileModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((item) => { // first parem is the object, second can reference the index of that object and third parem references the intial array
    const cardElement = getCardElement(item);
    cardsList.prepend(cardElement);
});

addCardNewPost.addEventListener("click", (evt) => {
    evt.stopPropagation();
    console.log("click");
    openModal(addCardModal);
});

addCardCloseBtn.addEventListener("click", () => {
    closeModal(addCardModal);
});

previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
});


enableValidation(settings);
