const Validator = require('validator');
const isEmpty = require('is-empty');

const validateLoginInput = (data) => {
    
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    // mail checker
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is requiered";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // password checker
    if (Validator.isEmpty(data.password)) { 
        errors.password = "Password field is required";
    } 
    return {
        errors, 
        isValid: isEmpty(errors)
    };
};
module.exports = validateLoginInput;