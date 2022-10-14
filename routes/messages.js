// Import dependencies
const express = require("express");
// Import middlewares
const auth = require("../middleware/auth");
const { admin, editor, viewer } = require("../middleware/roles");

// Dummy data
let messages = [
  {
    id: 1,
    name: "Lorem ipsum dolor",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pretium nec ipsum nec elementum.",
  },
];

// Setup the router for express
const router = express.Router();

// Set up the route handlers

// Get messages
router.get("/", [auth, viewer], (req, res) => {
  res.send({
    success: true,
    result: messages,
  });
});

// Get message
router.get("/:id", [auth, viewer], (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find((m) => m.id === messageId);

  if (!message) {
    res.send({
      success: false,
      result: "Message not found",
    });
  } else {
    res.send({
      success: true,
      result: message,
    });
  }
});

// Create a message
router.post("/", [auth, editor], async (req, res) => {
  messages.push({
    id: messages.length + 1,
    name: req.body.name,
    content: req.body.content,
  });

  res.status(201).send({
    success: true,
    result: messages,
  });
});

router.put("/:id", [auth, editor], async (req, res) => {
  const messageId = parseInt(req.params.id);
  const messageIndex = messages.findIndex((m) => m.id === messageId);

  if (messageIndex < 0) {
    return res.status(404).send({
      success: false,
      error: "Message not found",
    });
  }

  messages[messageIndex] = { ...req.body };

  res.status(200).send({
    success: true,
    result: messages[messageIndex],
  });
});

// Delete the message
router.delete("/:id", [auth, admin], async (req, res) => {
  const messageId = parseInt(req.params.id);
  messages = messages.filter((m) => {
    m.id !== messageId;
  });

  // Send response
  res.status(200).send({
    success: true,
    result: messages,
  });
});

// Export the router
module.exports = router;
