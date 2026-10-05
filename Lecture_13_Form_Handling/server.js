// Import Express.js
import express from "express";


// Create an Express application
const app = express();


// Middleware to read form data sent from the client.
//
// express.urlencoded() parses data submitted through an HTML form.
// extended: true allows Express to handle complex/nested form data.
//provide Privacy in url
// Example:
// name=Dhiraj&email=abc@gmail.com
//
// After parsing, the data becomes available in:
// req.body
app.use(express.urlencoded({ extended: true }));


// GET request for the home page
app.get("/", (req, res) => {

    // Render the index.ejs file
    res.render("index.ejs");
});


// POST request to handle form submission
app.post("/form-submit", (req, res) => {

    // req.body contains the data submitted by the HTML form
    console.log(req.body);


    // Send a JSON response back to the client
    res.json({
        message: "Your form has been submitted",
        success: true
    });
});


// Define the port number
const port = 1000;


// Start the Express server
// The server will run on http://localhost:1000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});