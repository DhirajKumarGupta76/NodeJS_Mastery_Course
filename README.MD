## What is Node.js
 Node.js is a JavaScript runtime that allows you to run JavaScript outside the browser.

 Build on Chome's V8 engine 
 Expree.js is frame work of node.js

v8 (Crome engine) + c++ =Node.js

Browser
   ↓
JavaScript
   ↓
React / DOM / UI


## Why do we need Node.js?

Imagine your React frontend has a login form:

Email: dhiraj@gmail.com
Password: 123
        ↓
     Login

React can collect this information, but you should not put your database logic, passwords, secret keys, Stripe secret key, etc. directly in React.

Instead:

React Frontend
      ↓
   HTTP Request
      ↓
Node.js Backend
      ↓
Express.js
      ↓
MongoDB
      ↓
Response
      ↓
React

Node.js gives you the environment to build that backend.

## What can Node.js do?

Node.js can help you build:

APIs
GET    /api/products
POST   /api/login
POST   /api/orders
PUT    /api/user
DELETE /api/product
Authentication
Login
Register
JWT
Cookies
Password hashing
OTP
Database communication
Node.js
   ↓
MongoDB
File handling

Upload:

Profile picture
Product image
PDF
Documents
Real-time applications

For example:

Chat application
      ↓
Node.js
      ↓
WebSocket / Socket.io
      ↓
Instant messages
Payments

For example:

React
  ↓
Node.js
  ↓
Stripe
  ↓
Payment

## What is EJS?

EJS = Embedded JavaScript Templates.

EJS is a template engine for Node.js/Express that lets you generate HTML dynamically using JavaScript.

Think of it like:

Node.js + Express
       ↓
      EJS
       ↓
Dynamic HTML
       ↓
    Browser
Simple example

Suppose your Node.js server has:

app.get("/", (req, res) => {
    res.render("home", {
        name: "Dhiraj"
    });
});

Your home.ejs:

<h1>Hello <%= name %></h1>

Browser receives:

<h1>Hello Dhiraj</h1>

So:

<%= name %>
     ↓
JavaScript value
     ↓
Inserted into HTML

## MongoDb username and Password

dhirubhaig413_db_user
Qc0vy7B1YeNYUWso

## Server.js
// The entire application is controlled and managed through server.js.
//
// server.js acts as the main entry point of the application.
// It is responsible for:
// 1. Creating the Express server.
// 2. Configuring middleware.
// 3. Serving static files such as CSS, JavaScript, and images.
// 4. Defining routes and handling client requests.
// 5. Rendering EJS pages.
// 6. Connecting the application with databases or other services.
// 7. Starting the server and listening for client requests.
Simple understanding

Think of server.js as the main controller of your Node.js application:

                 server.js
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
    Middleware     Routes       Server
        │            │            │
        ↓            ↓            ↓
 Static Files    Requests      Port 1000
        │            │
        ↓            ↓
     public/       EJS
                  view

## To fix MongoDb Coneection;

import dns from 'dns'
dns.setServers(["1.1.1.1","8.8.8.8"])


## for Set any project install all dependancy in terminal 
like ..
| Priority | Command                  | Purpose                     |
| -------: | ------------------------ | --------------------------- |
|      ⭐⭐⭐ | `node -v`                | Check Node version          |
|      ⭐⭐⭐ | `node server.js`         | Run Node application        |
|      ⭐⭐⭐ | `npm init -y`            | Create Node project         |
|      ⭐⭐⭐ | `npm install`            | Install dependencies        |
|      ⭐⭐⭐ | `npm install express`    | Install Express             |
|      ⭐⭐⭐ | `npm install mongoose`   | Install MongoDB ODM         |
|      ⭐⭐⭐ | `npm install dotenv`     | Environment variables       |
|      ⭐⭐⭐ | `npm install cors`       | CORS                        |
|      ⭐⭐⭐ | `npm install -D nodemon` | Auto restart                |
|      ⭐⭐⭐ | `nodemon server.js`      | Run development server      |
|      ⭐⭐⭐ | `npm run dev`            | Run dev script              |
|      ⭐⭐⭐ | `npm start`              | Run production/start script |
|       ⭐⭐ | `npm uninstall package`  | Remove package              |
|       ⭐⭐ | `npm update`             | Update dependencies         |
|       ⭐⭐ | `npm audit`              | Check vulnerabilities       |
|       ⭐⭐ | `npx ...`                | Execute package             |
|       ⭐⭐ | `npm list --depth=0`     | See installed packages      |
|       ⭐⭐ | `npm outdated`           | Find outdated packages      |


## Set required configuration parameters && Multer (Project 2)

User uploads an image → Multer receives it → Cloudinary stores the image → MongoDB stores image information → EJS displays the uploaded image.

You can set the required configuration parameters, cloud_name, api_key and api_secret either using the CLOUDINARY_URL environment variable, or using the config method in your code.

To define the CLOUDINARY_URL environment variable:

Copy the API environment variable format from the API Keys page of the Cloudinary Console Settings.
Replace <your_api_key> and <your_api_secret> with your actual values. Your cloud name is already correctly included in the format.

User selects image
       ↓
     React
       ↓
    Multer
       ↓
  Node.js/Express
       ↓
   Cloudinary
       ↓
 Image stored online
       ↓
 Cloudinary URL saved in MongoDB


 | Tool           | Job                                         |
| -------------- | ------------------------------------------- |
| **Multer**     | Receives the uploaded file                  |
| **Cloudinary** | Stores/manages the file online              |
| **MongoDB**    | Stores the file's URL and other information |


1. Complete project flow
                  USER
                   │
                   │ Select image
                   ▼
             ┌─────────────┐
             │   EJS Page  │
             │  index.ejs  │
             └──────┬──────┘
                    │
                    │ POST /upload
                    │ multipart/form-data
                    ▼
             ┌─────────────┐
             │  Express.js │
             │   Server    │
             └──────┬──────┘
                    │
                    ▼
             ┌─────────────┐
             │   Multer    │
             │             │
             │ Receives the│
             │    image    │
             └──────┬──────┘
                    │
                    │ Temporary file
                    ▼
             ┌─────────────┐
             │  Cloudinary │
             │             │
             │ Stores the  │
             │    image    │
             └──────┬──────┘
                    │
                    │ Returns
                    │ public_id
                    │ secure_url
                    ▼
             ┌─────────────┐
             │   MongoDB   │
             │             │
             │ Stores image│
             │ information │
             └──────┬──────┘
                    │
                    │ Image URL
                    ▼
             ┌─────────────┐
             │    EJS      │
             │  index.ejs  │
             └──────┬──────┘
                    │
                    ▼
              Display Image