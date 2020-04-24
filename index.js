const inquirer = require("inquirer");

inquirer
  .prompt([
    { 
      type: "input",
      message: "What is your GitHub user name?",
      name: "username"
    },
    {
      type: "confirm",
      message: "Do you have a graphic you'd like to upload for your badge?",
      name: "customBadge",
      default: false
      // use WHEN (research documentation) to set up a conditional to determine if a custom or stock badge should be used for README
    },
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
      message: "If applicable, please provide a table of contents.",
      name: "tableOfContents"
    },
    {
      type: "input",

    }
  ]);

// This is a good resource for badge generation: https://shields.io/