import { Pool } from "pg";
require("dotenv").config();

interface PoolConfig {
    user: string,
    password: string,
    host: string,
    port: number,
    database: string
}

const devConfig: PoolConfig = {
    user: process.env.PG_USER || "",
    password: process.env.PG_PASSWORD || "",
    host: process.env.PG_HOST || "",
    port: parseInt(process.env.PG_PORT || "5432"),
    database: process.env.PG_DATABASE || ""
};

const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
};

const pool = new Pool((process.env.NODE_ENV === "production") ? proConfig : devConfig);

export default pool;