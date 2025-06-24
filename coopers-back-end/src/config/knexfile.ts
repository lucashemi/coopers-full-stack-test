import Knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const knex = Knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    directory: "./src/migrations",
  },
});

export default knex;
