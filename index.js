const refs = {
    form: document.querySelector('[form]'),
    formData: document.querySelector('[form-data]'),
  };

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const { email, password, firstName, lastName, companyName } = event.target.elements;
    if (!validateEmail(email.value)) {
        alert('Email is invalid!') 
        return
        }
    const formData = {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        companyName: companyName.value,
    }
    const formDataMarkup = createMarkup(formData);
    refs.formData.innerHTML = formDataMarkup;
    event.target.reset();
};

function createMarkup(formData) {
    const { email, password, firstName, lastName, companyName } = formData;
    if (companyName) {
        return `
            <p>Email: ${email}</p>
            <p>Password: ${password}</p>
            <p>First Name: ${firstName}</p>
            <p>Last Name: ${lastName}</p>
            <p>Company Name: ${companyName}</p>
            `
            }
    return `
    <p>Email: ${email}</p>
    <p>Password: ${password}</p>
    <p>First Name: ${firstName}</p>
    <p>Last Name: ${lastName}</p>
    `     
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


