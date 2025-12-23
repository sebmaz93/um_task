import express, { Express } from "express";
import userRouter from "./modules/users/user.routes.js";
import groupRouter from "./modules/groups/group.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app: Express = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/groups", groupRouter);

app.use(errorHandler);

export default app;
