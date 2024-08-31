import express from "express";
import router from "./router";
import db from "./config/db";

// conectar a base de datos

async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log("conexion exitosa a la BBDD");
  } catch (error) {
    console.log(error);
    console.log("hubo un error al conectarse a la BBDD");
  }
}
connectDB();
const server = express();

server.use("/api/products", router);

export default server;
