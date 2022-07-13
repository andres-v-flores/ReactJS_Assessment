let phoneRegex = /^(0|1)?(\s|-)?(\(\d{3}\)|\d{3})(\s|-)?\d{3}(\s|-)?\d{4}$/;
// a number format of 1 555 555 5555 or 0 947 226 9487 or 0(947)2269498 or 0-947-226-9487 or 0-(947)-226-9487
//doesn't support country code at the moment
let nameRegex = /^[A-Z]+(\s?[A-Z])+$/i; 
// accepts only text and accept a space in between text will accept one name two name or x named 
let emailRegex = /^\w+@[A-Z]+\.[A-Z]+/i
// a basic regex that checks email with an @ sign and . something \w accepts a-z and _-

function nameValidation(name){
    return nameRegex.test(name);
}

function emailValidation(email){
    return emailRegex.test(email);
}

function phoneValidation(phone){
    return phoneRegex.test(phone)
}

// all validation returns a boolean 0 or 1
export {nameValidation, emailValidation, phoneValidation};