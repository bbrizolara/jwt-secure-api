// Import dependencie
const express = require("express");
// Import routes
const authRouter = require("./routes/auth");
const messagesRouter = require("./routes/messages");

// Setup the express server
const app = express();
const port = 3000;

// Import middlewares into express
app.use(express.json({ limit: "100mb" }));

// Setup all the routes
app.use("/api/v1/messages", messagesRouter);
app.use("/api/v1/auth", authRouter);

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
