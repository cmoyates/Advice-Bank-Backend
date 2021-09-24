import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

app.use('/', (req, res) => {
    res.send("Still working!");
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});