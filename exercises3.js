/* 
1.
Write a function called runInOrder that accepts as arguments 
in this order 
  - an array of functions
  - an array of numbers representing times in milliseconds

runInOrder should execute the functions in order, with the corresponding numbers in milliseconds being the time to wait from the previous invocation. 

For example 
*/

function sayHi() {
  console.log('hi');
}
function sayBye() {
  console.log('bye');
}
function sayHowdy() {
  console.log('howdy');
}

const runInOrder = async (fnArray, timesArray) => {
  for (let i = 0; i < timesArray.length; i++) {
    await new Promise((resolve) =>
      setTimeout(() => {
        fnArray[i]();
        resolve();
      }, timesArray[i])
    );
  }
};

// runInOrder([sayHi, sayBye, sayHowdy], [300, 600, 200]);

// should log: 'hi' (after 300 ms) 'bye' (600 ms after 'hi') 'howdy' (200 ms after 'bye')

/*
2.
The function ajaxSimulate takes an id and a callback function as input.
 Modify the function so that after the database array, it will set a timer that will
 pass the element of database whose index matches id to the callback function after 0 ms.
 Create a second function storeData (outside of ajaxSimulate) that takes data as input
 and assigns it to the dataReceived variable already defined.
 Invoke the ajaxSimulate function with an id of 1 and the storeData function
 as the callback. Immediately after, log to the console the value of dataReceived.
*/

let dataReceived;

function ajaxSimulate(id, callback) {
  const database = ['Aaron', 'Barbara', 'Chris'];

  setTimeout(() => callback(database[id]), 0);
}

function storeData(inputData) {
  dataReceived = inputData;
}

ajaxSimulate(1, storeData);
console.log(dataReceived);

/* 
3.
Get the length of an array using recursion without accessing its length property.
*/

const lengthOfArray = (arr) => {
  if (arr[0] === undefined) {
    return 0;
  }

  return lengthOfArray(arr.slice(0, -1)) + 1;
};

// console.log(lengthOfArray([1, 2, 2, 2, 2, 2]));

/*
4. 

Write a function that takes an array of functions and a number that will be piped through all those functions.
The input number passes through the first function, whose output is passed as input to the second function, 
whose output is passed as input to the third function, and so on.
Use recursion to return the final output of the last function in the array.
*/

function flow(input, funcArray) {
  if (funcArray[0] === undefined) {
    return input;
  }

  let fn = funcArray.shift();

  return flow(fn(input), funcArray);
}

// To check if you've completed the challenge, uncomment this code!
function multiplyBy2(num) {
  return num * 2;
}
function add7(num) {
  return num + 7;
}
function modulo4(num) {
  return num % 4;
}
function subtract10(num) {
  return num - 10;
}
const arrayOfFunctions = [multiplyBy2, add7, modulo4, subtract10];

// console.log(flow(2, arrayOfFunctions)); // -> -7

/*
5.
Create a function personFromPersonStore that takes as input a name and an age.
 When called, the function will create person objects using the Object.create
  method on the personStore object.
 */

const personStore = {
  greet: function () {
    console.log('hello');
  },
};

function personFromPersonStore(name, age) {
  const obj = Object.create(personStore);
  obj.name = name;
  obj.age = age;
  return obj;
}

const sandra = personFromPersonStore('Sandra', 26);

// Uncomment these lines to check your work!
//console.log(sandra.name); // -> Logs 'Sandra'
//console.log(sandra.age); // -> Logs 26
//sandra.greet(); // -> Logs 'hello'

/*
6. Create a function personFromConstructor that takes as input a name and an age.
 When called, the function will create person objects using the new keyword instead
  of the Object.create method.
*/

function PersonConstructor() {
  this.greet = function () {
    console.log('hello');
  };
}

function personFromConstructor(name, age) {
  const obj = new PersonConstructor();

  obj.name = name;
  obj.age = age;
  return obj;
}

