const fs = require("fs");
const inquirer = require("inquirer");

inquirer
  .prompt([
    { 
      type: "input",
      message: "What is your GitHub user name?",
      name: "username"
    },
    // {
    //   type: "confirm",
    //   message: "Do you have a graphic you'd like to upload for your badge?",
    //   name: "customBadge",
    //   default: false
    //   // use WHEN (research documentation) to set up a conditional to determine if a custom or stock badge should be used for README
    // },
    {
      type: "input",
      message: "What is the title of your project?",
      name: "projectName"
    },
    {
      type: "input",
      message: "Please give a brief description of your project.",
      name: "description"
    },
    {
      type: "input",
      message: "Please provide a table of contents.",
      name: "tableOfContents"
    },
    {
      type: "input",
      message: "Please describe the installation method.",
      name: "installation"
    },
    {
      type: "input",
      message: "Please provide usage details.",
      name: "usage"
    },
    {
      type: "input",
      message: "What licenses are associated with your project?",
      name: "licenses"
    },
    {
      type: "input",
      message: "Please list all contributors to your project.",
      name: "contributors"
    },
    {
      type: "input",
      message: "What tests are associated with this project?",
      name: "tests"
    },
    {
      type: "input",
      message: "Please list any answers to frequently asked questions.",
      name: "freqAskedQuestions"
    },
    {
      type: "confirm",
      message: "Would you like to include your GitHub profile picture?",
      name: "profilePic",
      default: false
    },
    {
      type: "confirm",
      message: "Would you like to include your GitHub e-mail address?",
      name: "email",
      default: false
    }
  ]);

// This is a good resource for badge generation: https://shields.io/