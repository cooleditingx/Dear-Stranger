import { Client } from "pg";
import fs from 'fs'
import pool from "../db/pool.js";
import path from "path";
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  message VARCHAR ( 255 ),
  username VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS images (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  imgname VARCHAR (255),
  mimetype VARCHAR (100),
  imgdata BYTEA,
  createdate TIMESTAMP DEFAULT NOW()
);
INSERT INTO images (imgname,imgdata,mimetype)
VALUES ('check','https://i.pinimg.com/1200x/22/b2/67/22b2672ae734935f753c6e1f82d25be5.jpg', 'image/jpeg');

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
      'INSERT INTO images (imgname, mimetype, imgdata) VALUES ($1, $2, $3) RETURNING id',
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
