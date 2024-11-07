import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';
// conectar a base de datos

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.magenta("conexion exitosa a la BBDD"));
  } catch (error) {
    // console.log(error);
    console.log(colors.red('hubo un error al conectarse a la BBDD'));
  }
}
// levantando servidor
connectDB();
// instancia de express
const server = express();

// leer datos de formularios
server.use(express.json());
server.use('/api/products', router);

server.get('/api', (req, res) => {
  res.json({ msg: 'Desde API' });
});

export default server;
