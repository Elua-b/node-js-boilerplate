const express =require ('express');
const { createTodo, getTodos, getTodo } = require("../controllers/todoController");

const todoRouter=express.Router();

todoRouter.post("/create",createTodo);
todoRouter.get("/all",getTodos);
todoRouter.get("/:id",getTodo);



module.exports=todoRouter
