
const { customError } = require("../errors/errors")

function wrapper(fn) {

    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(customError("SomeThing Went wrong", 500));
            console.log(error)
        }
    }

}


module.exports = wrapper;