




const home = (req, res, next) => {

    res.send("This is home page. This is a testing page")

}

const app = (req, res) => {
    res.send("hello app");
}




module.exports = {
    home,
    app
}
