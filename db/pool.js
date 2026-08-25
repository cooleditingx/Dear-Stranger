import { Pool } from "pg";

const pool = new Pool({
    connectionString: "postgresql://postgres:BBqGciWpsxAyGyUaLUjlMVKQnSNylewY@postgres-gs4f.railway.internal:5432/railway"
})
export default pool