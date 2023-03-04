const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const Employee = require("./lib/Employee");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];
const ids = [];


const managerQuestions = [
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your staff ID?" 
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "How many members in your team?"
        },
        {
            type: "list",
            name: "addMember",
            message: "Do you want to add member(s) to your team?",
            choices: ["Yes", "No"]
        }]

const addMemberQuestions = [
    {
        type: "list",
        name: "role",
        message: "What is new member's role?",
        choices: ["Engineer", "Intern"]
    }
]

const engineerQuestions =[
    {
        type: "input",
        name: "name",
        message: "What is Engineer's name?"    
    },
    {
        type: "input",
        name: "id",
        message: "What is Engineer's staff ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is Engineer's email?"
    },
    {
        type: "input",
        name: "github",
        message: "What is Engineer's Github ID?"
    },
    {
        type: "list",
        name: "addMember",
        message: "Do you want to add member(s) to your team?",
        choices: ["Yes", "No"]
    }]

const internQuestions =[
    {
        type: "input",
        name: "name",
        message: "What is Intern's name?"

    },
    {
        type: "input",
        name: "id",
        message: "What is Intern's staff ID?"
    },
    {
        type: "input",
        name: "email",
        message: "What is Intern's email?"
    },
    {
        type: "input",
        name: "school",
        message: "What is Intern's school?"
    },    
    {
        type: "list",
        name: "addMember",
        message: "Do you want to add member(s) to your team?",
        choices: ["Yes", "No"]
    }]


// function to initialize program
function managerPrompt() {
    inquirer.prompt(managerQuestions).then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        teamMembers.push(manager);
        ids.push(answers.id)
console.log(answers)
        if (answers.addMember === "Yes"){
            addMember();
        } else {
            createTeamPage();
        }
    })
}

function addMember() {
    inquirer.prompt(addMemberQuestions).then(memberRole => {   
        if (memberRole.role === "Engineer"){
            addEngineer();
        } else {
            addIntern();
        }
    });
}

function addIntern() {
inquirer.prompt(internQuestions).then(answers => {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    teamMembers.push(intern);
    ids.push(answers.id);
    if (answers.addMember === "Yes"){
        addMember();
    }else {
        createTeamPage();
    }
})
}

function addEngineer() {
inquirer.prompt(engineerQuestions).then(answers => {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(engineer);
    ids.push(answers.id);
    if (answers.addMember === "Yes"){
        addMember();
    }else {
        createTeamPage();
    }
})
}
        

// function call to initialize program

function start(){
    managerPrompt();
}

start();

function createTeamPage (){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }
    console.log(`Creating a Team Profile webpage...`)
    fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
    console.log(`Team Profile webpage is created!`)
}
