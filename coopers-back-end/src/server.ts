import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import knex from "./config/knexfile";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", taskRoutes);

// Função para rodar as migrations automaticamente
const runMigrations = async () => {
  try {
    console.log("Rodando migrations...");
    await knex.migrate.latest(); // Executa as migrations mais recentes
    console.log("Migrations executadas com sucesso.");
  } catch (error) {
    console.error("Erro ao rodar migrations:", error);
  }
};

// Rodar as migrations e iniciar o servidor
runMigrations().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});
