   
import pool from "../../db";
import pg from "pg";

class Post {
    post_id: number;
    user_id: number;
    user_name: string;
    user_img: string;
    title: string;
    content: string;
    tags: Array<string>;
    ts: any;

    constructor(id: number, user_id: number, user_name: string, user_img: string, title: string, content: string, tags: Array<string>, ts: any) {
        this.post_id = id;
        this.user_id = user_id;
        this.user_name = user_name;
        this.user_img = user_img;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.ts = ts;
    }

    static async create(user_id: number, user_name: string, user_img: string, title: string, content: string, tags: Array<string>): Promise<Post> {
        const newPost = await pool.query(
            "INSERT INTO posts (user_id, user_name, user_img, title, content, tags, ts) VALUES($1, $2, $3, $4, $5, $6, current_timestamp) RETURNING *",
            [user_id, user_name, user_img, title, content, tags]
        );
        return newPost.rows[0];
    }

    static async getOne(id: number): Promise<Post> {
        const post = await pool.query(
            "SELECT * FROM posts WHERE post_id = $1", 
            [id]
        );
        return post.rows[0];
    }

    static async getAll(): Promise<Array<Post>> {
        const allPosts = await pool.query(
            "SELECT * FROM posts ORDER BY post_id DESC"
        );
        return allPosts.rows;
    }

    static async update(id: number, user_id: number, user_name: string, user_img: string, title: string, content: string, tags: Array<string>): Promise<void> {
        await pool.query(
            "UPDATE posts SET user_id = $1, user_name = $2, user_img = $3, title = $4, content = $5, tags = $6 where post_id = $7",
            [user_id, user_name, user_img, title, content, tags, id]
        );
    }

    static async deleteOne(id: number): Promise<void> {
        await pool.query(
            "DELETE FROM posts WHERE post_id = $1",
            [id]
        );
    }
}

export default Post;