const pwdHash = require("../Middleware/pwdHash");
const { customError } = require("../errors/errors")
const Student = require("../Models/auth/student");
const { passwordVerify } = require("../Middleware/pwdHash");
const { Validator } = require("../Middleware/validator");
const validator = require("validator");
const { createToken } = require("../Middleware/auth");
const Admin = require("../Models/auth/admin");

const login = async (req, res, next) => {

    try {
        const { userid, password } = req.body;
        const token = createToken(userid);
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
                refreshToken: secret,
                token: token
            });
        }

        return next(customError("Email or Enrolment no and password is wrong", 401));

    } catch (error) {
        res.status(403).send({
            "Status": false,
            "msg": "Undefine userid and password"
        });
        console.log(error);

    }
}


//Regisgter the Students.
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
        return res.status(200).json({
            status: 200,
            msg: "User Registration Sucesses"
        });

        // if user is not exist the send the responce user register successfully

    } catch (error) {
        return next(customError("Bad Request", 400));
    }

}




//  Admin Login
const adminLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const token = createToken(email);
        const admin = await Admin.findOne({ email }, {
            firstName: 1,
            lastName: 1,
            email: 1,
            password: 1,
            session: 1,
            adminType: 1,
            isApproved: 1
        });

        const adminVerify = await passwordVerify(password, admin);
        if (adminVerify) {
            const { id, email, firstName, lastName, session: [{ secret }] } = admin
            return res.status(200).json({
                id,
                email,
                firstName,
                lastName,
                refreshToken: secret,
                token: token
            });
        }
        else {
            return next(customError("Email password is Invalid", 401));
        }
    } catch (error) {
        res.status(403).send({
            "Status": false,
            "msg": "SomeThing went Wrong"
        });
    }




}

// Admin Registration.

const adminRegister = async (req, res, next) => {
    try {
        const { email } = req.body;
        const exist = await Admin.findOne({ email });
        if (exist) {
            return res.status(409).json({
                status: 409,
                msg: "user already exist"
            })
        }

        await Admin.create(req.body);
        return res.status(200).json({
            status: 200,
            msg: "User Registration Sucesses"
        });

    } catch (error) {
        return next(customError("Bad Request", 400));
    }
}





module.exports = {
    login,
    register,
    adminLogin,
    adminRegister
}