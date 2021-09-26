import { Request, Response } from "express";
import Post from "../models/post";

const create = async (req: Request, res: Response) => {
    try {
        const {user_id, user_name, user_img, title, content, tags} = req.body;
        const newPost = await Post.create(user_id, user_name, user_img, title, content, tags);
        res.json((newPost) ? newPost : "Post could not be created");
    } catch (error) {
        console.log(error);
    }
}

const getOne = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const post = await Post.getOne(parseInt(id));
        res.json((post) ? post : "No post exists with that ID");
    } catch (error) {
        console.log(error);
    }
}

const getAll = async (req: Request, res: Response) => {
    try {
        const allPosts = await Post.getAll();
        res.json(allPosts);
    } catch (error) {
        console.log(error);
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {user_id, user_name, user_img, title, content, tags} = req.body;
        const success = await Post.update(parseInt(id), user_id, user_name, user_img, title, content, tags);
        res.send((success) ? "Post updated!" : "Post couldn't be updated");
    } catch (error) {
        console.log(error);
    }
}

const deleteOne = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const success = await Post.deleteOne(parseInt(id));
        res.send((success) ? "Post deleted!" : "Post couldn't be deleted");
    } catch (error) {
        console.log(error);
    }
}

export default {
    create,
    getOne,
    getAll,
    update,
    deleteOne
};