import express from 'express'
import mongoose from 'mongoose';
import { shortUrl, getOriginalUrl } from "./Controllers/url.js";
//npm i express,ejs,mongoose in terminals;

import dns from 'dns'
dns.setServers(["1.1.1.1","8.8.8.8"])

const app = express();

app.use(express.urlencoded({extended:true}))

mongoose
  .connect(
    "mongodb+srv://dhirubhaig413_db_user:Qc0vy7B1YeNYUWso@cluster0.viotox6.mongodb.net/",
    {
      dbName: "NodeJs_Mastery_Course_01",
    }
  )
  .then(() => console.log("MongoDb Connected..!"))
  .catch((err) => console.log(err));


  // rendering the ejs file
  app.get('/',(req,res)=>{
    res.render("index.ejs", {shortUrl :null})
  })

  // shorting url logic
  app.post('/short',shortUrl)

  // redirect to original url using short code :- dynamic routing
  app.get("/:shortCode", getOriginalUrl);

const port = 1000;
app.listen(port,()=>console.log(`server is running on port ${port}`))


// "mongodb+srv://dhirubhaig413_db_user:Qc0vy7B1YeNYUWso@cluster0.viotox6.mongodb.net/"
// "mongodb+srv://codesnippet02:nq0sdJL2Jc3QqZba@cluster0.zmf40.mongodb.net/"