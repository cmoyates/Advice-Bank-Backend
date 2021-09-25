import express from "express";
const router = express.Router();
import post_controller from "../controllers/posts";

// Create
router.post("/", post_controller.create);
// Get One
router.get("/:id", post_controller.getOne);
// Get All
router.get("/", post_controller.getAll);
// Update
router.put("/:id", post_controller.update);
// Delete
router.delete("/:id", post_controller.deleteOne);

// Get all by title substring
// Get all by user name substring
// Get all by content substring
// Get all by tags
// Get all from today / this week / month / year



export default router;