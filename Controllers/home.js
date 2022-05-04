




const home = (req, res, next) => {

    res.send("hello app");

}

const app = (req, res) => {
    res.send("hello app");
}




module.exports = {
    home,
    app
}
