const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schemes/User');
const keys = require('../config/keys');
const validateLoginInput = require('../valildator/login');
const validateRegisterInput = require('../valildator/register'); 
const msg = require('../utils/massageManager');

router.route('/login').post((req, res) => {
    
    const {errors, isValid} = validateLoginInput(req.body);
    
    // check for validators 
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    // finding user by email
    User.findOne({email}).then(user => {
        
        // checking if user exists
        if (!user) {
            return res.status(400).json({errors:{emailnotfound: 'Email doesn\'t exists'}})
        }
        
        // check password
        bcrypt.compare(password, user.password).then(isMatch => {

            if (isMatch) {
                // creating JWT payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    surname: user.surname
                };

                // sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 604800
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: token
                        });
                    }
                );
            } else {
                return res.status(400).json({errors:{passwordincorrect:"Password is incorrect"}})
            }
        });
    });
});

router.route('/register').post((req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);

     // checking for validators
     if (!isValid) {
        return res.status(400).json(errors);
    }

    // register user
    User.findOne({email: req.body.email}).then(user => {
        
        if (user) {
            return res.status(400).json({email: "Email already exists"});
        } else {

            const name = req.body.name;
            const surname = req.body.surname;
            const email = req.body.email;
            const password = req.body.password;

            const newUser = new User({ name, surname, email, password });
            // hashing password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw new err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err = console.log(err));
                });
            });
            // msg.massageManager(name, surname, email); logic is working, just create proper email
        };
    });
});

module.exports = router;