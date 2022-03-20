const bcrypt = require("bcrypt");



const pwdHash = async function (next) {

    this.password = await bcrypt.hash(this.password, 10);
    this.repassword = this.password;
    next();
}

// passwordVerify section compare a hash password to user password.
const passwordVerify = async function (userpassword, std) {

    if (!std)
        return false;

    const { password } = std;
    return await bcrypt.compare(userpassword, password);

}


module.exports = {
    pwdHash,
    passwordVerify,
}



