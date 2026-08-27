import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  message VARCHAR ( 255 )
);

INSERT INTO messages
VALUES
  (default,'hi from bryan','Bryan'),
  (default,'kneel before me',Odin'),
  (default,'gloriuos purpose','loki);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
