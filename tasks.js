
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
    task === '' ? noTaskToAddError() : add(task);
  } else if(text.trim().startsWith("remove")){
    let num = text.trim().split(" ").slice(1, 2).join("");
    remove(num);
  } else if(text.trim().startsWith("edit")) {
    let arr = text.trim().split(" ").slice(1);
    edit(arr);
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
 * Shows an Error in case there is no task to add
 * @returns {void}
 */
function noTaskToAddError() {
  console.log("Error: There is no task to add!")
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
  if(n < 0) {
    console.log("Your number must be bigger than 0!")
  }
  else if(n == '') {
    tasksList.pop();
  } else if (n <= tasksList.length) {
    tasksList.splice(n - 1, 1);
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
    tasksList[array[0] - 1] = array.slice(1).join(" ");
  } else if(array[0] > tasksList.length) {
    console.log("The number provided '" + array[0] + "' is bigger than the number of tasks (" + tasksList.length + ")");
  } else {
    tasksList[tasksList.length - 1] = array.join(" ");
  }
}

/**
 * List all the possible commands
 *
 * @returns {void}
 */
function help() {
  console.log("\nCommands:\n" + "\nhello (NAME)\n" + "list\n" + "add\n" + "remove\n" + "edit\n" + "quit\n" + "exit\n");
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
function quit(){
  console.log('Quitting now, see you soon!')
  process.exit();
}

// The following line starts the application
startApp("Rachwan")
