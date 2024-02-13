## JoeWhatChats

Welcome to the JoeWhatChats! This project aims to replicate the functionality of WhatsApp, allowing users to create rooms, send messages, and soon, make video calls using Node.js, Express, MongoDB, React, and Socket.IO.

## Features

<ul>
<li>
<b>Create Rooms:</b> Users can create chat rooms and invite others to join the conversation.
</li>
<li>
<b>Real-time Messaging:</b> Utilizing Socket.IO, messages are sent and received instantly, creating a seamless chatting experience.
</li>

<li>
<b>Secure Authentication:</b> Users can sign up securely with token authentication/authorization and log in to access the app's features.
</li>

<li>
<b>Video Call (Upcoming):</b> Soon, users will be able to initiate video calls within chat rooms for face-to-face communication.
</li>
<ul>

## Samples

### large screen version

<img src="./client/src/assets/chat_sample.png" alt="large screen sample" />

### small screen version

<img src="./client/src/assets/mobile_chat_sample.png" alt="large screen sample" />

## Technologies Used

<ul>
<li>
<b>Node.js:</b>  Backend server implementation using Express framework..
</li>
<li>
<b>MongoDB:</b>  Database management with Mongoose ODM for storing user information, room data, and messages.
</li>

<li>
<b>React:</b>  Frontend development for creating a user-friendly interface.
</li>

<li>
<b>Socket.IO:</b>  Real-time communication between clients and server for instant messaging.
</li>

<li>
<b>HTML & CSS: </b>   Designing and styling the application to resemble WhatsApp's familiar interface.
</li>
<ul>

## Installation

1. Clone the repository:
   `git clone https://github.com/yourusername/whatsapp-clone.git`

2. Install dependencies for the backend:
   `cd backend 
    npm install
`

3. Install dependencies for the frontend:
   `cd client
    npm install
`

4. Set up environment variables:

Create a .env file in the backend directory.
Add MongoDB connection URI, JWT secret, and other necessary variables.

5. Start the backend server:
   `cd backend
    npm start
`

6. Start the frontend development server:
   `cd frontend
    npm start
`

## Usage

<ol>
<li>Sign up or log in to your account.</li>
<li>Create a new room or join an existing one.</li>
<li>Start sending and receiving messages in real-time.</li>
<li>Stay tuned for the upcoming video call feature!</li>
</ol>

## Credits

This project was developed by Uzuegbu Joseph.
