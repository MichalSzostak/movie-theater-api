const express = require("express");
const router = require('express').Router();


const userRouter = require('./user-router');
const showRouter = require('./show-router');


router.use('/users/', userRouter);
router.use('/shows/', showRouter);

module.exports = router;
