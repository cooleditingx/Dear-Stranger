import { Pool } from "pg";

// const pool = new Pool({
//     connectionString: process.env.URL
// })
const pool = new Pool({
    user: 'starlight',
    database: 'messages_app_db',
    host: 'localhost',
    port: 5432
})
export default pool