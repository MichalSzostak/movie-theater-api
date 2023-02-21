const express = require("express");
const router = express.Router();
const { User, } = require("../models/index");


router.use(express.json());

router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users)
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
})

router.get('/:id/shows', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const shows = await user.getShows();
    res.json(shows);
})

// add user.id to userId column in shows table using put passing showID in body
router.put('/:id/shows', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    const show = await Show.findByPk(req.body.showId);
    await user.addShow(show);
    res.json(show);
})

module.exports = router;