import { Client } from "pg";
import fs from 'fs';
import path from "path";

const SQL_TABLES = `
CREATE TABLE IF NOT EXISTS images (
  imgid SERIAL PRIMARY KEY,
  imgname VARCHAR(255),
  mimetype VARCHAR(100),
  imgdata BYTEA,
  createdate TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  imgid INTEGER UNIQUE REFERENCES images(imgid) ON DELETE SET NULL,
  message VARCHAR(255),
  username VARCHAR(255)
);
`;

const mimeMap = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

async function insertImage(client, filepath) {
  const buffer = fs.readFileSync(filepath);
  const filename = path.basename(filepath);
  const ext = path.extname(filepath).toLowerCase();
  const mimetype = mimeMap[ext] || 'application/octet-stream';

  const result = await client.query(
    'INSERT INTO images (imgname, mimetype, imgdata) VALUES ($1, $2, $3) RETURNING imgid',
    [filename, mimetype, buffer]
  );

  console.log(`Inserted "${filename}" as imgid ${result.rows[0].imgid}`);
  return result.rows[0].imgid;
}

async function insertMessage(client, message, username, imgid = null) {
  const result = await client.query(
    'INSERT INTO messages (message, username, imgid) VALUES ($1, $2, $3) RETURNING id',
    [message, username, imgid]
  );
  console.log(`Inserted message id ${result.rows[0].id} (imgid: ${imgid ?? 'none'})`);
}

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  console.log("seeding...");
  await client.query(SQL_TABLES);

  const skyImgId = await insertImage(client, 'public/assets/Texturelabs_Sky_122M.jpg');
  const fishImgId = await insertImage(client, 'public/assets/fish-photobooth.png');
  await insertMessage(client, 'hi from bryan', 'Bryan', skyImgId);
  await insertMessage(client, 'kneel before me', 'Odin', fishImgId);
  await insertMessage(client, 'glorious purpose', 'loki', null); // no image for this one
  await client.end();
  console.log("done");
}

main().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});