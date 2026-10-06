import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

import dns from 'dns'
dns.setServers(["1.1.1.1","8.8.8.8"])

const app = express();

app.use(express.urlencoded({extended:true}))

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "t1pjlrc0",
  api_key: "683876168373323",
  api_secret: "t_0ZPd28btFvvECtw1PPSca1S64",
});

mongoose
  .connect(
    "mongodb+srv://dhirubhaig413_db_user:Qc0vy7B1YeNYUWso@cluster0.viotox6.mongodb.net/",
    {
      dbName: "NodeJs_Mastery_Course_thisway",
    }
  )
  .then(() => console.log("MongoDb Connected..!"))
  .catch((err) => console.log(err));

// rendering login file
app.get("/", (req, res) => {
  res.render("login.ejs", { url: null });
});

// rendering register file
app.get("/register", (req, res) => {
  res.render("register.ejs", { url: null });
});

const storage = multer.diskStorage({
   destination: "./public/uploads",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  filename: String,
  public_id: String,
  imgUrl: String,
});

const User = mongoose.model("user", userSchema);
//upload on vs code path 
app.post("/register", upload.single("file"), async (req, res) => {
  const file = req.file.path;

  const { name, email, password } = req.body;

  const cloudinaryRes = await cloudinary.uploader.upload(file, {
    folder: "NodeJS_Mastery_Course",
  });

  // Creating User
  const db = await User.create({
    name,
    email,
    password,
    filename: file.originalname,
    public_id: cloudinaryRes.public_id,
    imgUrl: cloudinaryRes.secure_url,
  });

  res.redirect("/");
  //   res.render("register.ejs", { url: cloudinaryRes.secure_url });

  // res.json({message:'file uploaded successfully',cloudinaryRes})
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("printing the body = ",req.body)

  let user = await User.findOne({ email }); 
  if (!user) res.render("login.ejs");
  else if (user.password != password) {
    res.render("login.ejs");
  }else{
    res.render('profile.ejs',{user})
  }
});

const port = 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
