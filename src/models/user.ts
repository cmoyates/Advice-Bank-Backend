import pool from "../db";

class User {
    user_id: number;
    user_email: string;
    user_name: string;
    user_img: string;
    is_admin: boolean;
    saved: Array<number>;

    constructor(id: number, user_email: string, user_name: string, user_img: string, is_admin: boolean, saved: Array<number>) {
        this.user_id = id;
        this.user_email = user_email;
        this.user_name = user_name;
        this.user_img = user_img;
        this.is_admin = is_admin;
        this.saved = saved;
    }

    static async create(user_email: string, user_name: string, user_img: string, is_admin: boolean): Promise<User> {
        const newUser = await pool.query(
            "INSERT INTO users (user_email, user_name, user_img, is_admin, saved) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [user_email, user_name, user_img, is_admin, []]
        );
        return newUser.rows[0];
    }

    static async getOne(id: number): Promise<User> {
        const user = await pool.query(
            "SELECT * FROM users WHERE user_id = $1",
            [id]
        );
        return user.rows[0];
    }

    static async getOneByEmail(email: string): Promise<User> {
        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email]
        );
        return user.rows[0];
    }

    static async getAll(): Promise<Array<User>> {
        const allUsers = await pool.query("SELECT * FROM users");
        return allUsers.rows;
    }

    static async update(id: number, user_email: string, user_name: string, user_img: string, is_admin: boolean, saved: Array<number>): Promise<boolean> {
        const result = await pool.query(
            "UPDATE users SET user_email = $1, user_name = $2, user_img = $3, is_admin = $4, saved = $5 where user_id = $6",
            [user_email, user_name, user_img, is_admin, saved, id]
        );
        return result.rowCount === 1;
    }

    static async deleteOne(id: number): Promise<boolean> {
        const result = await pool.query(
            "DELETE FROM users WHERE user_id = $1",
            [id]
        );
        return result.rowCount === 1;
    }
}

export default User;