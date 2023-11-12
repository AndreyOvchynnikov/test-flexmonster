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
        refs.message.innerHTML = "";
        refs.message.append(createMessageMarkup(errorMessage));
        toggleMessage();
        setTimeout(toggleMessage, 2500);
        return
    };
    refs.message.innerHTML = "";
    refs.message.append(createMessageMarkup(successMessage));
    toggleMessage();
    setTimeout(toggleMessage, 2500);
    
    const formData = [
        { name: "Email", value: email.value },
        { name: "Password", value: password.value },
        { name: "First Name", value: firstName.value },
        { name: "Last Name", value: lastName.value },
        { name: "Company Name", value: companyName.value },
    ]
    refs.formDataContainer.innerHTML = ""
    const formDataMarkup = createDataMarkup(formData);
    refs.formDataContainer.append(...formDataMarkup);
    event.target.reset();
};

function createDataMarkup(formData) {
    return formData.map(data => {
        const { name, value } = data
        if (!value) {
            return
        }
        const element = document.createElement("p")
        element.textContent = `${name}: ${value}`
        return element
    }).filter(el => el);     
};

function createMessageMarkup(message) {
    const element = document.createElement("h2")
    element.textContent = `${message}`
    return element
};

function validateEmail(email) {
    const regexCheck =  String(email).match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const dogIndex = email.indexOf("@");
    const dogSlice = email.slice(dogIndex + 1, email.length);

        if (regexCheck && dogSlice.includes(".")) {
                const pointIndex = dogSlice.indexOf(".")
                const pointSlice = dogSlice.slice(pointIndex + 1, dogSlice.length)
                    
                if (!pointSlice.includes(".") && pointSlice.length > 0) {
                            return true;
                }
        }
    return false;
}

function toggleMessage() {
    refs.backdrop.classList.toggle('is-hidden');
  }

