import express from 'express'
import mongoose from 'mongoose';
//connect mongoDb to express through Moogoose
// to install by npm i mongoose

import dns from 'dns'
dns.setServers(["1.1.1.1","8.8.8.8"])

const app = express();

mongoose.connect(
  "mongodb+srv://dhirubhaig413_db_user:Qc0vy7B1YeNYUWso@cluster0.viotox6.mongodb.net/",{
    dbName: "NodeJs_Mastery_Course",
  }
).then(()=>console.log("MongoDb Connected..!")).catch((err)=>console.log(err))

const port = 1000;
app.listen(port,()=>console.log(`Server is running on port ${port}`))


//  "mongodb+srv://dhirubhaig413_db_user:Qc0vy7B1YeNYUWso@cluster0.viotox6.mongodb.net/"
