import "reflect-metadata";
import "./config/container";
import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { ConnectDb } from "./config/db";
import app from "./app";
import { initSocket } from "./config/socket";
import logger from "./utils/logger";

const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app); 
initSocket(httpServer); 

ConnectDb()
  .then(() => {
    httpServer.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error("Failed to start server:", error);
    process.exit(1);
  });