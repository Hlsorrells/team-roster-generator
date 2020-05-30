const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

function appMenu() {
    // Write code to use inquirer to gather information about the development team members,
    inquirer.prompt([
        {
            type: "list",
            message: "What is your employment position?",
            name: "role",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }
    ])
        // and to create objects for each team member (using the correct classes as blueprints!)
        .then(function (answers) {

            if (answers.role === "Manager") {

                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your name?",
                        name: "name"
                    },
                    {
                        type: "input",
                        message: "What is your employee ID number?",
                        name: "id"
                    },
                    {
                        type: "input",
                        message: "What is your email address?",
                        name: "email"
                    },
                    {
                        type: "input",
                        message: "What is your office number?",
                        name: "officeNumber"
                    }
                ])
                    .then(function (answers) {
                        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                        team.push(manager);
                        addMember();
                    })
            }

            if (answers.role === "Engineer") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your name?",
                        name: "name"
                    },
                    {
                        type: "input",
                        message: "What is your employee ID number?",
                        name: "id"
                    },
                    {
                        type: "input",
                        message: "What is your email address?",
                        name: "email"
                    },
                    {
                        type: "input",
                        message: "What is your GitHub username?",
                        name: "github"
                    }
                ])
                    .then(function (answers) {
                        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                        team.push(engineer);
                        addMember();
                    })
            }

            if (answers.role === "Intern") {
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your name?",
                        name: "name"
                    },
                    {
                        type: "input",
                        message: "What is your employee ID number?",
                        name: "id"
                    },
                    {
                        type: "input",
                        message: "What is your email address?",
                        name: "email"
                    },
                    {
                        type: "input",
                        message: "What is the name of the college that you are attending?",
                        name: "school"
                    }
                ])
                    .then(function (answers) {
                        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                        team.push(intern);
                        addMember();
                    })
            }
        })
}

function addMember() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like additional team members?",
            name: "newMember",
            choices: [
                "Yes",
                "No"
            ]
        }
    ]).then(function (answers) {
        if (answers.newMember === "Yes") {
            appMenu();
        } else {
            buildTeam(team)
        }
    })
}

function buildTeam() {
    fs.writeFileSync(outputPath, render(team), "utf-8")
}

appMenu();