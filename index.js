const express = require("express");

//To create an express app
const app = express();


// Middleware
app.use((req,res,next) => {
    console.log(`${req.method} - ${req.path}`);
    next(); // pass control to the next middleware
})

//Example validation for API key
const checkAPIKey = (req,res, next) => {
    const apiKey = req.query.apiKey;
    if(apiKey !== "12345"){
        return res.status(403).json({error: "Forbidden: Invalid API Key."});
    }
    next();
}

app.get("/secure-data", checkAPIKey, (req,res) => {
    res.json({secret: "This is protected data. 🔒"});
})

// Accessed through http://localhost:3000/secure-data?apiKey=12345
// Without the apiKey param, it would return teh 403 message


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

app.use((err, req,res,next) => {
    console.error(err.stack);
    res.status(500).json({error:"⛓️‍💥Something Broke!⛓️‍💥"});
})