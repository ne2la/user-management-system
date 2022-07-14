import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import postRoutes from "./routes/userPost.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/',(req,res) => {
    res.send('Welcome to User Management System API');
});

const PORT = 5000;
const CONNECTION_URL = 'mongodb+srv://madushan:Madushan123@cluster0.bllt9.mongodb.net/?retryWrites=true&w=majority'; 

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));