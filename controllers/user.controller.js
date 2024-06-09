const bcrypt =require ("bcrypt");
const { validateUser } =require ("../models/candidate.model");
const { User, validateUserLogin, validateUserUpdate } = require("../models/user.model");

 const register = async (req, res) => {
  try {

    const { error } = validateUser(req.body);
      if(error){
        console.log("errooooo");
      }
   
    const { name, email, password, phone, address, nationalId } = req.body;
    let user = await User.findOne({ email });
    // console.log("hellooo");

    if (user) return res.status(400).send("User already registered");
    user = new User({
      name,
      email,
      password,
      phone,
      address,
      nationalId,
    });
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);
    try {
      await user.save();
      return res.status(200).send({user,message: "User saved successfully"});
    } catch (error) {
      return res.status(400).send({error, message:"user not created"});
    }
  } catch (error) {
    return res.status(500).send({error, message:"Internal server error"});
  }
};
 const login = async (req, res) => {
  try {
    const { error } = validateUserLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");
    const token = user.generateAuthToken();

    return res.status(200).send({token,user, message:"login successful"});
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    return res.status(500).send({error, message:"Internal server error"});
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error, message: "Internal server error" });
  }

};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send("User not found");

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error, message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { error } = validateUserUpdate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    if (!user) return res.status(404).send("User not found");

    return res.status(200).send({ user, message: "User updated successfully" });
  } catch (error) {
    return res.status(500).send({ error, message: "Internal server error" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id).select("-password");
    if (!user) return res.status(404).send("User not found");

    return res.status(200).send({ user, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send({ error, message: "Internal server error" });
  }
};


module.exports = {
    register,
    login,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers

}