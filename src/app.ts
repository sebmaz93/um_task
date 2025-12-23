import express, { Express } from "express";
import userRouter from "./modules/users/user.routes.js";
import groupRouter from "./modules/groups/group.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFound.js";

export function createApp() {
  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded());

  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  });

  app.use("/api/users", userRouter);
  app.use("/api/groups", groupRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
