const express = require("express");

//To create an express app
const app = express();

// Middleware
app.use((req,res,next) => {
    console.log(`${req.method} - ${req.path}`);
    next(); // pass control to the next middleware
})

const mainRoutes = require("./routes/mainRoutes");
app.use("/", mainRoutes);

app.use((err, req,res,next) => {
    console.error(err.stack);
    res.status(500).json({error:"⛓️‍💥Something Broke!⛓️‍💥"});
})

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
})
