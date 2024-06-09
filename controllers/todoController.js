const { validateTodo, Todo } = require("../models/todoModal");

const createTodo=async(req,res)=>{
    try{
        const {error}=validateTodo(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const {title,description,status}=req.body;
        let todo=new Todo({
            title,
            description,
            status
        });
        await todo.save();
        return res.status(200).send({todo,message:"todo created successfully"});
    }
    catch(error){
        console.log(error);
        return res.status(500).send({error,message:"Internal server error"});
    }

}
const getTodos=async(req,res)=>{
    try{
        const todos=await Todo.find();
        return res.status(200).send({todos,message:"todos fetched successfully"});
    }
    catch(error){
        return res.status(500).send({error,message:"Internal server error"});
    }
}
const getTodo=async(req,res)=>{
    try{
        const todo=await Todo.findById(req.params.id);
        if(!todo) return res.status(404).send("Todo not found");
        return res.status(200).send({todo,message:"todo fetched successfully"});
    }
    catch(error){
        return res.status(500).send({error,message:"Internal server error"});
    }
}
const updateTodo=async(req,res)=>{
    try{
        const {error}=validateTodoUpdate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const {title,description,status}=req.body;
        const todo=await Todo.findById(req.params.id);
        if(!todo) return res.status(404).send("Todo not found");
        todo.title=title;
        todo.description=description;
        todo.status=status;
        await todo.save();
        return res.status(200).send({todo,message:"todo updated successfully"});
    }
    catch(error){
        return res.status(500).send({error,message:"Internal server error"});
    }
}
const deleteTodo=async(req,res)=>{
    try{
        const todo=await Todo.findByIdAndDelete(req.params.id);
        if(!todo) return res.status(404).send("Todo not found");
        return res.status(200).send({message:"todo deleted successfully"});
    }
    catch(error){
        return res.status(500).send({error,message:"Internal server error"});
    }
}
module.exports={
    createTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo
}