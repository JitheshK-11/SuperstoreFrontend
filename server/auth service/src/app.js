import express from "express";
import cors from "cors";
// import helmet from "helmet";

import authRoutes from "./routes/auth.routes.js";

const app = express();

// app.disable("x-powered-by");
// if (process.env.NODE_ENV === "production") {
// 	app.set("trust proxy", 1);
// }

// app.use(helmet());

app.use(express.json({ limit: "10kb" }));
app.use(cors())

// const corsOrigins = process.env.CORS_ORIGINS
// 	? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
// 	: [];

// app.use(
// 	cors({
// 		origin: corsOrigins.length ? corsOrigins : true,
// 		credentials: true
// 	})
// );

app.get("/health", (req, res) => {
	res.json({ status: "ok" });
});

app.use("/auth", authRoutes);

export default app;
