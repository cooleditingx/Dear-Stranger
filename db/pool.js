import { Pool } from "pg";

const pool = new Pool({
    connectionString: process.env.URL
})
export default pool