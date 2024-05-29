const mongoose = require('mongoose');

// Define a schema for messages
const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  // Additional fields as needed
});

// Define a schema for channels
const channelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  // Additional fields as needed
});

// Define a schema for servers
const serverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // Additional fields as needed
});

// Define a schema for users
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Additional fields as needed
});


const Message = mongoose.model('Message', messageSchema);
const Channel = mongoose.model('Channel', channelSchema);
const Server = mongoose.model('Server', serverSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Message, Channel, Server, User };