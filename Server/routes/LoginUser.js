const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
dotenv.config();

router.post('/loginuser', async (req, res) => {
    let email = req.body.email;
    try {
        const userData = await User.findOne({ email })
        if (!userData) {
            return res.status(400).json({ errors: "Try Logging with correct" })
        }
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);

        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try Logging with correct" })
        }
        // taken a id above mongodb because it's unique
        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        return res.status(200).json({ sucess: true, authToken })
    } catch (e) {
        res.send({ sucess: false });
        console.log(e);
    }

})

module.exports = router;