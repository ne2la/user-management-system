import UserDetails from "../models/userDetails.js";
import mongoose from "mongoose";

export const getPosts =  async (req,res) => {
    
    try {
        const posts = await UserDetails.find();
        res.json(posts)
    } catch (error) {
        res.json(error)
    }

}

export const createPost =  async (req,res) => {
    
    const post = req.body;
    const {userName,userEmail,NIC,occupation,mobileNumber} = req.body;

    const isValidName = userName.match(/^[a-zA-Z ]+$/)
    if(!isValidName) return res.status(400).json({ message: "Invalid Name." });

    const isValidEmail = userEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if(!isValidEmail) return res.status(400).json({ message: "Invalid Email." });

    const isValidNic = NIC.match(/^\d{12}$/);
    if(!isValidNic) return res.status(400).json({ message: "Invalid NIC." });

    const isValidOccupation = occupation.match(/^[a-zA-Z ]+$/)
    if(!isValidOccupation) return res.status(400).json({ message: "Invalid Occupation." });

    const isValidMobileNumber = mobileNumber.match(/^\d{10}$/);
    if(!isValidMobileNumber) return res.status(400).json({ message: "Invalid Mobile Number" });

    const isExistingEmail = await UserDetails.findOne({ userEmail });
    if(isExistingEmail) return res.status(400).json({ message: "Email already exists" });

    const isExistingNIC = await UserDetails.findOne({ NIC });
    if(isExistingNIC) return res.status(400).json({ message: "NIC already exists" });

    const isExistingMobile = await UserDetails.findOne({ mobileNumber });
    if(isExistingMobile) return res.status(400).json({ message: "Mobile Number already exists" });

    const newPost = new UserDetails(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.json(error)
    }

}

export const updatePost =  async (req,res) => {
    
    const post = req.body;
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    try {

        const updatedPost = await UserDetails.findByIdAndUpdate(id,{...post,_id:id},{new: true});
        res.json(updatedPost)

    } catch (error) {
        res.json(error)
    }

}

export const deletePost =  async (req,res) => {
    
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

    try {

        await UserDetails.findByIdAndRemove(id)
        res.json("Post Deleted Successfully")

    } catch (error) {
        res.json(error)
    }

}