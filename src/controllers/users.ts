import { Request, Response } from "express";
import User from "../models/user";

const create = async (req: Request, res: Response) => {
    try {
        const {user_email, user_name, user_img, is_admin} = req.body;
        const newUser = await User.create(user_email, user_name, user_img, is_admin);
        res.json((newUser) ? newUser : "User could not be created");
    } catch (error) {
        console.log(error);
    }
};

const getOne = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = await User.getOne(parseInt(id));
        res.json((user) ? user : "No user exists with that ID");
    } catch (error) {
        console.log(error);
    }
};

const getOneByEmail = async (req: Request, res: Response) => {
    try {
        const {email} = req.params;
        const user = await User.getOneByEmail(email);
        res.json((user) ? user : "No user exists with that email");
    } catch (error) {
        console.log(error);
    }
};

const getAll = async (req: Request, res: Response) => {
    try {
        const allUsers = await User.getAll();
        res.json(allUsers);
    } catch (error) {
        console.log(error);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {user_email, user_name, user_img, is_admin, saved} = req.body;
        const success = await User.update(parseInt(id), user_email, user_name, user_img, is_admin, saved);
        res.send((success) ? "User updated!" : "User couldn't be updated");
    } catch (error) {
        console.log(error);
    }
};

const deleteOne = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const success = await User.deleteOne(parseInt(id));
        res.send((success) ? "User deleted!" : "User couldn't be deleted");
    } catch (error) {
        console.log(error);
    }
};

export default {
    create,
    getOne,
    getOneByEmail,
    getAll,
    update,
    deleteOne
};