import {Pool, Client} from "pg";
require("dotenv").config({ path: "./.env" });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool