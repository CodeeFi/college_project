// Middleware Funcion.
const jwt = require("jsonwebtoken");
require("dotenv").config

const userauth = (req, res, next) => {





}

function createToken() {
    const secret = jwt.sign({ id: this._id }, process.env.Secret);
    this.session.push({ secret });
}

module.exports.userauth = userauth;
module.exports.createToken = createToken;
