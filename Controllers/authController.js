const pwdHash = require("../Middleware/pwdHash");
const { customError } = require("../errors/errors")
const Student = require("../Models/auth/student");
const { passwordVerify } = require("../Middleware/pwdHash");
const { Validator } = require("../Middleware/validator");
const validator = require("validator");


const login = async (req, res, next) => {
    try {
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
        if (user_verify) {
            const { id, email, first_name, last_name, session: [{ secret }] } = std
            return res.status(200).json({
                id,
                email,
                first_name,
                last_name,
                secret,
            });
        }

        return next(customError("Email or Enrolment no and password is wrong", 401));

    } catch (error) {
        res.send({
            "Status": false,
            "msg": "Undefine userid and password"
        })

    }
}

const register = async (req, res, next) => {

    try {
        // Find the user by email or enrolment no
        const { enrolment_no, email } = req.body;

        const [studentExist] = await Student.find({
            $or: [{ enrolment_no }, { email }]
        }, { enrolment_no: 1 })

        const stdId = studentExist ? true : false;

        if (stdId) {
            return res.status(409).json({
                status: 409,
                msg: "user already exist"
            })
        }

        await Student.create(req.body);
        return res.json({
            status: 200,
            msg: "User Registration Sucesses"
        });



        // if user is not exist the send the responce user register successfully


    } catch (error) {
        return next(customError("Bad Request", 400));
    }

}


const adminLogin = async (req, res, next) => {
    res.status(200).json({
        status: 200,
        msg: "login sucessfull"
    })
}
const adminRegister = async (req, res, next) => {
    res.status(200).json({
        status: 200,
        msg: "Registration sucessfull"
    })
}





module.exports = {
    login,
    register,
    adminLogin,
    adminRegister
}