const mike = personFromConstructor('Mike', 30);

// Uncomment these lines to check your work!
//console.log(mike.name); // -> Logs 'Mike'
//console.log(mike.age); // -> Logs 30
//mike.greet(); // -> Logs 'hello'

/*
7. Create a class PersonClass. PersonClass should have a constructor
 that is passed an input of name and saves it to a property by the same name.
  PersonClass should also have a method called greet that logs the string "hello".
*/
class PersonClass {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log('hello');
  }
}

const george = new PersonClass('George');

// Uncomment this line to check your work!
// george.greet(); // -> Logs 'hello'

/*
8. Write a function once that accepts a callback as input and returns a function. 
When the returned function is called the first time, it should call the callback and return that output. 
If it is called any additional times, instead of calling the callback again it will simply return
 the output value from the first time it was called.
*/
// ADD CODE HERE

let calledOnce = 0;

function once(callback) {
  let result;

  const inner = (num) => {
    if (!result && calledOnce < 2) {
      calledOnce++;
      result = callback(num);
      return result;
    } else {
      return result;
    }
  };

  return inner;
}

const addByTwoOnce = once(function (num) {
  return num + 2;
});

// UNCOMMENT THESE TO TEST YOUR WORK!
// console.log(addByTwoOnce(5)); //should log 7
// console.log(addByTwoOnce(10)); //should log 7
// console.log(addByTwoOnce(9001)); //should log 7

/*
9. Write a function after that takes the number of times the callback needs
 to be called before being executed as the first parameter and the callback as the second parameter.
 */

// ADD CODE HERE

let calledCount = 0;

const after = (num, callback) => {
  const inner = (arg) => {
    calledCount++;

    if (calledCount === num) {
      return callback(arg);
    }

    return;
  };

  return inner;
};

const called = function (string) {
  return 'hello ' + string;
};

const afterCalled = after(3, called);

// UNCOMMENT THESE LINES TO TEST YOUR WORK
// console.log(afterCalled('world')); // -> undefined is printed
// console.log(afterCalled('world')); // -> undefined is printed
// console.log(afterCalled('world')); // -> 'hello world' is printed

/*
10. Create a function dateStamp that accepts a function and returns a function.
  The returned function will accept whatever arguments the passed-in function
  accepts and return an object with a date key whose value is today's date
  (not including the time) represented as a human-readable string (see the
  Date object for conversion methods), and an output key that contains the
  result from invoking the passed-in function.
*/
// ADD CODE HERE
const dateStamp = (callback) => {
  const inner = (n) => {
    let res = callback(n);
    let date = new Date();

    return { date: date.toDateString(), output: res };
  };

  return inner;
};

// Uncomment these to check your work!
const stampedMultBy2 = dateStamp((n) => n * 2);
// console.log(stampedMultBy2(4)); // should log: { date: (today's date), output: 8 }
// console.log(stampedMultBy2(6)); // should log: { date: (today's date), output: 12 }

/*
11. Create a function censor that accepts no arguments. censor will return
 a function that will accept either two strings, or one string. 
 When two strings are given, the returned function will hold onto the 
 two strings as a pair, for future use. When one string is given, 
 the returned function will return the same string, except all instances
  of a first string (of a saved pair) will be replaced with the second string (of a saved pair).
*/

let pairs = {};

const censor = () => {
  const fn = (...args) => {
    if (args.length == 2) {
      pairs[args[0]] = args[1];
    } else if (args.length == 1) {
      let string = args[0];

      for (const key in pairs) {
        string = string.replace(key, pairs[key]);
      }

      return string;
    } else {
      throw Error('Wrong number of arguments');
    }
  };

  return fn;
};

// Uncomment these to check your work!
const changeScene = censor();
// changeScene('dogs', 'cats');
// changeScene('quick', 'slow');
// console.log(changeScene('The quick, brown fox jumps over the lazy dogs.')); // should log: 'The slow, brown fox jumps over the lazy cats.'
