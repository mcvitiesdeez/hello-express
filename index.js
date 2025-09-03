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

// Query parameters are acessed via req.query
app.get("/search", (req,res) => {
    const {term, limit} = req.query;

    if(!term){
        return res.status(400).json({errpr: "Search term is required"});
    }

    res.json({
        search:term,
        limit: limit || "Not specified",
        results: [`Result 1 for ${term}`, `Result 2 for ${term}`]
    })
})