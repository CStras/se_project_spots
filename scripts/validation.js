const settings = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn-disabled",
    inputErrorClass: "modal__input_type-error",
    errorClass: "modal__error_visible"
};

const showInputError = (formEl, inputEl, errorMsg) => {
    const errorMsgID = inputEl.id + "-error";
    const errorMsgEl = formEl.querySelector("#" + errorMsgID);
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add(settings.inputErrorClass);
};

const hideInputError = (formEl, inputEl) => {
    const errorMsgID = inputEl.id + "-error";
    const errorMsgEl = formEl.querySelector("#" + errorMsgID);
    errorMsgEl.textContent = "";
    inputEl.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formEl, inputEl) => {
    if (!inputEl.validity.valid) {
        showInputError(formEl, inputEl, inputEl.validationMessage);
    } else {
        hideInputError(formEl, inputEl);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    });

};

/*const resetValidation = (formEl, inputList) => {
    inputList.forEach((input) => {
        hideInputError(formEl, input);
    });
}; potential validation for reentering forms with error message
*/

const disableButton = (button, config) => {
    button.disable = true;
    button.classList.add(config.inactiveButtonClass);
};

const enableButton = (button, config) => {
    button.disable = false;
    button.classList.remove(config.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonEl) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonEl, settings);
    } else {
        enableButton(buttonEl, settings);
    }
};

const setEventListeners = (formEl, config) => {
    const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
    const buttonElement = formEl.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
            checkInputValidity(formEl, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });

};

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach((formEl) => {
        setEventListeners(formEl, config);
    });

};

enableValidation(settings);