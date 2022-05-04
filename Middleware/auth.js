// Middleware Funcion.
const jwt = require("jsonwebtoken");
const { customError } = require("../errors/errors")
require("dotenv").config

const userauth = (req, res, next) => {

    try {
        const token = req.headers.authorization;
        const id = jwt.verify(token, process.env.Secret);
        console.log(id);
        if (id)
            next();
    } catch (error) {
        return next(customError("Session Expire", 403))
    }


}

function createToken(data = 0) {
    try {
        if (data) {
            return jwt.sign({ id: data }, process.env.Secret, { expiresIn: "1m" });
        }
        const secret = jwt.sign({ id: this._id }, process.env.Secret);
        this.session.push({ secret });
    } catch (error) {
        console.log(error);
    }

}

module.exports.userauth = userauth;
module.exports.createToken = createToken;
