const express = require("express");

//To create an express app
const app = express();

// Defining a simple route
app.get("/", (req,res) => {
    res.json({message: "Hello Express!"});
})

app.get("/about",(req,res) => {
    res.json({message: "This is a beginner Express API"});
})

// Start the server
const PORT = 3000;
app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`)
})

// Dynamic routing
app.get("/hello/:name",(req,res) => {
    const {name } = req.params;
    res.json({message: `Hello ${name}!`});
})