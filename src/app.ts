import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import professionalRoutes from "./routes/professionalRoutes.js";
import proposalRoutes from "./routes/proposalRoutes.js";
import proposalProfessionalRoutes from "./routes/proposalProfessionalRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Middleware de logging de requisições
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`\n📥 [${timestamp}] ${req.method} ${req.url}`);

  if (req.body && Object.keys(req.body).length > 0) {
    console.log("📋 Body:", JSON.stringify(req.body, null, 2));
  }
  if (req.params && Object.keys(req.params).length > 0) {
    console.log("📍 Params:", JSON.stringify(req.params, null, 2));
  }
  if (req.query && Object.keys(req.query).length > 0) {
    console.log("🔍 Query:", JSON.stringify(req.query, null, 2));
  }
  next();
});

app.use("/auth", authRoutes);
app.use("/professionals", professionalRoutes);
app.use("/proposals", proposalRoutes);
app.use("/proposal-professionals", proposalProfessionalRoutes);
app.use("/ratings", ratingRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  const timestamp = new Date().toISOString();
  console.error(
    `\n❌ [${timestamp}] Erro na requisição ${req.method} ${req.url}:`,
  );
  console.error(err.stack || err);

  res.status(500).json({
    erro: "Erro interno do servidor",
    detalhes: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
