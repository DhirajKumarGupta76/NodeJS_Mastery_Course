
// Import Express framework
// Express is used to create the server and handle routes.



// Import Mongoose
// Mongoose is used to connect Node.js with MongoDB
// and work with MongoDB data using models.
import mongoose from "mongoose";

import dns from 'dns'
dns.setServers(["1.1.1.1","8.8.8.8"])

// Import the userRegister controller
// This function will handle the registration form submission.
import { userRegister } from "./controllers/user.js";


// --------------------------------------------------
// Create an Express application
// --------------------------------------------------

const app = express();
app.set("view engine", "ejs");

// --------------------------------------------------
// Middleware to read form data
// --------------------------------------------------

// express.urlencoded() allows Express to read data
// submitted through an HTML form.
//
// Example form:
// <form method="POST">
//     <input name="name">
// </form>
//
// The submitted data will be available in:
// req.body
//
// extended: true allows Express to handle
// complex/nested form data.
app.use(express.urlencoded({ extended: true }));


// --------------------------------------------------
// Connect Node.js application with MongoDB
// --------------------------------------------------
//mongodb+srv://dhirubhaig413_db_user:Qc0vy7B1YeNYUWso@cluster0.viotox6.mongodb.net/
// mongoose.connect() establishes a connection
// between our Node.js application and MongoDB.
//
// dbName specifies the database that we want to use.
mongoose
  .connect(
    "mongodb+srv://dhirubhaig413_db_user:Qc0vy7B1YeNYUWso@cluster0.viotox6.mongodb.net/",
    {
      dbName: "Node.js Mastry Course",
    }
  )

  // This runs when the MongoDB connection is successful.
  .then(() => console.log("MongoDb Connected..!"))

  // This runs when there is an error while connecting
  // to MongoDB.
  .catch((err) => console.log(err));


// --------------------------------------------------
// GET Route
// --------------------------------------------------

// When the user visits:
//
// http://localhost:1000/
//
// Express executes this function.
//
// res.render() renders the EJS template named "index.ejs".
app.get("/", (req, res) => {
  res.render("index.ejs");
});


// --------------------------------------------------
// POST Route
// --------------------------------------------------

// When the form is submitted to:
//
// POST /form-submit
//
// Express calls the userRegister controller.
//
// req.body contains the form data because
// express.urlencoded() middleware is being used.
app.post("/form-submit", userRegister);


// --------------------------------------------------
// Start the server
// --------------------------------------------------

// Port on which our Node.js server will run.
const port = 5000;


// app.listen() starts the Express server.
//
// Once the server starts successfully,
// the callback function is executed.
app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);

