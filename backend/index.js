const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const server = require('server');
const PengingatHRD = require('./config/scheduller')

//Database Connection
const { DBConnection, redisConnection } = require('./config/database')
DBConnection();
redisConnection()

//Scheduller
PengingatHRD()

const app = express();
const port = 8080;
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res)=>{
    res.send({
        message: "Tersambung"
    });
});

app.use("/", require('./rooter/index'))

app.listen(port, ()=> console.log(`App running ${port}`));
// server(ctx => 'Hello world!');