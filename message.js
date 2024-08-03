const Command = require("../command.js");

class Message {
  constructor(name, commands) {
    this.name = name;
    if (!name) {
      throw Error("name required.");
    }
    this.commands = commands;
  }
}

let commands = [
  new Command("MODE_CHANGE", "LOW_POWER"),
  new Command("STATUS_CHECK"),
];
let message = new Message(commands);

console.log(message);
console.log(Array.isArray(commands));
module.exports = Message;
