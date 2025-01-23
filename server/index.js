// distributed_task_system/backend/app.js

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const amqp = require("amqplib");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/taskRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// RabbitMQ Setup
let channel, connection;
(async () => {
  try {
    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertExchange("tasks", "fanout", { durable: false });
    await channel.assertExchange("chats", "fanout", { durable: false });
  } catch (error) {
    console.error("RabbitMQ Connection Error:", error);
  }
})();

app.set("channel", channel);

// Routes
app.use("/tasks", taskRoutes);
app.use("/chats", chatRoutes);

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("message", (message) => {
    console.log("Received:", message);
  });

  const taskQueue = "task_updates";
  const chatQueue = "chat_updates";

  // Subscribe to RabbitMQ task messages
  (async () => {
    const channel = await connection.createChannel();
    await channel.assertQueue(taskQueue, { exclusive: true });
    channel.bindQueue(taskQueue, "tasks", "");

    channel.consume(taskQueue, (msg) => {
      if (msg.content) {
        ws.send(msg.content.toString());
      }
    });
  })();

  // Subscribe to RabbitMQ chat messages
  (async () => {
    const channel = await connection.createChannel();
    await channel.assertQueue(chatQueue, { exclusive: true });
    channel.bindQueue(chatQueue, "chats", "");

    channel.consume(chatQueue, (msg) => {
      if (msg.content) {
        ws.send(msg.content.toString());
      }
    });
  })();
});

// Start Server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
