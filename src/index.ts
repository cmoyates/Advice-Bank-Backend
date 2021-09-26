import express from "express";
import cors from "cors";
import post_router from "./routes/posts";
import user_router from "./routes/users";
const app = express();

app.use(cors());
app.use(express.json());


// Posts
app.use("/posts", post_router);

// Users
app.use("/users", user_router);


app.use('/', (req, res) => {
    res.send("Still working!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});