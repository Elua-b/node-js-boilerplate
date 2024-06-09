const express = require("express");
const { check } = require('express-validator');
const userRouter = express.Router();

const { register, login, getUser, updateUser, deleteUser, getAllUsers } =require ("../controllers/user.controller");

userRouter.post('/register',register);  
userRouter.post('/login',login)
userRouter.get("/all", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);

module.exports = userRouter;
