const express = require("express");
const router = express.Router();
const { Show } = require("../models/index");
const { db } = require('../db');

router.use(express.json());


router.get('/', async (req, res) => {
    const shows = await Show.findAll();
    res.json( shows );
})

router.get('/id/:id', async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    res.json(show);
})

router.get('/genre/:genre', async (req, res) => {
    const genre = req.params.genre.toLowerCase();
    const shows = await Show.findAll({
        where: db.where(
          db.fn('lower', db.col('genre')),
          genre
        )
      });
    res.json(shows);
});

router.put('/rating/:id', async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    show.rating = req.body.rating;
    await show.save();
    res.json(show);
})

router.put('/status/:id', async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    show.status = req.body.status;
    await show.save();
    res.json(show);
})

router.delete('/:id', async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    await show.destroy();
    res.json(show);
})

module.exports = router;