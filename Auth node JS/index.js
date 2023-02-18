const express = require('express');
const authRouter = require('./routes/auth');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const profil = require('./profil');
const PORT = process.env.PORT || 3000

dotenv.config()

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log('connected to mongoDB');
});

app.use(express.json());

app.use('/',authRouter);
app.use('/profil',profil);

app.listen(PORT,()=>{
    console.log('listening on port 3000');
});