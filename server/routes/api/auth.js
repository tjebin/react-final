const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

// Route is /authintication

// auth as a middleware has req.user
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        // as the user with that id exists so proceed

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    res.send('Auth Route..');
})

// Login
router.post('/', [
    check('email', 'Please include a valid email ')
        .isEmail(),
    check('password', 'Password is required ')
        .exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { email, password } = req.body;
    console.log(" Email " + email + " Password " + password);
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials !!' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: 'Invalid Credentials !!' }] });
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw error;
                res.json({ token });
            }
        );
        //res.send('User Registered!!');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    // see if user exists
    // get users gravator
    //encrypt pasword
    // return jsonweb token
    //res.send('User Route..');
})


module.exports = router;