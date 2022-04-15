import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import errorMiddleware from "./middlewares/error.middleware";
import authRouter from "./routes/auth.route";
import usersRouter from "./routes/users.route";
import companiesRouter from "./routes/companies.route";
import reportsRouter from "./routes/reports.route";
import tokenGuard from "./middlewares/guard.middleware";

const app = express();

app.use(helmet());
app.use(morgan());
app.use(cors({ credentials: true }));
app.use(express.json());

// Routing
app.use("/api/auth", authRouter);
app.use("/api/users", tokenGuard, usersRouter);
app.use("/api/companies", tokenGuard, companiesRouter);
app.use("/api/reports", tokenGuard, reportsRouter);

app.use(errorMiddleware);

export default app;
