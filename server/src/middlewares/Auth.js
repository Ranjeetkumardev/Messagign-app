import User from "../models/User.js";
import jwt from "jsonwebtoken"

export const userAuth = async (req, res, next) => {
 try {
    //const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
   const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     return res.status(401).send("Please Login!");
   }
  
   // verifying the token
   const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
  
   // retriving id form token
   const { _id } = decodedObj;
   
   const user = await User.findById(_id);
   if (!user) {
     throw new Error("User not found");
   }

   req.user = user;
   next();
 } catch (err) {
   res.status(400).send("ERROR: " + err.message);
 }
};


