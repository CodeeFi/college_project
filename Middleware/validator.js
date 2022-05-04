const { customError } = require("../errors/errors")
const validator = require("validator");

let validate = (email, password, repassword) => {
    const validEmail = validator.isEmail(email);
    const pass = validator.equals(password, repassword);
    const StrongPass = validator.isStrongPassword(password);
    // console.log(validEmail, pass, StrongPass)
    if (validEmail && pass && StrongPass)
        return true;

    return { validEmail, pass, StrongPass };

}

function Validator(req, res, next) {

    const { enrolment_no, first_name, last_name,
        college, course, email, phone,
        session_start_year,
        session_end_year, password,
        repassword } = req.body;

    if (!enrolment_no || !first_name || !last_name || !college || !course || !email || !phone || !session_start_year || !session_end_year || !password || !repassword) {
        next(customError("Somthing Went Wrong", 500));
        return false;
    }

    let valid = validate(email, password, repassword);
    if (valid) {
        return next();
    }
    else if (!valid.validEmail)
        next(customError("Please check Your Email its not valid", 500));
    else if (!valid.pass)
        next(customError("Your Password is not match.", 500));
    else if (!valid.StrongPass)
        next(customError("Your Passowrd is not Strong", 500));
}


function AdminValidator(req, res, next) {

    const { firstName, lastName, email, password, rePassword, adminType } = req.body;
    if (!firstName || !lastName || !email || !password || !rePassword || !adminType) {
        next(customError("Somthing Went Wrong", 500));
        return false;
    }
    let valid = validate(email, password, rePassword);
    if (valid) {
        return next();
    }
    else if (!valid.validEmail)
        next(customError("Please check Your Email its not valid", 500));
    else if (!valid.pass)
        next(customError("Your Password is not match.", 500));
    else if (!valid.StrongPass)
        next(customError("Your Passowrd is not Strong", 500));

}





module.exports = {
    Validator,
    AdminValidator,
} 