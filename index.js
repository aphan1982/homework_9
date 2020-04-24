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
      name: "badge",
      default: false
    },
    {
      type: "input",
      message: "What is the title of your project?",
      name: "projectName"
    },
    
  ]);

// This is a good resource for badge generation: https://shields.io/