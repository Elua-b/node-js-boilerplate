const  express =require ("express");
const router = express.Router();
const userRouter =require ("./user.route");
router.use("/user", userRouter
/* 
  #swagger.tags = ['User']
  
  #swagger.security = [{
            "bearerAuth": []
    }] 
*/
);

const todoRouter =require ("./todo.route");
router.use("/todo", todoRouter
/* 
  #swagger.tags = ['Todo']
  
  #swagger.security = [{
            "bearerAuth": []
    }] 
*/
);
module.exports=router
