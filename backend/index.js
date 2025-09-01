import express from "express";
import mongoose from "mongoose";
import dbConnection from "./database/db.js";
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import bodyParser from "body-parser";
import {Server} from "socket.io";
import cors from 'cors';
import userRoute from "./routes/user.router.js";
import { yargsCommand } from "./yargsCommands.js";
import mainRouter from "./routes/main.router.js";


const startServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Database connection
  dbConnection();

  // Enable CORS for all origins
  app.use(cors({origin: "*"})); 

  app.use("/", mainRouter);

  //=====================================================
  // Create HTTP server
  let user = "test";
  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors:{
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  // Socket.io connection
  io.on("connection", (socket)=>{
    socket.on("joinRoom", (userID) =>{
      user = userID;
      console.log("==========")
      console.log(user);
      console.log("===========")
      socket.join(userID);
    })
  })
  //=====================================================

  const db = mongoose.connection;
  db.once("open", async()=>{
    console.log("CRUD operations called")
  })

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

yargsCommand(startServer); // Initialize yargs commands
