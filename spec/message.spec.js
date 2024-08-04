const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function () {
  it("throws error if name is NOT passed into constructor as the first parameter", function () {
    expect(function () {
      new Message();
    }).toThrow(new Error("name required."));
  });

  it("constructor sets name", function () {
    let testCommands1 = [
      new Command("TEST_MODE_CHANGE", "LOW_POWER"),
      new Command("TEST_STATUS_CHECK"),
    ];
    const test2 = new Message(
      "We are testing the name constructor",
      testCommands1
    );
    expect(test2.name).toEqual("We are testing the name constructor");
  });

  it("contains a commands array passed into the constructor as the 2nd argument", function () {
    let testCommands2 = [
      new Command("TEST_MODE_CHANGE2", "HIGH_POWER"),
      new Command("TEST_STATUS_CHECK2"),
    ];

    const test2 = new Message(
      "We are testing the name constructor",
      testCommands2
    );
    expect(Array.isArray(test2.commands)).toBeTruthy();
  });
});
