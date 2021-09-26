import express from "express";
const router = express.Router();
import user_controller from "../controllers/users";


// Create
router.post("/", user_controller.create);
// Get One
router.get("/:id", user_controller.getOne);
// Get One by Email
router.get("/email/:email", user_controller.getOneByEmail);
// Get All
router.get("/", user_controller.getAll);
// Update
router.put("/:id", user_controller.update);
// Delete
router.delete("/:id", user_controller.deleteOne);


export default router;