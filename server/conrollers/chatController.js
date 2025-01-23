// distributed_task_system/backend/controllers/chatController.js

import Chat from "../models/chatModel.js";

export async function sendMessage(req, res) {
  const { username, message } = req.body;
  const chat = new Chat({ username, message });
  await chat.save();

  // Publish message to RabbitMQ
  const channel = req.app.get("channel");
  channel.publish("chats", "", Buffer.from(JSON.stringify(chat)));

  res.status(201).send(chat);
}

export async function getMessages(req, res) {
  const chats = await find().sort({ timestamp: -1 });
  res.send(chats);
}

export async function getMessage(req, res) {
  const chat = await findById(req.params.id);
  if (!chat)
    return res.status(404).send("The chat with the given ID was not found.");
  res.send(chat);
}

export async function updateMessage(req, res) {
  const chat = await findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!chat)
    return res.status(404).send("The chat with the given ID was not found.");
  res.send(chat);
}

export async function deleteMessage(req, res) {
  const chat = await findByIdAndRemove(req.params.id);
  if (!chat)
    return res.status(404).send("The chat with the given ID was not found.");
  res.send(chat);
}

