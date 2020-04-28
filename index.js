const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    // returns USERNAME:
    { 
      type: "input",
      name: "username",
      message: "What is your GitHub user name?"
    },
    // PROJECT NAME:
    {
      type: "input",
      name: "projectName",
      message: "What is the title of your project?",
      default: "My Project"
    },
    // PROJECT DESCRIPTION:
    {
      type: "input",
      name: "description",
      message: "Please give a brief description of your project."
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
    // TABLE OF CONTENTS:
    {
      type: "confirm",
      name: "tableOfContentsConfirm",
      message: "Would you like to include a table of contents?",
      default: false
    },
    // if(tableOfContentsConfirm):
      {
        type: "input",
        name: "customTOCUL",
        message: "Great! All the fields you select will be displayed as <links>. If you wish to append any custom fields, enter them now, separating each with a slash (/).",
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
      message: "Please list any answers to frequently asked questions.",
      default: "None"
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
  // VARIABLES:
  let description, contributors, customTOCUL, freqAskedQuestions, installation, licenses, tableOfContents, tests, usage;
  let filteredAnswers = {};

  // filters what results the user would like displayed in readme:
  const filter = () => {
    Object.keys(answers).forEach((value) => {
      if (answers[value]) { filteredAnswers[value] = answers[value]; }
    });
    return filteredAnswers;
  };
  filter();
  console.log(filteredAnswers);
  
  // TABLE OF CONTENTS:
  if (!filteredAnswers.tableOfContentsConfirm) {
    tableOfContents = "";
  } else {
    // exctracts all the selected standard README fields and formats them as linked list items:
    if (!filteredAnswers.installation) {
      installation = "";
    } else {
      installation = `- [Installation](#installation)\n`;
    }
    if (!filteredAnswers.usage) {
      usage = "";
    } else {
      usage = `- [Usage](#usage)\n`;
    }
    if (!filteredAnswers.licenses) {
      licenses = "";
    } else {
      licenses = `- [Licenses](#licenses)\n`;
    }
    if (!filteredAnswers.contributors) {
      contributors = "";
    } else {
      contributors = `- [Contributors](#contributors)\n`;
    }
    if (!filteredAnswers.tests) {
      tests = "";
    } else {
      tests = `- [Tests](#tests)\n`;
    }
    if (filteredAnswers.freqAskedQuestions === "None" || false) {
      freqAskedQuestions = "";
    } else {
      freqAskedQuestions = `- [Frequently asked questions](#freqAskedQuestions)\n`;
    }
    if (!filteredAnswers.customTOCUL) {
      customTOCUL = "";
    } else {
      // formats the custom user table of content entries into unordered list items:
      customTOCUL = filteredAnswers.customTOCUL.split("/").map(function(entry) {
        // Puts those into Markdown-friendly format:
        let customTOCULLink = entry.trim().toLowerCase().replace(/[.,?'"!@#$%^&*(){};:]/g, "").replace(/\s/g, "-");
        return `- [${entry.trim()}](#${customTOCULLink})\n`;
      });
      customTOCUL = customTOCUL.join("");
    }
    // renders the unordered list below a section heading:
    tableOfContents = `## Table of Contents:\n${installation}${usage}${licenses}${contributors}${tests}${freqAskedQuestions}${customTOCUL}`;
  }

  // SECTIONS:
  // description:
  if (!filteredAnswers.description) {
    description = "";
  } else {
    description = `## Description:\n>${filteredAnswers.description}\n`;
  }
  // installation:
  if (!filteredAnswers.installation) {
    installation = "";
  } else {
    installation = `## Installation:\n${filteredAnswers.installation}`;
  }
  
  return `# ${filteredAnswers.projectName}\n\n${description}\n\n${tableOfContents}`;
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