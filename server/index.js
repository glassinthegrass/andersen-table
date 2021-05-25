var path = require('path');
require('dotenv').config({path: path.resolve(__dirname, "../.env") });
var massive =require ('massive');
var session = require('express-session')
var express = require('express')
const resetCtrl = require('./controllers/resetCtrl')
const memCtrl = require('./controllers/memCtrl')
const recipeCtrl = require('./controllers/recipeCtrl')

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
app.use(express.json());

app.use(
    session({
        secret:SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge: 31556952000,
            sameSite: "Strict",
        },       
    })
);

io.on('connection', (socket)=>{

    socket.on('join room',(room)=>{
        socket.join(room,(err)=>{
            if(err) console.log('error on join',err);
            else console.log('joined room',room);
        })
    })

socket.on('new msg',(room,msg)=>{
    const db = app.get('db');

    socket.to(room).emit('incoming msg',msg);
    const {member_id}= msg;
    
    db.create_recipe(member_id);

})

})
//reset DB with Seed file
app.post("/api/reset-db", resetCtrl.resetDB);
//member endpoints
app.post("/auth/register", memCtrl.registerMember);
app.post("/auth/login", memCtrl.loginMember);
//recipe
app.post('/api/create-recipe/:member_id',recipeCtrl.newRecipe)
app.post('/api/add-direction/:recipe_id',recipeCtrl.newDirection)
app.post('/api/add-ingredient/:recipe_id',recipeCtrl.newIngredient)

massive(
    {
      connectionString: CONNECTION_STRING,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    { scripts: path.join(__dirname, "../db") }
  )
    .then((dbInstance) => {
      app.set("db", dbInstance);
      httpServer.listen(SERVER_PORT, () => {
        console.log(`Server running on port ${SERVER_PORT}`);
      });
    })
    .catch((err) => console.log(err));