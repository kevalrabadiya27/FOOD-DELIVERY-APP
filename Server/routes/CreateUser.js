const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

router.post('/createuser',
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'incorrect password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                password: securePass,
                email: req.body.email
            })
            res.send({ sucess: true });
        } catch (e) {
            res.send({ sucess: false });
        }

    })

module.exports = router;