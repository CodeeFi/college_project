
const wrapper = require("../../Middleware/wrapper");
const { customError } = require("../../errors/errors");
const Query = require("../../Models/home/studentQuery");

const getQuery = wrapper(async (req, res, next) => {

    const queryList = await Query.find({ reply: false }, {
        name: 1,
        email: 1,
        subject: 1,
        message: 1
    }).sort({ id: -1 }).limit(4);

    if (queryList)
        return res.status(200).json(queryList)

    next(customError("No Query Avliable", 404));
})


const showQuery = wrapper(async (req, res, next) => {

    const { id } = req.params;
    if (!id)
        next(customError("Bad Request", 400))
    const message = await Query.findById({ _id: id }, {
        message: 1
    });
    if (message) {
        await Query.findOneAndUpdate({ _id: id }, { visiblity: true });
        return res.status(200).json(message);
    }
    next(customError("SomeThing Went Wrong", 500));

})


const reply = wrapper(async (req, res, next) => {

    const { id, message } = req.body;

    if (!id || !message)
        next(customError("Bad Request", 400));

    const updated = await Query.findByIdAndUpdate({ _id: id }, { reply: message });

    if (updated) {
        res.status(200).json({
            status: 200,
            msg: "Reply Set Sucessfull"
        });
    }

});



module.exports = {
    getQuery,
    showQuery,
    reply
}