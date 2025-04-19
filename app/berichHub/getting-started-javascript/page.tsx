'use client'
import CodeBlock from '@/components/ui/code-block'
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, BookOpen, Code, Lightbulb, Rocket, Brain } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"


export default function JavaScriptLearningPage() {
    const { theme } = useTheme()
  
  return (
    <div className={`flex flex-col justify-center pt-24
      items-center flex-grow p-6 ${theme === "dark" ? "dark" : "light"}`}>
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">JavaScript Learning Path</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive guide to mastering JavaScript from fundamentals to advanced concepts
        </p>
      </header>

      <Tabs defaultValue="beginner" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="beginner" className="mt-6">
          <div className="grid gap-8">
            <section id="introduction" className={`${theme === "dark" ? "dark" : "light"}`}>
              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <CardTitle>Introduction to JavaScript</CardTitle>
                  </div>
                  <CardDescription>Learn what JavaScript is and why it's important for web development</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    JavaScript is a high-level, interpreted programming language that is one of the core technologies of
                    the web. It allows you to add interactivity to websites, create web applications, and even build
                    server-side applications.
                  </p>

                  <h3 className="text-lg font-medium mb-2">Your First JavaScript Code</h3>
                  <CodeBlock
                    code={`// This is a comment
console.log("Hello, World!"); // Prints to the console

// You can also use alert to show a popup
// alert("Hello from JavaScript!");`}
                    language="javascript"
                  />

                  <div className="mt-4 p-4 rounded-md">
                    <div className="flex gap-2">
                      <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-300">Pro Tip</p>
                        <p className="text-amber-700 dark:text-amber-400">
                          You can open your browser's developer tools (F12 or Right-click → Inspect) to see console
                          output.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section id="variables">
              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <CardTitle>Variables and Data Types</CardTitle>
                  </div>
                  <CardDescription>Learn how to store and manipulate data in JavaScript</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">Declaring Variables</h3>
                  <p className="mb-4">
                    JavaScript has three ways to declare variables: <code>var</code>, <code>let</code>, and{" "}
                    <code>const</code>.
                  </p>

                  <CodeBlock
                    code={`// var (older way, function scoped)
var name = "John";

// let (block scoped, can be reassigned)
let age = 25;
age = 26; // This is valid

// const (block scoped, cannot be reassigned)
const PI = 3.14159;
// PI = 3.14; // This would cause an error`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Data Types</h3>
                  <p className="mb-4">
                    JavaScript has several primitive data types and one complex data type (Object).
                  </p>

                  <CodeBlock
                    code={`// Primitive types
let string = "Hello";           // String
let number = 42;                // Number
let decimal = 3.14;             // Also a Number
let boolean = true;             // Boolean
let nullValue = null;           // Null
let undefinedValue;             // Undefined
let bigInt = 9007199254740991n; // BigInt
let symbol = Symbol("unique");  // Symbol

// Check the type using typeof
console.log(typeof string);     // "string"
console.log(typeof number);     // "number"
console.log(typeof boolean);    // "boolean"

// Complex type: Object
let person = {
  name: "Alice",
  age: 30,
  isStudent: false
};

// Arrays are also objects
let fruits = ["apple", "banana", "orange"];

console.log(typeof person);     // "object"
console.log(typeof fruits);     // "object"
console.log(Array.isArray(fruits)); // true`}
                    language="javascript"
                  />
                </CardContent>
              </Card>
            </section>

            <section id="operators">
              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <CardTitle>Operators and Expressions</CardTitle>
                  </div>
                  <CardDescription>Learn how to perform operations on values</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">Arithmetic Operators</h3>

                  <CodeBlock
                    code={`let a = 10;
let b = 3;

console.log(a + b);  // Addition: 13
console.log(a - b);  // Subtraction: 7
console.log(a * b);  // Multiplication: 30
console.log(a / b);  // Division: 3.3333...
console.log(a % b);  // Modulus (remainder): 1
console.log(a ** b); // Exponentiation: 1000 (10^3)

// Increment and decrement
let c = 5;
console.log(c++);    // 5 (returns c, then increments)
console.log(c);      // 6
console.log(++c);    // 7 (increments c, then returns it)`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Comparison Operators</h3>

                  <CodeBlock
                    code={`let x = 5;
let y = "5";

console.log(x == y);   // true (loose equality, converts types)
console.log(x === y);  // false (strict equality, checks types)
console.log(x != y);   // false (loose inequality)
console.log(x !== y);  // true (strict inequality)
console.log(x > 3);    // true
console.log(x <= 5);   // true`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Logical Operators</h3>

                  <CodeBlock
                    code={`let isAdult = true;
let hasLicense = false;

console.log(isAdult && hasLicense); // AND: false
console.log(isAdult || hasLicense); // OR: true
console.log(!isAdult);              // NOT: false

// Short-circuit evaluation
let name = "";
let defaultName = name || "Anonymous"; // "Anonymous"

let user = { name: "John" };
let userName = user && user.name;      // "John"`}
                    language="javascript"
                  />
                </CardContent>
              </Card>
            </section>

            <section id="control-flow">
              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <CardTitle>Control Flow</CardTitle>
                  </div>
                  <CardDescription>
                    Learn how to control the flow of your program with conditionals and loops
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">Conditional Statements</h3>

                  <CodeBlock
                    code={`let age = 18;

// if statement
if (age >= 18) {
  console.log("You are an adult");
}

// if-else statement
if (age >= 18) {
  console.log("You are an adult");
} else {
  console.log("You are a minor");
}

// if-else if-else statement
if (age < 13) {
  console.log("Child");
} else if (age < 18) {
  console.log("Teenager");
} else {
  console.log("Adult");
}

// Ternary operator (condition ? trueValue : falseValue)
let status = age >= 18 ? "Adult" : "Minor";
console.log(status);

// Switch statement
let day = 2;
switch (day) {
  case 0:
    console.log("Sunday");
    break;
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  default:
    console.log("Another day");
}`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Loops</h3>

                  <CodeBlock
                    code={`// for loop
for (let i = 0; i < 5; i++) {
  console.log("Iteration " + i);
}

// while loop
let count = 0;
while (count < 3) {
  console.log("Count: " + count);
  count++;
}

// do-while loop (always executes at least once)
let num = 0;
do {
  console.log("Number: " + num);
  num++;
} while (num < 3);

// for...of loop (iterates over iterable values)
const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color);
}

// for...in loop (iterates over object properties)
const person = { name: "John", age: 30, job: "developer" };
for (const key in person) {
  console.log(key + ": " + person[key]);
}`}
                    language="javascript"
                  />
                </CardContent>
              </Card>
            </section>

            <div className="flex justify-center items-center gap-4 mt-8">
              <Link href="/berichHub/getting-started-javascript/functions" className="border-b-2">
                Continue to Functions
              </Link>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="intermediate" className="mt-6">
          <div className="grid gap-8">
            <section id="functions">
              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <CardTitle>Functions</CardTitle>
                  </div>
                  <CardDescription>Learn how to create reusable blocks of code</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">Function Declaration</h3>

                  <CodeBlock
                    code={`// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Function expression
const sayHello = function(name) {
  return "Hello, " + name + "!";
};

// Arrow function (ES6)
const welcome = (name) => {
  return "Welcome, " + name + "!";
};

// Simplified arrow function (single expression)
const hi = name => "Hi, " + name + "!";

console.log(greet("Alice"));    // "Hello, Alice!"
console.log(sayHello("Bob"));   // "Hello, Bob!"
console.log(welcome("Charlie")); // "Welcome, Charlie!"
console.log(hi("Dave"));        // "Hi, Dave!"`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Parameters and Arguments</h3>

                  <CodeBlock
                    code={`// Default parameters
function greetUser(name = "Guest") {
  return "Hello, " + name + "!";
}

console.log(greetUser());        // "Hello, Guest!"
console.log(greetUser("Alice")); // "Hello, Alice!"

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// Destructuring parameters
function displayPerson({ name, age }) {
  console.log(name + " is " + age + " years old");
}

displayPerson({ name: "John", age: 30 }); // "John is 30 years old"`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Scope and Closures</h3>

                  <CodeBlock
                    code={`// Global scope
let globalVar = "I'm global";

function exampleFunction() {
  // Function scope
  let localVar = "I'm local";
  console.log(globalVar); // Can access global variables
  console.log(localVar);  // Can access local variables
  
  if (true) {
    // Block scope (with let/const)
    let blockVar = "I'm in a block";
    console.log(blockVar); // Can access block variables
  }
  // console.log(blockVar); // Error: blockVar is not defined
}

// Closures
function createCounter() {
  let count = 0; // This variable is "closed over"
  
  return function() {
    count++; // The inner function can access count
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3`}
                    language="javascript"
                  />
                </CardContent>
              </Card>
            </section>

            <section id="objects-arrays">
              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <CardTitle>Objects and Arrays</CardTitle>
                  </div>
                  <CardDescription>Learn how to work with complex data structures</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">Objects</h3>

                  <CodeBlock
                    code={`// Creating objects
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  hobbies: ["reading", "music", "hiking"],
  address: {
    street: "123 Main St",
    city: "Anytown",
    country: "USA"
  },
  // Method
  getFullName: function() {
    return this.firstName + " " + this.lastName;
  },
  // Shorthand method (ES6)
  greet() {
    return "Hello, I'm " + this.getFullName();
  }
};

// Accessing properties
console.log(person.firstName);           // "John"
console.log(person["lastName"]);         // "Doe"
console.log(person.address.city);        // "Anytown"
console.log(person.getFullName());       // "John Doe"

// Adding and modifying properties
person.email = "john@example.com";
person.age = 31;

// Object destructuring
const { firstName, lastName, age } = person;
console.log(firstName, lastName, age);   // "John Doe 31"

// Spread operator with objects
const personWithJob = { 
  ...person, 
  job: "Developer" 
};`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Arrays</h3>

                  <CodeBlock
                    code={`// Creating arrays
const numbers = [1, 2, 3, 4, 5];
const fruits = ["apple", "banana", "orange"];
const mixed = [1, "hello", true, null, { name: "John" }];

// Accessing elements
console.log(fruits[0]);  // "apple"
console.log(fruits[1]);  // "banana"

// Array methods
fruits.push("grape");               // Add to end
fruits.unshift("strawberry");       // Add to beginning
const lastFruit = fruits.pop();     // Remove from end
const firstFruit = fruits.shift();  // Remove from beginning

// Finding elements
const hasApple = fruits.includes("apple");  // true
const bananaIndex = fruits.indexOf("banana"); // 1

// Transforming arrays
const doubled = numbers.map(num => num * 2);  // [2, 4, 6, 8, 10]
const evenNumbers = numbers.filter(num => num % 2 === 0);  // [2, 4]
const sum = numbers.reduce((total, num) => total + num, 0);  // 15

// Iterating over arrays
fruits.forEach((fruit, index) => {
  console.log(index + ": " + fruit);
});

// Spread operator with arrays
const moreFruits = ["kiwi", "mango"];
const allFruits = [...fruits, ...moreFruits];

// Array destructuring
const [first, second, ...rest] = numbers;
console.log(first, second, rest);  // 1 2 [3, 4, 5]`}
                    language="javascript"
                  />
                </CardContent>
              </Card>
            </section>

            <section id="dom-manipulation">
              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <CardTitle>DOM Manipulation</CardTitle>
                  </div>
                  <CardDescription>Learn how to interact with HTML elements using JavaScript</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">Selecting Elements</h3>

                  <CodeBlock
                    code={`// Select by ID
const header = document.getElementById("header");

// Select by class name (returns HTMLCollection)
const paragraphs = document.getElementsByClassName("paragraph");

// Select by tag name (returns HTMLCollection)
const divs = document.getElementsByTagName("div");

// Select using CSS selectors (returns first match)
const firstButton = document.querySelector("button");

// Select all matching elements (returns NodeList)
const allButtons = document.querySelectorAll("button.primary");

// Traversing the DOM
const parent = header.parentElement;
const children = header.children;
const nextSibling = header.nextElementSibling;
const prevSibling = header.previousElementSibling;`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Modifying Elements</h3>

                  <CodeBlock
                    code={`// Changing content
header.textContent = "New Header Text";  // Text only
header.innerHTML = "<span>New</span> Header";  // HTML content

// Changing attributes
const link = document.querySelector("a");
link.href = "https://example.com";
link.setAttribute("target", "_blank");
link.getAttribute("href");  // "https://example.com"
link.removeAttribute("title");

// Working with classes
header.className = "large-header";  // Replaces all classes
header.classList.add("highlight");
header.classList.remove("old-class");
header.classList.toggle("active");
header.classList.contains("highlight");  // true

// Changing styles
header.style.color = "blue";
header.style.fontSize = "24px";
header.style.display = "flex";`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Creating and Removing Elements</h3>

                  <CodeBlock
                    code={`// Creating elements
const newParagraph = document.createElement("p");
newParagraph.textContent = "This is a new paragraph.";

// Adding elements to the DOM
document.body.appendChild(newParagraph);  // Add as last child
header.insertAdjacentElement("beforebegin", newParagraph);  // Before the header
header.insertAdjacentHTML("afterend", "<p>Inserted HTML</p>");

// Removing elements
newParagraph.remove();  // Modern way
// Or the older way:
// newParagraph.parentElement.removeChild(newParagraph);

// Cloning elements
const clone = header.cloneNode(true);  // true = deep clone with children`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Event Handling</h3>

                  <CodeBlock
                    code={`// Adding event listeners
const button = document.querySelector("button");

button.addEventListener("click", function(event) {
  console.log("Button clicked!");
  console.log(event);  // Event object
});

// Using arrow functions
button.addEventListener("mouseover", (event) => {
  button.classList.add("hovered");
});

button.addEventListener("mouseout", (event) => {
  button.classList.remove("hovered");
});

// Removing event listeners
function handleClick(event) {
  console.log("Clicked!");
}

button.addEventListener("click", handleClick);
// Later:
button.removeEventListener("click", handleClick);

// Event delegation
document.getElementById("todo-list").addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("completed");
  }
});`}
                    language="javascript"
                  />
                </CardContent>
              </Card>
            </section>

            <div className="flex justify-center mt-8">
              <Button size="lg" className="gap-2">
                Continue to Advanced Topics <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <div className="grid gap-8">
            <section id="async-javascript">
              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <CardTitle>Asynchronous JavaScript</CardTitle>
                  </div>
                  <CardDescription>Learn how to handle asynchronous operations in JavaScript</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">Callbacks</h3>

                  <CodeBlock
                    code={`// Callback example
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John", age: 30 };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log("Data received:", data);
});

console.log("This runs before the data is received");

// Callback hell (nested callbacks)
fetchUserData(userId, (user) => {
  fetchUserPosts(user.id, (posts) => {
    fetchPostComments(posts[0].id, (comments) => {
      console.log(comments);
      // More nested callbacks...
    });
  });
});`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Promises</h3>

                  <CodeBlock
                    code={`// Creating a promise
const fetchUserPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  setTimeout(() => {
    const success = true;
    
    if (success) {
      resolve({ id: 1, name: "John" });
    } else {
      reject(new Error("Failed to fetch user"));
    }
  }, 1000);
});

// Using promises
fetchUserPromise
  .then(user => {
    console.log("User:", user);
    return fetchUserPosts(user.id);  // Return another promise
  })
  .then(posts => {
    console.log("Posts:", posts);
    return fetchPostComments(posts[0].id);
  })
  .then(comments => {
    console.log("Comments:", comments);
  })
  .catch(error => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Operation completed");
  });

// Promise methods
Promise.all([fetchUsers(), fetchPosts(), fetchComments()])
  .then(([users, posts, comments]) => {
    // All promises resolved
  });

Promise.race([fetchFast(), fetchSlow()])
  .then(result => {
    // First promise to resolve
  });

Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    // All promises settled (resolved or rejected)
  });`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Async/Await</h3>

                  <CodeBlock
                    code={`// Async function declaration
async function fetchUserData(userId) {
  try {
    // await pauses execution until the promise resolves
    const user = await fetchUser(userId);
    const posts = await fetchUserPosts(user.id);
    const comments = await fetchPostComments(posts[0].id);
    
    return { user, posts, comments };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;  // Re-throw or handle appropriately
  }
}

// Using an async function
fetchUserData(1)
  .then(data => console.log("Data:", data))
  .catch(error => console.error("Error:", error));

// Async arrow function
const getData = async (id) => {
  // ...
};

// Parallel async operations
async function fetchAllData() {
  // These run in parallel
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments()
  ]);
  
  return { users, posts, comments };
}`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Fetch API</h3>

                  <CodeBlock
                    code={`// Basic GET request
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));

// POST request
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log(data));

// Using async/await with fetch
async function fetchUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}`}
                    language="javascript"
                  />
                </CardContent>
              </Card>
            </section>

            <section id="modern-javascript">
              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <CardTitle>Modern JavaScript (ES6+)</CardTitle>
                  </div>
                  <CardDescription>Learn the modern features of JavaScript</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">Destructuring</h3>

                  <CodeBlock
                    code={`// Array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first, second, rest);  // 1 2 [3, 4, 5]

// Skipping elements
const [a, , c] = numbers;  // a = 1, c = 3

// Default values
const [x = 0, y = 0, z = 0] = [1, 2];
console.log(x, y, z);  // 1 2 0

// Object destructuring
const person = { name: "John", age: 30, job: "developer" };
const { name, age, job } = person;
console.log(name, age, job);  // "John" 30 "developer"

// Renaming properties
const { name: fullName, job: profession } = person;
console.log(fullName, profession);  // "John" "developer"

// Default values
const { name, salary = 50000 } = person;
console.log(salary);  // 50000

// Nested destructuring
const user = {
  id: 1,
  details: {
    firstName: "John",
    lastName: "Doe",
    address: {
      city: "New York",
      country: "USA"
    }
  }
};

const { details: { firstName, lastName, address: { city } } } = user;
console.log(firstName, lastName, city);  // "John" "Doe" "New York"`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Spread and Rest Operators</h3>

                  <CodeBlock
                    code={`// Spread operator with arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

// Copying arrays
const original = [1, 2, 3];
const copy = [...original];  // Creates a shallow copy

// Spread operator with objects
const person = { name: "John", age: 30 };
const employee = { ...person, job: "developer", name: "John Doe" };
// { name: "John Doe", age: 30, job: "developer" }

// Rest operator in function parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5));  // 15

// Rest in destructuring
const [first, ...remaining] = [1, 2, 3, 4, 5];
console.log(first, remaining);  // 1 [2, 3, 4, 5]

const { name, ...rest } = { name: "John", age: 30, job: "developer" };
console.log(name, rest);  // "John" { age: 30, job: "developer" }`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Template Literals</h3>

                  <CodeBlock
                    code={`// Basic template literals
const name = "John";
const greeting = \`Hello, \${name}!\`;
console.log(greeting);  // "Hello, John!"

// Multi-line strings
const message = \`
  This is a multi-line
  string that preserves
  line breaks and indentation.
\`;

// Expression evaluation
const a = 5;
const b = 10;
console.log(\`The sum of \${a} and \${b} is \${a + b}\`);
// "The sum of 5 and 10 is 15"

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? \`<strong>\${values[i]}</strong>\` : '');
  }, '');
}

const name = "John";
const age = 30;
const html = highlight\`My name is \${name} and I am \${age} years old.\`;
// "My name is <strong>John</strong> and I am <strong>30</strong> years old."`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Modules</h3>

                  <CodeBlock
                    code={`// Exporting (math.js)
// Named exports
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Default export
export default function multiply(a, b) {
  return a * b;
}

// Importing (app.js)
// Import default export
import multiply from './math.js';

// Import named exports
import { PI, add, subtract } from './math.js';

// Import with alias
import { add as sum } from './math.js';

// Import all exports as a namespace
import * as math from './math.js';
console.log(math.PI);        // 3.14159
console.log(math.add(2, 3)); // 5
console.log(math.default(4, 5)); // 20 (default export)`}
                    language="javascript"
                  />
                </CardContent>
              </Card>
            </section>

            <section id="advanced-concepts">
              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <CardTitle>Advanced Concepts</CardTitle>
                  </div>
                  <CardDescription>Master advanced JavaScript concepts and patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-medium mb-2">Prototypes and Inheritance</h3>

                  <CodeBlock
                    code={`// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding methods to the prototype
Person.prototype.greet = function() {
  return \`Hello, my name is \${this.name}\`;
};

// Creating instances
const john = new Person("John", 30);
console.log(john.greet());  // "Hello, my name is John"

// Inheritance with prototypes
function Employee(name, age, job) {
  // Call the parent constructor
  Person.call(this, name, age);
  this.job = job;
}

// Set up inheritance
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

// Add methods to child prototype
Employee.prototype.getJob = function() {
  return \`I work as a \${this.job}\`;
};

const jane = new Employee("Jane", 28, "developer");
console.log(jane.greet());   // "Hello, my name is Jane"
console.log(jane.getJob());  // "I work as a developer"

// ES6 Classes (syntactic sugar over prototypes)
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return \`\${this.name} makes a noise.\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  speak() {
    return \`\${this.name} barks!\`;
  }
}

const dog = new Dog("Rex", "German Shepherd");
console.log(dog.speak());  // "Rex barks!"`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Closures and Scope</h3>

                  <CodeBlock
                    code={`// Closures
function createCounter() {
  let count = 0;  // Private variable
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.getCount());   // 2
console.log(counter.decrement());  // 1

// Module pattern using closures
const calculator = (function() {
  // Private variables and functions
  let result = 0;
  
  function validateNumber(num) {
    return typeof num === 'number' && !isNaN(num);
  }
  
  // Public API
  return {
    add(num) {
      if (validateNumber(num)) {
        result += num;
      }
      return this;
    },
    subtract(num) {
      if (validateNumber(num)) {
        result -= num;
      }
      return this;
    },
    getResult() {
      return result;
    }
  };
})();

calculator.add(5).subtract(2).add(10);
console.log(calculator.getResult());  // 13`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Advanced Function Concepts</h3>

                  <CodeBlock
                    code={`// Function binding
const person = {
  name: "John",
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
};

const greet = person.greet;
console.log(greet());  // "Hello, my name is undefined" (this is not bound)

// Fixing with bind
const boundGreet = person.greet.bind(person);
console.log(boundGreet());  // "Hello, my name is John"

// Partial application
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5));  // 10

// Call and apply
function introduce(greeting, punctuation) {
  return \`\${greeting}, my name is \${this.name}\${punctuation}\`;
}

console.log(introduce.call(person, "Hi", "!"));  // "Hi, my name is John!"
console.log(introduce.apply(person, ["Hello", "."]));  // "Hello, my name is John."

// Currying
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));  // 6
console.log(curriedAdd(1, 2)(3));  // 6
console.log(curriedAdd(1)(2, 3));  // 6`}
                    language="javascript"
                  />

                  <h3 className="text-lg font-medium mt-6 mb-2">Design Patterns</h3>

                  <CodeBlock
                    code={`// Singleton pattern
const Singleton = (function() {
  let instance;
  
  function createInstance() {
    return {
      name: "Singleton Instance",
      getData() {
        return "Data from singleton";
      }
    };
  }
  
  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2);  // true

// Factory pattern
function createUser(type) {
  if (type === "admin") {
    return {
      name: "Admin User",
      permissions: ["read", "write", "delete"],
      role: "admin"
    };
  } else if (type === "user") {
    return {
      name: "Regular User",
      permissions: ["read"],
      role: "user"
    };
  }
}

const admin = createUser("admin");
const user = createUser("user");

// Observer pattern
class Observable {
  constructor() {
    this.observers = [];
  }
  
  subscribe(fn) {
    this.observers.push(fn);
  }
  
  unsubscribe(fn) {
    this.observers = this.observers.filter(observer => observer !== fn);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

const news = new Observable();

function observer1(data) {
  console.log("Observer 1 received:", data);
}

function observer2(data) {
  console.log("Observer 2 received:", data);
}

news.subscribe(observer1);
news.subscribe(observer2);
news.notify("Breaking news!");  // Both observers receive the notification`}
                    language="javascript"
                  />
                </CardContent>
              </Card>
            </section>

            <section id="projects">
              <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <CardTitle>Projects and Practice</CardTitle>
                  </div>
                  <CardDescription>Apply your JavaScript knowledge with these project ideas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Todo List Application</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Create a todo list app with features like adding, completing, and deleting tasks.
                      </p>
                      <p className="text-sm">
                        <strong>Skills:</strong> DOM manipulation, event handling, local storage
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Weather App</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Build a weather app that fetches data from a weather API and displays forecasts.
                      </p>
                      <p className="text-sm">
                        <strong>Skills:</strong> Fetch API, async/await, API integration
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Quiz Application</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Create an interactive quiz with multiple-choice questions and scoring.
                      </p>
                      <p className="text-sm">
                        <strong>Skills:</strong> Objects, arrays, DOM manipulation, event handling
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">E-commerce Cart</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Build a shopping cart with product listing, adding/removing items, and calculating totals.
                      </p>
                      <p className="text-sm">
                        <strong>Skills:</strong> Objects, arrays, DOM manipulation, local storage
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Real-time Chat App</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Create a chat application using WebSockets or a real-time database like Firebase.
                      </p>
                      <p className="text-sm">
                        <strong>Skills:</strong> Async JavaScript, WebSockets/Firebase, DOM manipulation
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Markdown Editor</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Build a simple markdown editor with preview functionality.
                      </p>
                      <p className="text-sm">
                        <strong>Skills:</strong> DOM manipulation, event handling, regular expressions
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h3 className="font-medium mb-2">Resources for Practice</h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <strong>JavaScript30:</strong> 30 day vanilla JS coding challenge
                      </li>
                      <li>
                        <strong>Exercism:</strong> Coding exercises with mentorship
                      </li>
                      <li>
                        <strong>LeetCode:</strong> Algorithm challenges to improve problem-solving
                      </li>
                      <li>
                        <strong>Frontend Mentor:</strong> Real-world projects to build your portfolio
                      </li>
                      <li>
                        <strong>CodeWars:</strong> Practice coding and earn ranks as you improve
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
