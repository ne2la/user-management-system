import mongoose from "mongoose";

const userDetailsSchema = mongoose.Schema({
    userName: String,
    userEmail: String,
    occupation: String,
    NIC: String,
    gender: String,
    address: String,
    dateOfBirth: Date,
    mobileNumber: String,
    userImage: String
});

const UserDetails = mongoose.model('UserDetails',userDetailsSchema);

export default UserDetails;