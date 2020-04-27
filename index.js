const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
// I will need to read up on the documentation of Util.js: https://nodejs.org/api/util.html.

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    // returns USERNAME:
    { 
      type: "input",
      name: "username",
      message: "What is your GitHub user name?"
    },
    // USER BADGE:
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
    // PROJECT NAME:
    {
      type: "input",
      name: "projectName",
      message: "What is the title of your project?"
    },
    // PROJECT DESCRIPTION:
    {
      type: "input",
      name: "description",
      message: "Please give a brief description of your project."
    },
    // TABLE OF CONTENTS:
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
        message: "Please list what your table of contents should display, separating each entry with a slash (/).",
        when: answers => {
          return answers.tableOfContentsConfirm;
        }
      },
    // INSTALLATION:
    {
      type: "input",
      name: "installation",
      message: "Please describe your project's installation method."
    },
    // USAGE:
    {
      type: "input",
      name: "usage",
      message: "Please provide your project's usage details."
    },
    // LICENSES:
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
    // CONTRIBUTORS:
    {
      type: "input",
      name: "contributors",
      message: "Please list all contributors to your project."
    },
    // TESTS:
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
    // FREQUENTLY ASKED QUESTIONS:
    {
      type: "input",
      name: "freqAskedQuestions",
      message: "Please list any answers to frequently asked questions."
    },
    // GITHUB PROFILE PICTURE:
    {
      type: "confirm",
      name: "profilePicConfirm",
      message: "Would you like to include your GitHub profile picture?",
      default: false
    },
    // GITHUB E-MAIL ADDRESS:
    {
      type: "confirm",
      name: "emailConfirm",
      message: "Would you like to include your GitHub e-mail address?",
      default: false
    }
  ]);
}

const writeMD = (answers) => {
  let tableOfContents;
  let tableOfContentsUL;

  if (!answers.tableOfContentsConfirm) {
    tableOfContents = "";
  } else {
    // formats the answers from TOC prompt into bullet-point unordered list items:
    tableOfContentsUL = answers.tableOfContents.split("/").map(function(entry) {
      return `- ${entry.trim()}\n`;
    });
    tableOfContentsUL = tableOfContentsUL.join("");
    // renders unordered list with a section heading:
    tableOfContents = `## Table of Contents:\n${tableOfContentsUL}`;
  }

  return `# ${answers.projectName}
  
## Description:
${answers.description}
  
${tableOfContents}
  `
}

promptUser()
.then(answers => {
  const markdown = writeMD(answers);
  
  return writeFileAsync("README_result.md", markdown);
}).then(() => {
  console.log("You have successfully created your README!");
}).catch(err => {
  console.log(err);
});
// This is a good resource for badge generation: https://shields.io/
// This is a good resource for READMEs and GIFs: https://gist.github.com/fvcproductions/1bfc2d4aecb01a834b46