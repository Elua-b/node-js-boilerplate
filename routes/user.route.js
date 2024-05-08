const express = require("express");
const { check } = require('express-validator');
const userRouter = express.Router();

const { register, login } =require ("../controllers/user.controller");

userRouter.post('/register',register);  
userRouter.post('/login',login)

module.exports = userRouter;
