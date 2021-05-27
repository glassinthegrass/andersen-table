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

socket.on('register',async (room,info)=>{
    const db = app.get('db');
    const {email,password,name}= info;
    let hash = password
    let newMember = await db.member.register_member(email,hash,name);
info = newMember
    io.in(room).emit('new member info',info);
})

socket.on('login',async (room,info)=>{
const db = app.get('db');
  const {email,password}= info;
  let [newMember] = await db.member.get_member_by_email(email);
  console.log(newMember)
  info = newMember
info.isLoggedIn = true
  io.in(room).emit('existing member info',info);
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