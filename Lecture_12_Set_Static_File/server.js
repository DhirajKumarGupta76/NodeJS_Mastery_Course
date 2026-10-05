// Import Express.js
import express from "express";

// Import Node.js Path module
import path from "path";


// To install multiple packages/modules:
// npm install express ejs


// Create an Express application
const app = express();


// Middleware
// Serve static files (CSS, JavaScript, images, etc.)
// from the "public" folder.
//
// path.resolve() gives the current project directory.
// path.join() creates the complete path to the "public" folder.
//use static file from a public folder in any file .
app.use(express.static(path.join(path.resolve(), "public")));


// Home page route
app.get("/", (req, res) => {

    // Render the index.ejs file
    res.render("index.ejs");
});


// Define the port number
const port = 1000;


// Start the server
// The server will run on http://localhost:1000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});