
const { customError } = require("../../errors/errors");
const wrapper = require("../../Middleware/wrapper");
const Query = require("../../Models/home/studentQuery")

const studentQuery = wrapper(async (req, res, next) => {

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message)
        return next(customError("Bad Request", 400));

    const query = await Query.create(req.body);

    if (query)
        return res.status(200).json({
            status: 200,
            msg: "Your Query is Submit Successfully"
        });

    next(customError("SomeThing Went Wrong"));
})



const getQuery = wrapper(async (req, res, next) => {

    const { id } = req.params;
    if (!id)
        next(customError("Bad Request", 400));

    const reply = await Query.findById({ _id: id }, {
        email: 1,
        subject: 1,
        message: 1,
        reply: 1
    })

    if (reply)
        return res.status(200).json(reply)

    next(customError("SomeThing Went Wrong", 500));
});


const queryList = wrapper(async (req, res, next) => {

    const { email } = req.params;
    if (!email)
        return next(customError("Bad Request", 400));

    const queryList = await Query.find({ email }, {
        name: 1,
        email: 1,
        subject: 1,
        visiblity: 1
    });

    if (queryList)
        return res.status(200).json(queryList)

    next(customError("No Query Avliable", 404));


})



module.exports = {
    studentQuery,
    getQuery,
    queryList
}