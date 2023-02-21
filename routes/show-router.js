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

router.put('/rating/:id', validateRating, async (req, res) => {
    const show = await Show.findByPk(req.params.id);
    show.rating = req.body.rating;
    await show.save();
    res.json(show);
})

router.put('/status/:id', validateStatus, async (req, res) => {
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

function validateStatus(req, res, next) {
  const status = req.body.status;
  if (!status || /^\s*$/.test(status)) {
    return res.status(400).json({ error: "Status cannot be empty or contain whitespace" });
  }
  if (status.length < 5 || status.length > 25) {
    return res.status(400).json({ error: "Status must be between 5 and 25 characters" });
  }
  next();
}

function validateRating(req, res, next) {
  const rating = req.body.status;
  if (!rating || /^\s*$/.test(rating)) {
    return res.status(400).json({ error: "Rating cannot be empty or contain whitespace" });
  }
  next();
}

module.exports = router;