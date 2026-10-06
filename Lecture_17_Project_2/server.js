//User uploads an image → Multer receives it → Cloudinary stores the image → MongoDB stores image information → EJS displays the uploaded image.
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
// Use Cloudflare and Google DNS servers
// This can help when the system's default DNS has MongoDB SRV lookup problems

import dns from 'dns'
dns.setServers(["1.1.1.1","8.8.8.8"])

const app = express();
// for use another file by export;
app.use(express.urlencoded({extended:true}))

// Cloudinary is a cloud service used to store and manage
// images, videos and other media files
// Instead of storing large image files on our own server,
// we upload them to Cloudinary.

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary using credentials

// IMPORTANT: In a real project, keep these values inside .env
cloudinary.config({
  cloud_name: "t1pjlrc0",
  api_key: "683876168373323",
  api_secret: "t_0ZPd28btFvvECtw1PPSca1S64",
});

// Connect Node.js application to MongoDB Atlas

mongoose
  .connect(
    "mongodb+srv://dhirubhaig413_db_user:Qc0vy7B1YeNYUWso@cluster0.viotox6.mongodb.net/",
    {
      dbName: "NodeJs_Mastery_Course_",
    }
  )
  .then(() => console.log("MongoDb Connected..!"))
  .catch((err) => console.log(err));

// rendering ejs file
app.get("/", (req, res) => {
  res.render("index.ejs", { url: null });
});
// diskStorage tells Multer to temporarily save
// uploaded files on the server's disk
// Multer handles files uploaded from the frontend.

// diskStorage() tells Multer to temporarily store in ./public/uploads"
// provide uploaded file desination and naming formate on the server's disk.
//Read Doucumentation;

const storage = multer.diskStorage({
  destination: "./public/uploads",
// File name configuration
  filename: function (req, file, cb) {
    //upload a good file
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    // Example:
    // file-17283920123.jpg
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
// Create the Multer upload middleware i.e we use multer
const upload = multer({ storage: storage });

//uploaded image in  destination folder in vs code 
//same name file " upload.single("file")" in input file
app.post("/upload", upload.single("file"), async (req, res) => {

  try {
     //req.file is an object containing information about the uploaded file:
//   {
//   fieldname: "file",
//   originalname: "myphoto.jpg",
//   filename: "file-17283920123.jpg",
//   path: "public/uploads/file-17283920123.jpg",
//   mimetype: "image/jpeg",
//   size: 123456
// }
  const file = req.file.path;




//upload file on cloudinary
  const cloudinaryRes = await cloudinary.uploader.upload(file, {
    folder: "NodeJS_Mastery_Course",
  });


  res.render("index.ejs", { url: cloudinaryRes.secure_url });

  // res.json({message:'file uploaded successfully',cloudinaryRes})
  //gives like::
//   {
//   "message": "file uploaded successfully",
//   "cloudinaryRes": {
//     "public_id": "NodeJS_Mastery_Course/file-17283920123",
//     "secure_url": "https://res.cloudinary.com/.....",
//     "format": "jpg",
//     "width": 500,
//     "height": 500
//   }
// }

  // Schema defines the structure of documents
// that will be stored in MongoDB
const imageSchema = new mongoose.Schema({
  filename: String,
  public_id: String,
  imgUrl: String,
});
const File = mongoose.model("cloudinary", imageSchema);

 // save to database
  const db = await File.create({
    filename: req.file.originalname,
    public_id: cloudinaryRes.public_id,
    imgUrl: cloudinaryRes.secure_url,
  });
} catch (error) {
   console.error(error);
}





});

const port = 1000;
app.listen(port, () => console.log(`server is running on port ${port}`));







