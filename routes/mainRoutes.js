const express = require("express");
const router = express.Router();

//Example validation for API key
const checkAPIKey = (req,res, next) => {
    const apiKey = req.query.apiKey;
    if(apiKey !== "12345"){
        return res.status(403).json({error: "Forbidden: Invalid API Key."});
    }
    next();
}

router.get("/secure-data", checkAPIKey, (req,res) => {
    res.json({secret: "This is protected data. 🔒"});
})

// Accessed through http://localhost:3000/secure-data?apiKey=12345
// Without the apiKey param, it would return teh 403 message


// Defining a simple route
router.get("/", (req,res) => {
    res.json({message: "Hello Express!"});
})

router.get("/about",(req,res) => {
    res.json({message: "This is a beginner Express API"});
})

// Dynamic routing
router.get("/hello/:name",(req,res) => {
    const {name } = req.params;
    res.json({message: `Hello ${name}!`});
})

// Query parameters are acessed via req.query
router.get("/search", (req,res) => {
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

module.exports = router;