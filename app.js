import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import authRouter from "./routes/auth.route";
import companiesRouter from "./routes/companies.route";
import reportsRouter from "./routes/reports.route";
import guard from "./middlewares/guard.middleware";

const app = express();

app.use(helmet());
app.use(morgan());
app.use(cors({credentials: true,}));
app.use(express.json());

// Routing
app.use("/api/auth",  authRouter);
app.use("/api/companies", guard, companiesRouter);
app.use("/api/reports", guard, reportsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

export default app;
