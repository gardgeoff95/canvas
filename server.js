const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/htmlRoutes")(app);
app.listen(PORT, function() {
    console.log("***************************************\n" + 
                "Server up and listening on port " + PORT +
                "\n***************************************\n");

})