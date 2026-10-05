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
// Cloudinary is a cloud service used to store and manage
// images, videos and other media files
// Instead of storing large image files on our own server,
// we upload them to Cloudinary.

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary using credentials

// IMPORTANT: In a real project, keep these values inside .env
cloudinary.config({
  cloud_name: "dfxc3sati",
  api_key: "787799863893888",
  api_secret: "d7nIXfqJJu_Gml_EMgIhY5lRE98",
});

// Connect Node.js application to MongoDB Atlas

mongoose
  .connect(
    "mongodb+srv://dhirubhaig413_db_user:Qc0vy7B1YeNYUWso@cluster0.viotox6.mongodb.net/",
    {
      dbName: "NodeJs_Mastery_Course",
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

// diskStorage() tells Multer to temporarily store
// the uploaded file on the server's disk.

const storage = multer.diskStorage({
//   destination: "./public/uploads",
// File name configuration
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    // Example:
    // file-17283920123.jpg
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
// Create the Multer upload middleware
const upload = multer({ storage: storage });

// Schema defines the structure of documents
// that will be stored in MongoDB
const imageSchema = new mongoose.Schema({
  filename: String,
  public_id: String,
  imgUrl: String,
});

const File = mongoose.model("cloudinary", imageSchema);

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file.path;

  const cloudinaryRes = await cloudinary.uploader.upload(file, {
    folder: "NodeJS_Mastery_Course",
  });

  // save to database
  const db = await File.create({
    filename: file.originalname,
    public_id: cloudinaryRes.public_id,
    imgUrl: cloudinaryRes.secure_url,
  });

  res.render("index.ejs", { url: cloudinaryRes.secure_url });

  // res.json({message:'file uploaded successfully',cloudinaryRes})
});

const port = 1000;
app.listen(port, () => console.log(`server is running on port ${port}`));
