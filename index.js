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
      message: "Would you like to build a badge?",
      default: true
    },
    // if(badgeConfirm), for badge label:
      {
        type: "input",
        name: "customBadgeLabel",
        message: "Excellent! What label do you want to give it?",
        when: answers => {
          return answers.badgeConfirm;
        },
      },
      // for badge message:
      {
        type: "input",
        name: "customBadgeMsg",
        message: "Perfect. Now what will your badge message be?",
        when: answers => {
          return answers.customBadgeLabel;
        }
      },
      // for badge color:
      {
        type: "checkbox",
        name: "customBadgeColor",
        message: "Last step: what color would you like your badge?",
        // This function currently does not work: trying to get answers.customBadgeColor only results in an empty array, undefined. I cannot find any documentation to help figure this out right now.
        choices: ["bright green", "bright green", "green", "yellow green", "yellow", "orange", "red", "light grey", "blue"] 
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
  let customBadge, description, contributors, customTOCUL, customSection, freqAskedQuestions, installation, licenses, tableOfContents, tests, usage;
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
  console.log(answers.customBadgeColor.choices);

  // BADGE:
  // (This section is meant to create a URL using img.shields.io–still working on getting Inquirer.js to give useable data)
  // if (!answers.badgeConfirm) {
  //   customBadge = "";
  // } else {
  //   const badgeColors = ["brightgreen", "green", "yellowgreen", "yellow", "orange", "red", "lightgrey", "blue"]
  //   let customBadgeLabel = answers.customBadgeLabel.replace(/\s/g, "%20");
  //   let customBadgeMsg = answers.customBadgeMsg.replace(/\s/g, "%20");
    
  //   customBadge = `https://img.shields.io/${answers.customBadgeLabel} `
  // }
  // TABLE OF CONTENTS (in the order that they appear via Inquirer.js prompt):
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
    tableOfContents = `## Table of Contents:\n${installation}${usage}${licenses}${contributors}${tests}${freqAskedQuestions}${customTOCUL}\n`;
  }

  // SECTIONS (in the order that they appear via Inquirer.js prompt):
  // verifies that the user has opted to have this section displayed. If so, formats it:
  if (!filteredAnswers.description) {
    description = "";
  } else {
    description = `## Description:\n>${filteredAnswers.description}\n\n`;
  }
  if (!filteredAnswers.installation) {
    installation = "";
  } else {
    installation = `## Installation:\n${answers.installation}\n\n`;
  }
  if (!filteredAnswers.usage) {
    usage = "";
  } else {
    usage = `## Usage:\n${answers.usage}\n\n`;
  }
  if (!filteredAnswers.licenses) {
    licenses = "";
  } else {
    licenses = `## Licenses:\n${answers.licenses}\n\n`;
  }
  if (!filteredAnswers.contributors) {
    contributors = "";
  } else {
    contributors = `## Contributors:\n${answers.contributors}\n\n`;
  }
  if (!filteredAnswers.tests) {
    tests = "";
  } else {
    tests = `## Tests:\n${answers.tests}\n\n`;
  }
  if (!filteredAnswers.freqAskedQuestions === "None") {
    freqAskedQuestions = "";
  } else {
    freqAskedQuestions = `## Frequently Asked Questions:\n${answers.freqAskedQuestions}\n\n`;
  }
  if (!filteredAnswers.customTOCUL) {
    customSection = "";
  } else {
    customSection = answers.customTOCUL.split("/").map(function(entry) {
      return `## ${entry.trim()}\n*Your text here*\n\n`;
    });
    customSection = customSection.join("");
  }
  
  // puts every selected item in list order to become Markdown document:
  return `# ${filteredAnswers.projectName}\n\n${description}${tableOfContents}${installation}${usage}${licenses}${contributors}${tests}${freqAskedQuestions}${customSection}`;
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