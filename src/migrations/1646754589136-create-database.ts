import { createConnection } from "mysql2/promise";

const DB_NAME = process.env.DB_NAME;

if (!DB_NAME) {
  throw new Error("Database name is not defined in the environment variables.");
}

export const up = async () => {
  const connection = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  // Create database if not exists
  await connection.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
  console.log(`Database "${DB_NAME}" created or already exists`);
};

export const down = async () => {
  const connection = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  // Drop the database
  await connection.execute(`DROP DATABASE IF EXISTS ${DB_NAME}`);
  console.log(`Database "${DB_NAME}" dropped`);
};
