const express = require('express');
const {Client} = require('pg');
const cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken'); // Importa jsonwebtoken
const PORT = 8000;

app.use(express.json());
app.use(cors());
const db_args = {
    host :'127.0.0.1',
    user : 'postgres',
    database : 'postgres',
    password : 'Softjuandius_25',
    port : 5432
}
function createToken(username) {
  const payload = {
    username, // Puedes agregar más información si es necesario
  };

  const secretKey = 'tu_clave_secreta'; 

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}
const client = new Client(db_args)
client.connect();
//

async function getuser(req,res){
    try{
        console.log("Aqui");
        const user = req.query.usuario;
        const reponse = await client.query(`select * from users where token = '${user}'`);
        console.log(reponse.rows);
        res.json(reponse.rows);            

    } catch(err) {
        console.log(err.message);
    } finally{
        res.end()
    }
}
async function createUser(req, res) {
    try {
        const user = req.body.user;
        const password = req.body.password;
        const token = createToken(user);

        console.log(user);
        console.log(password);

        // Utiliza consultas parametrizadas para evitar SQL Injection
        const response = await client.query(
            `INSERT INTO users (usuario, contrasenia, token, impuesto) VALUES ($1, $2, $3, $4)`,
            [user, password, token, 100]
        );

        res.json({ message: 'Usuario creado exitosamente', token });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: 'Ocurrió un error al crear el usuario' });
    }
}


app.post('/createuser',createUser);
app.get('/',(req,res)=>{
    res.send("Hola!");
});
app.get('/getuser',getuser)
app.listen(PORT,(req,res)=>{
    console.log("Escuchando...");
})