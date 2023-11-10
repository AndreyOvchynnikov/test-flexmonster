const refs = {
    form: document.querySelector('[form]'),
    formDataContainer: document.querySelector('[form-data]'),
    backdrop: document.querySelector('[backdrop]'),
    message: document.querySelector('[message]')
  };

refs.form.addEventListener('submit', handleSubmit);

const successMessage = "Your subscribe has been sent successfully";
const errorMessage = "Something wrong! Please check your email!";

function handleSubmit(event) {
    event.preventDefault();
    const { email, password, firstName, lastName, companyName } = event.target.elements;
    
    if (!validateEmail(email.value)) {
        refs.message.innerHTML = createMessageMarup(errorMessage);
        toggleModal()
        setTimeout(toggleModal, 2500)
        return
    }
    refs.message.innerHTML = createMessageMarup(successMessage);
    toggleModal()
    setTimeout(toggleModal, 2500)
    
    const formData = [
        { name: "Email", value: email.value },
        { name: "Password", value: password.value },
        { name: "First Name", value: firstName.value },
        { name: "Last Name", value: lastName.value },
        { name: "Company Name", value: companyName.value },
    ]
    const formDataMarkup = createDataMarkup(formData);
    refs.formDataContainer.innerHTML = formDataMarkup;
    event.target.reset();
};

function createDataMarkup(formData) {
    return formData.map(data => {
        const { name, value } = data
        if (!value) {
            return
        }
        return `<p>${name}: ${value}</p>`
    }).join("");     
};

function createMessageMarup(message) {
    return `<h2>${message}</h2>`
};

function validateEmail(email) {
    const dogIndex = email.indexOf("@");
    const dogSlice = email.slice(dogIndex + 1, email.length);
    if (dogSlice.includes(".")) {
        const pointIndex = dogSlice.indexOf(".")
        const pointSlice = dogSlice.slice(pointIndex + 1, dogSlice.length)
        if (!pointSlice.includes(".") && pointSlice.length > 0) {
            return true;
         }
    }
    return false;
}

function toggleModal() {
    refs.backdrop.classList.toggle('is-hidden');
  }

