export async function createTask(req, res) {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();

  // Publish message to RabbitMQ
  const channel = req.app.get("channel");
  channel.publish("tasks", "", Buffer.from(JSON.stringify(task)));

  res.status(201).send(task);
}

export async function getTasks(req, res) {
  const tasks = await Task.find();
  res.send(tasks);
}

export async function getTask(req, res) {
  const task = await Task.findById(req.params.id);
  if (!task)
    return res.status(404).send("The task with the given ID was not found.");
  res.send(task);
}

export async function updateTask(req, res) {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task)
    return res.status(404).send("The task with the given ID was not found.");
  res.send(task);
}

export async function deleteTask(req, res) {
  const task = await Task.findByIdAndRemove(req.params.id);
  if (!task)
    return res.status(404).send("The task with the given ID was not found.");
  res.send(task);
}
