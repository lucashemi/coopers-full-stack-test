import { app } from "./app";
import knex from "./config/knexfile";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

const runMigrations = async () => {
  try {
    console.log("Rodando migrations...");
    await knex.migrate.latest();
    console.log("Migrations executadas com sucesso.");
  } catch (error) {
    console.error("Erro ao rodar migrations:", error);
  }
};

runMigrations().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});
