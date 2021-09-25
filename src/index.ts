import express from "express";
import cors from "cors";
import pool from "../db";
import post_router from "./routes/posts";
const app = express();

app.use(cors());
app.use(express.json());

// Posts
app.use("/posts", post_router);

// Users

// Create
// Get one
// Get one by email
// Get all
// Update
// Delete


app.use('/', (req, res) => {
    res.send("Still working!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});