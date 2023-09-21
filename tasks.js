
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("---------------------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text.trim().startsWith("hello")){
    let arr = text.trim().split(" ");
    let name = arr.slice(1).join(" ");
    hello(name);
  } else if(text === 'help\n') {
    help();
  } else if(text === 'list\n'){
    list();
  } else if(text.trim().startsWith("add")) {
    let task = text.trim().split(" ").slice(1).join(" ");
    task === '' ? console.log("Error: There is no task to add!") : add(task);
  } else if(text.trim().startsWith("remove")){
    let num = text.trim().split(" ").slice(1, 2).join("");
    remove(num);
  } else if(text.trim().startsWith("edit")) {
    let arr = text.trim().split(" ").slice(1);
    edit(arr);
  }  else if (text.trim().startsWith("check")) {
    let num = text.trim().split(" ").slice(1, 2).join("");
    check(num);
  } else if (text.trim().startsWith("uncheck")) {
    let num = text.trim().split(" ").slice(1, 2).join("");
    uncheck(num);
  } else {
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}

/**
 * Check on the task
 * 
 * @returns {void}
 */
function check(n) {
  if(n == '') {
    console.log("Error: You did not enter a number to check!");
  } else if(n <= 0) {
    console.log("Your number must be bigger than 0!");
  } else if (n <= tasksList.length) {
    tasksList[n - 1].done = true;
    console.log("Checked completed!");
  } else {
    tasksList.length == 1 ? console.log("There is 1 task only!") : console.log("There are only " + (tasksList.length) + " tasks!");
  }
}

/**
 * unCheck on the task
 * 
 * @returns {void}
 */
function uncheck(n) {
  if(n == '') {
    console.log("Error: You did not enter a number to uncheck!");
  } else if(n <= 0) {
    console.log("Your number must be bigger than 0!")
  } else if (n <= tasksList.length) {
    tasksList[n - 1].done = false;
    console.log("unChecked completed!");
  } else {
    tasksList.length == 1 ? console.log("There is 1 task only!") : console.log("There are only " + (tasksList.length) + " tasks!");
  }
}

/**
 * List all the tasks  
 * 
 * @returns {void}
 */
function list() {
  if(tasksList.length == 0) {
    console.log("There is no tasks!")
  } else {
    for(let i = 0; i < tasksList.length; i++) {
      let checkBox = tasksList[i].done ? "[✓]" : "[ ]";
      console.log(checkBox + " " + tasksList[i].task);
    }
  }
}

/**
 * Add a task to the tasks list
 * 
 * @returns {Array}
 */
var tasksList = [
  { task: "Get milk", done: false },
  { task: "Get wheat", done: true },
  { task: "Mix them", done: true },
  { task: "Eat", done: true },
  { task: "Book a taxi", done: true },
  { task: "Go to Codi", done: true },
];
function add(task, done = false) {
  tasksList.push({task, done});
}

/**
 * Remove a task funcion
 * 
 * @returns {void}
 */
function remove(n) {
  if(n == '') {
    tasksList.pop();
    console.log(`Removed the last task successfully!`)
  } else if(n <= 0) {
    console.log("Your number must be bigger than 0!")
  }
  else  if (n <= tasksList.length) {
    tasksList.splice(n - 1, 1);
    console.log(`Removed "${tasksList[n - 1].task}" task.`)
  } else {
    tasksList.length == 1 ? console.log("There is 1 task only!") : console.log("There are only " + (tasksList.length) + " tasks!");
  }
}

/**
 * Edit the list
 *
 * @return {void}
 */
function edit(array) {
  if(array.length == '0') {
    console.log("Error: there is no edits!");
  } else if (array[0] <= tasksList.length) {
    tasksList[array[0] - 1].task = array.slice(1).join(" ");
    console.log("Edit complete!")
  } else if(array[0] > tasksList.length) {
    console.log("The number provided '" + array[0] + "' is bigger than the number of tasks (" + tasksList.length + ")");
  } else {
    tasksList[tasksList.length - 1].task = array.join(" ");
    console.log("Edit completed!")
  }
}

/**
 * List all the possible commands
 *
 * @returns {void}
 */
function help() {
  console.log("\nCommands:\n" + "\nhello (NAME)\n" + "list\n" + "add\n" + "remove\n" + "edit\n" + "check\n" + "uncheck\n" + "quit\n" + "exit\n");
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(n){
  if(n === "") {
    console.log('Hello!');
  } else {
    console.log('Hello ' + n + '!');
  }
}


/**
 * Exits the application
 *
 * @returns {void}
 */

const fs = require('fs');

let tasksArray = [];

try {
  tasksArray = JSON.parse(fs.readFileSync("database.json"));
} catch (err) {
  console.error('Error:', err.message);
}

function quit(){
  console.log('Quitting now, see you soon!');

  fs.writeFileSync("database.json", JSON.stringify(tasksList));

  process.exit();
}

// The following line starts the application
startApp("Rachwan");
