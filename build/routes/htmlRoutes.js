const path = require("path")

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    })

    app.get("/map", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/map.html"))
    })

    app.get("/advanced", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/advanced.html"))
    })
}