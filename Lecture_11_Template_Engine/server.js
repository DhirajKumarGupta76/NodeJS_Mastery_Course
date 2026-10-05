// Import Express.js
import express from "express";

// Install EJS (Embedded JavaScript Templates)
// Command: npm i ejs


// Create an Express application
const app = express();


// Create an array of products
// This data will be sent to the EJS file
let products = [
    { title: "iPhone 16", price: 75000 },
    { title: "Galaxy S24 Ultra", price: 95000 },
    { title: "Google Pixel", price: 65000 }
];


// Handle GET request for the home page "/"

app.get("/", (req, res) => {

    // Create a variable named "name"
    let name = "Ram";
    
    //render() is used to generate an HTML page using a template file and send that page to the browser.
    // Render the index.ejs file
    // Send "name" and "products" data to the EJS file
    //Express → sends name and products → to index.ejs
    res.render("index.ejs", { name, products });
});


// Define the port number
const port = 1000;


// The server will run on http://localhost:1000

// A single port can be used by only one server at a time.
// Do not try to start another server on the same port
// from another terminal.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});