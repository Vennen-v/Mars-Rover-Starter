class Command {
  constructor(commandType, value) {
    this.commandType = commandType;
    if (!commandType) {
      throw Error("Command type required.");
    }

    this.value = value;
  }
}

const hello = new Command("MOVE", "GUN");

module.exports = Command;
