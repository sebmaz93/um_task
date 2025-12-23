import { createApp } from "./app.js";
import { env } from "./config/env.js";

const app = createApp();

const server = app.listen(env.PORT, () => {
  // TODO : add better prod level logging
  console.info(`Server running on port ${env.PORT}`);
  console.info(`Environment: ${env.NODE_ENV}`);
});

process.on("uncaughtException", (err) => {
  console.error({ err }, "Uncaught exception");
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error({ reason }, "Unhandled rejection");
  process.exit(1);
});
