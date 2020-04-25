const fs = require("fs");
const inquirer = require("inquirer");

inquirer
  .prompt([
    { 
      type: "input",
      name: "username",
      message: "What is your GitHub user name?"
    },
    {
      type: "confirm",
      name: "customBadge",
      message: "Do you have a custom graphic you'd like to upload for your badge?",
      default: false
      // use WHEN (research documentation) to set up a conditional to determine if a custom or stock badge should be used for README
    },
    {
      type: "input",
      name: "customBadgeURL",
      message: "Excellent! Please provide the URL to your custom badge image.",
      when: (answers) => {
        return answers.customBadge;
      },
    },
    {
      type: "input",
      name: "badgeLink",
      message: "Then please provide a link to a standard badge you'd like to use.",
      when: (answers) => answers.customBadge === false
    },
    {
      type: "input",
      name: "projectName",
      message: "What is the title of your project?"
    },
    {
      type: "input",
      name: "description",
      message: "Please give a brief description of your project."
    },
    {
      type: "input",
      name: "tableOfContents",
      message: "Please provide a table of contents."
    },
    {
      type: "input",
      name: "installation",
      message: "Please describe the installation method."
    },
    {
      type: "input",
      name: "usage",
      message: "Please provide usage details."
    },
    {
      type: "input",
      name: "licenses",
      message: "What licenses are associated with your project?"
    },
    {
      type: "input",
      name: "contributors",
      message: "Please list all contributors to your project."
    },
    {
      type: "input",
      name: "tests",
      message: "What tests are associated with this project?"
    },
    {
      type: "input",
      name: "freqAskedQuestions",
      message: "Please list any answers to frequently asked questions."
    },
    {
      type: "confirm",
      name: "profilePic",
      message: "Would you like to include your GitHub profile picture?",
      default: false
    },
    {
      type: "confirm",
      name: "email",
      message: "Would you like to include your GitHub e-mail address?",
      default: false
    }
  ]).then(answers => {
    console.log(answers);
  });

// This is a good resource for badge generation: https://shields.io/