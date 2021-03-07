const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../../schemes/User');

router.get('/', async (req, res) => {
    try {
        const userList = await User.find({}, 'name surname email createdAt').exec();
        res.json(userList);

    } catch (e) {
        res.status(500).send('Server Error');
    }
})
module.exports = router;
