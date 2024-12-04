const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express();

router.post("/register", async (request, response) => {
    const user = {
        email: request.body.email,
        password: request.body.password,
    };

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const createdUser = await User.create({ ...user, password: hashPassword });

    response.status(201).send(createdUser);
});

router.post("/login", async (request, response) => {
    const password = request.body.password;

    let user = await User.findOne({ email: request.body.email }).lean();

    if (!user) {
        response.status(400).send({ error: "Invalid credentials" });
    }

    if (!user || !user.password) {
        return response.status(401).send({ error: "Invalid credentials" });
    }
    
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    
    if (!isPasswordValid) {
        return response.status(401).send({ error: "Invalid credentials" });
    }    

    delete user.password;

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

    response.status(200).send({ token, user });
});

module.exports = router;
