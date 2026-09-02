import { Client } from "pg";
import fs from 'fs'
import pool from "../db/pool.js";
import path from "path";
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  imgesid INTEGER UNIQUE REFERENCES images(imgid) ON DELETE SET NULL,
  message VARCHAR ( 255 ),
  username VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS images (
  imgid SERIAL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  imgname VARCHAR (255),
  mimetype VARCHAR (100),
  imgdata BYTEA,
  createdate TIMESTAMP DEFAULT NOW()
);
INSERT INTO messages (message, username)
VALUES
  ('hi from bryan', 'Bryan'),
  ('kneel before me', 'Odin'),
  ('gloriuos purpose', 'loki');
`;

async function insertImage(filepath) {
  try {
    const buffer = fs.readFileSync(filepath);
    const filename = path.basename(filepath);
    const ext = path.extname(filepath).toLowerCase();
    const mimeMap = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    };
    const mimetype = mimeMap[ext] || 'application/octet-stream';

    const result = await pool.query(
      'INSERT INTO images (imgname, mimetype, imgdata) VALUES ($1, $2, $3) RETURNING imgid',
      [filename, mimetype, buffer]
    );

    console.log(`Inserted "${filename}" as id ${result.rows[0].id}`);
  } catch (err) {
    console.error('Insert failed:', err);
  } finally {
    await pool.end();
  }
}

insertImage('public/assets/Texturelabs_Sky_122M.jpg');
insertImage('public/assets/fish-photobooth.png')
async function main() {
  console.log("seeding...");
//   const client = new Client ({
//     host: 'localhost',
//     user: 'starlight',
//     database: 'messages_app_db',
//     port: 5432
//   })
  const client = new Client({
    connectionString: process.env.URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
