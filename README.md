# Distributed Task and Chat System

This project is a distributed system application that supports both task management and chat functionality. It includes a backend using Node.js, MongoDB, and RabbitMQ, as well as frontend applications for web (React) and mobile (Flutter). Communication is supported via WebSocket for real-time updates.

## Features

- Task Management:
  - Add tasks
  - View all tasks
  - Update taks
  - delete task
- Chat System:
  - Send messages
  - View all messages
  - get message by id
  - update message
  - delete messsage
  
- Real-time updates using WebSocket.
- RabbitMQ message-oriented communication for task and chat notifications.

---

## Prerequisites

- Node.js (v14+)
- MongoDB (latest stable version)
- RabbitMQ (latest stable version)
- Flutter SDK (v3.0+)
- npm or yarn
- A modern web browser for the React application

---

## Backend Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd distributed_task_system/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB:

   ```bash
   mongod
   ```

4. Start RabbitMQ:

   ```bash
   rabbitmq-server
   ```

5. Start the backend server:

   ```bash
   node app.js
   ```

6. The backend will run on `http://localhost:5000`.

---

## Frontend Web (React) Setup

1. Navigate to the frontend directory:

   ```bash
   cd distributed_task_system/frontend/web
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## Mobile Application (Flutter) Setup

1. Navigate to the Flutter project directory:

   ```bash
   cd distributed_task_system/frontend/mobile
   ```

2. Ensure that the Flutter SDK is installed. Check by running:

   ```bash
   flutter --version
   ```

3. Get the dependencies:

   ```bash
   flutter pub get
   ```

4. Connect a physical device or start an emulator.

5. Run the application:

   ```bash
   flutter run
   ```

---

## APIs

### Task APIs

- **Create a Task**

  - Method: `POST`
  - Endpoint: `/tasks`
  - Body:
    ```json
    {
      "title": "Task Title",
      "description": "Task Description"
    }
    ```

- **Get All Tasks**

  - Method: `GET`
  - Endpoint: `/tasks`

### Chat APIs

- **Send a Message**

  - Method: `POST`
  - Endpoint: `/chats`
  - Body:
    ```json
    {
      "username": "User Name",
      "message": "Chat Message"
    }
    ```

- **Get All Messages**

  - Method: `GET`
  - Endpoint: `/chats`

---

## WebSocket Endpoints

- Task updates: `/tasks`
- Chat updates: `/chats`

---

## Folder Structure

```plaintext
.
|-- backend
|   |-- app.js
|   |-- controllers
|   |-- models
|   |-- routes
|
| 
|-- Desktop
|-- mobile
```

---

## Notes

- Ensure RabbitMQ and MongoDB are running before starting the backend.
- Update WebSocket URLs in the frontend code to match your server setup.
- For production, configure environment variables for MongoDB URI and RabbitMQ URL.

---

## License

This project is licensed under the MIT License.

