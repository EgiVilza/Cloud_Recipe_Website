const express = require('express');
const app = express()
const PORT = process.env.PORT || 80;

app.use(express.json())

app.use(express.static("public"));

require("./routes/htmlRoutes")(app);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
})