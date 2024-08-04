const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
  // 7 tests here!
  //Test 7
  it("constructor sets position and default values for mode and generatorWatts", function () {
    const testRover = new Rover(1234);
    expect(testRover.position).toEqual(1234);
    expect(testRover.mode).toEqual("NORMAL");
    expect(testRover.generatorWatts).toEqual(110);
  });

  //Test 8
  it("response returned by receiveMessage contains the name of the message", function () {
    let commandsNameTest = [new Command("STATUS_CHECK")];
    let messageNameTest = new Message(
      "Test message with string for name",
      commandsNameTest
    );
    const testRover2 = new Rover(1234);
    let responseNameTest = testRover2.receiveMessage(messageNameTest);
    expect(responseNameTest.message).toEqual(messageNameTest.name);
  });

  //Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commandsInstanceTest = [
      new Command("MOVE", 1234),
      new Command("STATUS_CHECK"),
    ];
    let messageNameTest = new Message(
      "Test message with string for name",
      commandsInstanceTest
    );
    const testRover3 = new Rover(1234);
    let responseInstanceTest = testRover3.receiveMessage(messageNameTest);
    expect(commandsInstanceTest.length).toEqual(
      responseInstanceTest.results.length
    );
  });

  //Test 10
  it("responds correctly to the status check command", function () {
    let roverStatusTest = {};
    let commandsStatusTest = [new Command("STATUS_CHECK")];
    let messageStatusTest = new Message("Test Status", commandsStatusTest);
    const testRover4 = new Rover(1234);
    let responseStatusTest = testRover4.receiveMessage(messageStatusTest);

    for (let i in responseStatusTest.results) {
      roverStatusTest = responseStatusTest.results[i].roverStatus;
    }

    expect(
      JSON.stringify(responseStatusTest.results).includes("roverStatus")
    ).toEqual(true);

    expect({ position: 1234, mode: "NORMAL", generatorWatts: 110 }).toEqual(
      roverStatusTest
    );
  });

  //Test 11
  it("responds correctly to the mode change command", function () {
    let roverStatusModeTest = {};
    let commandsModeTest = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let messageModeTest = new Message("Testing Mode Change", commandsModeTest);
    const testRover5 = new Rover(1234);
    let responseModeTest = testRover5.receiveMessage(messageModeTest);

    for (let i in responseModeTest.results) {
      roverStatusModeTest = responseModeTest.results[i].completed;
    }

    expect(roverStatusModeTest).toEqual(true);
    expect(testRover5.mode).toEqual("LOW_POWER");
  });

  //Test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let roverStatusLowTest = {};
    let commandsLowTest = [new Command("Move", 2323)];
    let messageLowTest = new Message(
      "Testing Low Power Mode Change",
      commandsLowTest
    );
    const testRover6 = new Rover(1234);
    testRover6.mode = "LOW_POWER";
    let responseLowTest = testRover6.receiveMessage(messageLowTest);

    for (let i in responseLowTest.results) {
      roverStatusLowTest = responseLowTest.results[i].completed;
    }

    expect(roverStatusLowTest).toEqual(false);
    expect(testRover6.mode).toEqual("LOW_POWER");
  });

  //Test 13
  it("responds with the position for the move command", function () {
    let commandsMOVETest = [new Command("MOVE", 2323)];
    let messageMOVETest = new Message(
      "Testing MOVE Position Change",
      commandsMOVETest
    );
    const testRover7 = new Rover(1234);
    let responseMOVETest = testRover7.receiveMessage(messageMOVETest);

    expect(testRover7.position).toEqual(2323);
  });
});
