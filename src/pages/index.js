import { enableValidation, settings, disableButton, resetValidation } from "../scripts/validation.js"
import "./index.css"
import headerSrc from "../images/logo.svg"
import avatarSrc from "../images/avatar.jpg"
import pencilSrc from "../images/pencil.svg"
import plusSrc from "../images/plus-sign.svg"
import lightPencil from "../images/pencil-light.svg"
import Api from "../utils/Api.js";


/* const initialCards = [
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
]; */

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

//avatar elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarCloseBtn = avatarModal.querySelector("#edit-profile-close-btn");
const avatarForm = avatarModal.querySelector("#edit-avatar-form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

const editFormElement = editProfileModal.querySelector(".modal__form");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

//preview modal elements
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector("#prview-close-btn");
const previewImg = previewModal.querySelector(".modal__image");
const previewCap = previewModal.querySelector(".modal__caption");

//delete modal elements
const deleteModal = document.querySelector("#delete-modal");
const deleteCancelBtn = deleteModal.querySelector("#delete-cancel-btn");
const deleteSubmitBtn = deleteModal.querySelector("#delete-submit-btn");
let selectCard;
let selectedCardId;

//image profile src elements
const headerImg = document.getElementById("headerLogo");
headerImg.src = headerSrc;
const avaterImg = document.getElementById("profileAvatar");
avaterImg.src = avatarSrc;
const pencilImg = document.getElementById("profilePencil");
pencilImg.src = pencilSrc;
const plusImg = document.getElementById("profilePlusSign");
plusImg.src = plusSrc;
const profileEditHover = document.getElementById("hoverEditPencil");
profileEditHover.src = lightPencil;

// API 
const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
        authorization: "9e68d7b8-65ac-4026-8ffb-a48d38eaf0d6",
        "Content-Type": "application/json"
    }
});

api.getAppInfo()
    .then(([cards, users]) => {
        cards.forEach((item) => {
            const cardElement = getCardElement(item);
            cardsList.prepend(cardElement);
        })

        profileName.textContent = users.name;
        profileDescription.textContent = users.about;
        avaterImg.src = users.avatar;


    })
    .catch(console.error); // note : passing func as a parem will take the first value as the parem of the function. 

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
    api.editUserInfo({ name: editProfileName.value, about: editProfileDescription.value })
        .then((data) => {
            profileName.textContent = data.name;
            profileDescription.textContent = data.about;
            closeModal(editProfileModal);
        })
        .catch(console.error);
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

function handleAvatarSubmit(evt) {
    evt.preventDefault();
    api.editAvatarInfo(avatarInput.value)
        .then((avatarData) => {
            if (avatarData.avatar) {
                avaterImg.src = avatarData.avatar;
                console.log(avatarData.avatar);
                avaterImg.alt = "updated avatar";
            }

            closeModal(avatarModal);
        })
        .catch(console.error);
}

function handleDeleteBtn(cardElement, cardId) {
    console.log(cardId);
    console.log(cardElement);
    selectCard = cardElement;
    selectedCardId = cardId;
    openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
    evt.preventDefault();
    api
        .removeCard(selectedCardId)
        .then(() => {
            selectCard.remove();
            closeModal(deleteModal);
        })
        .catch(console.error);
};

deleteSubmitBtn.addEventListener("submit", handleDeleteSubmit);


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

    cardDeleteBtn.addEventListener("click", () => handleDeleteBtn(cardElement, data));

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
avatarForm.addEventListener("submit", handleAvatarSubmit);

addCardNewPost.addEventListener("click", (evt) => {
    evt.stopPropagation();
    openModal(addCardModal);
});

addCardCloseBtn.addEventListener("click", () => {
    closeModal(addCardModal);
});

deleteCancelBtn.addEventListener("click", () => {
    closeModal(deleteModal);
});

avatarModalBtn.addEventListener("click", () => {
    openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", () => {
    closeModal(avatarModal);
})

previewModalCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
});


enableValidation(settings);
