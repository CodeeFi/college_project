const pwdHash = require("../Middleware/pwdHash");
const { customError } = require("../errors/errors")
const Student = require("../Models/auth/student");
const { passwordVerify } = require("../Middleware/pwdHash");
const { Validator } = require("../Middleware/validator");
const validator = require("validator");


const login = async (req, res, next) => {
    const { userid, password } = req.body;
    let std;
    if (validator.isEmail(userid)) {
        std = await Student.findOne({ email: userid },
            {
                first_name: 1,
                last_name: 1,
                email: 1,
                password: 1,
                session: 1
            })
    } else {
        std = await Student.findOne({ enrolment_no: userid }, {
            first_name: 1,
            last_name: 1,
            email: 1,
            password: 1,
            session: 1
        })
    }
    const user_verify = await passwordVerify(password, std);
    if (user_verify)
        return res.json(std);
    return next(customError("Email, Enrolment NO or password is worng", 400));

}

const register = async (req, res, next) => {

    try {
        await Student.create(req.body);
        res.json({
            status: 200,
            msg: "User Registration Sucesses"
        });
    } catch (error) {
        return next(customError("Bad Request", 400));
    }

}
const adminLogin = async (req, res, next) => {
    res.send("Admin Login");
}
const adminRegister = async (req, res, next) => {
    res.send("Admin Register");
}





module.exports = {
    login,
    register,
    adminLogin,
    adminRegister
}