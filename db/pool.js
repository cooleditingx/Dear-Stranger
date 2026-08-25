import { Pool } from "pg";

const pool = new Pool({
    host: 'localhost',
    user: 'starlight',
    database: 'messages_app_db',
    port: '5432'
})
export default pool