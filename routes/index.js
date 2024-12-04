const express = require("express");

const router = express();

router.get("/", (request, response) => {
    response.send("Home");
});

router.get("/about", (request, response) => {
    response.send("About");
});

router.get("/contacts", (request, response) => {
    response.send("Contacts");
});

module.exports = router;