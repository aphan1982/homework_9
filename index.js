const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
// I will need to read up on the documentation of Util.js: https://nodejs.org/api/util.html.

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    { 
      type: "input",
      name: "username",
      message: "What is your GitHub user name?"
    },
    {
      type: "confirm",
      name: "badgeConfirm",
      message: "Do you have a custom graphic you'd like to upload for your badge?",
      default: false
    },
    // if(badgeConfirm):
      {
        type: "input",
        name: "customBadgeURL",
        message: "Excellent! Please provide the URL to your custom badge image.",
        when: answers => {
          return answers.badgeConfirm;
        },
      },
      // else:
      {
        type: "input",
        name: "standardBadgeURL",
        message: "Then please provide a link to a standard badge you'd like to use.",
        when: answers => {
          return !answers.badgeConfirm;
        }
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
      type: "confirm",
      name: "tableOfContentsConfirm",
      message: "Does your project require a table of contents?",
      default: false
    },
    // if(tableOfContentsConfirm):
      {
        type: "input",
        name: "tableOfContents",
        message: "Please list what your table of contents should display.",
        when: answers => {
          return answers.tableOfContentsConfirm;
        }
      },
    {
      type: "input",
      name: "installation",
      message: "Please describe your project's installation method."
    },
    {
      type: "input",
      name: "usage",
      message: "Please provide your project's usage details."
    },
    {
      type: "confirm",
      name: "licenseConfirm",
      message: "Does your project have any licenses associated with it?",
      default: false
    },
    // if(licenseConfirm): 
      {
        type: "input",
        name: "licenses",
        message: "Please list all licenses for your project.",
        when: answers => {
          return answers.licenseConfirm;
        }
      },
    {
      type: "input",
      name: "contributors",
      message: "Please list all contributors to your project."
    },
    {
    type: "confirm",
    name: "testsConfirm",
    message: "Does your project have any tests associated with it?",
    default: false
    },
    // if(testsConfirm):
      {
        type: "input",
        name: "tests",
        message: "Please list all your project tests.",
        when: answers => {
          return answers.testsConfirm;
        }
      },
    {
      type: "input",
      name: "freqAskedQuestions",
      message: "Please list any answers to frequently asked questions."
    },
    {
      type: "confirm",
      name: "profilePicConfirm",
      message: "Would you like to include your GitHub profile picture?",
      default: false
    },
    {
      type: "confirm",
      name: "emailConfirm",
      message: "Would you like to include your GitHub e-mail address?",
      default: false
    }
  ]);
}

const writeMD = (answers) => {
  return `# ${answers.projectName}
  `
}

promptUser()
  .then(answers => {
      const markdown = writeMD(answers);
  
      return writeFileAsync("README_result.md", markdown);
    });
// This is a good resource for badge generation: https://shields.io/