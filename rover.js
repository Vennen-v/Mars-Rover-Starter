const Message = require("./message.js");
const Command = require("./command.js");

class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    let result = [];
    let finalResponse = { message: message.name, results: result };

    for (let command of message.commands) {
      if (command.commandType == "MOVE" && this.mode == "NORMAL") {
        this.position = command.value;
        result.push({ completed: true });
      } else if (command.commandType == "STATUS_CHECK") {
        result.push({
          completed: true,
          roverStatus: {
            position: this.position,
            mode: this.mode,
            generatorWatts: this.generatorWatts,
          },
        });
      } else if (command.commandType == "MODE_CHANGE") {
        this.mode = command.value;
        result.push({ completed: true });
      } else if (this.mode == "LOW_POWER") {
        result.push({ completed: false });
      }
    }

    return finalResponse;
  }
}

let commands = [new Command("MOVE", 1234)];

let message1 = new Message("Mode change", commands);
let rover = new Rover(98382); // Passes 98382 as the rover's position.

let response = rover.receiveMessage(message1);
console.log(rover);

// for (let i in response.results) {
//   gram = response.results[i].roverStatus;
// }
// console.log(Object.values(Object.values(response)));

console.log(response);

module.exports = Rover;
