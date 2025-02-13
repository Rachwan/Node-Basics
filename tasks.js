
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
async function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("---------------------------------")
  let fs = require('fs');
  try {
  await  fs.readFile('database.json', {encoding: 'utf-8'}, (err, loadstringjson)=>{
    tasksList = JSON.parse(loadstringjson)
  })
  } catch (err) {
    console.error(err)
  }
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
var tasksList = [];
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
    console.log(`Removed task ${n} successfully.`)
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
  console.log("\nCommands:\n" +
  "\nhello: you can use hello and anything with it\n" + 
  "list: list all the task.\n" + 
  "add: will add a new task.\n" + 
  "remove: will remove a certain task.\n" + 
  "edit: will edit a certain task.\n" + 
  "check: will check a certain task.\n" + 
  "uncheck: will uncheck a certain task.\n" + 
  "quit or exit: will exit the program.\n"
  );
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

async function quit(){
  let fs = require('fs').promises;
  let sendString = JSON.stringify(tasksList)
  try {
  await  fs.writeFile('database.json', sendString, {encoding: 'utf-8'})
  } catch (err) {
    console.error(err)
  }
  console.log('Quitting now, see you soon!');
  process.exit();
}

// The following line starts the application
startApp("Rachwan");
