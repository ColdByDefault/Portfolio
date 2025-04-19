'use client'
import CodeBlock from '@/components/ui/code-block'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Code, Lightbulb, BookOpen } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"


export default function FunctionsPage() {
    const { theme } = useTheme()

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Learning Path
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-4">JavaScript Functions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Learn how to create and use functions to organize your code into reusable, modular pieces
        </p>
      </header>

      <div className="grid gap-8">
        <section id="function-basics">
          <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <CardTitle>Function Basics</CardTitle>
              </div>
              <CardDescription>Understanding the fundamentals of JavaScript functions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">What are Functions?</h3>
                <p className="mb-4">
                  Functions are one of the fundamental building blocks in JavaScript. A function is a reusable block of
                  code designed to perform a particular task. Functions help organize your code, make it reusable, and
                  keep your program modular.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Function Declaration</h3>
                <p className="mb-4">
                  The most common way to define a function is with a function declaration, which consists of the{" "}
                  <code>function</code> keyword, followed by:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>The name of the function</li>
                  <li>A list of parameters enclosed in parentheses (optional)</li>
                  <li>The function body enclosed in curly braces</li>
                </ul>

                <CodeBlock
                  code={`// Basic function declaration
function greet() {
  console.log("Hello, world!");
}

// Function with parameters
function greetPerson(name) {
  console.log("Hello, " + name + "!");
}

// Function with return value
function sum(a, b) {
  return a + b;
}

// Calling functions
greet();                // Output: Hello, world!
greetPerson("Alice");   // Output: Hello, Alice!
let result = sum(5, 3); // result = 8
console.log(result);    // Output: 8`}
                  language="javascript"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Function Expressions</h3>
                <p className="mb-4">
                  Another way to define a function is with a function expression. In this case, the function can be
                  anonymous (without a name) or it can have a name.
                </p>

                <CodeBlock
                  code={`// Anonymous function expression
const greet = function() {
  console.log("Hello, world!");
};

// Named function expression
const sum = function addNumbers(a, b) {
  return a + b;
};

// Calling function expressions
greet();           // Output: Hello, world!
console.log(sum(5, 3)); // Output: 8

// The function name in a named function expression is only visible inside the function
// console.log(addNumbers); // Error: addNumbers is not defined`}
                  language="javascript"
                />

                <div className="mt-4 p-4 rounded-md">
                  <div className="flex gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-300">Key Difference</p>
                      <p className="text-amber-700 dark:text-amber-400">
                        Function declarations are hoisted (moved to the top of their scope), which means you can call
                        them before they appear in your code. Function expressions are not hoisted in the same way.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="arrow-functions">
          <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>Arrow Functions</CardTitle>
              </div>
              <CardDescription>Learn about the modern, concise syntax for writing functions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="mb-4">
                  Arrow functions were introduced in ES6 (ECMAScript 2015) and provide a more concise syntax for writing
                  functions. They are especially useful for short, simple functions and for functions that need to
                  preserve the lexical <code>this</code> value.
                </p>

                <CodeBlock
                  code={`// Basic arrow function
const greet = () => {
  console.log("Hello, world!");
};

// Arrow function with one parameter (parentheses optional)
const greetPerson = name => {
  console.log("Hello, " + name + "!");
};

// Arrow function with multiple parameters
const sum = (a, b) => {
  return a + b;
};

// Arrow function with implicit return (no curly braces)
const multiply = (a, b) => a * b;

// Calling arrow functions
greet();                   // Output: Hello, world!
greetPerson("Bob");        // Output: Hello, Bob!
console.log(sum(5, 3));    // Output: 8
console.log(multiply(4, 2)); // Output: 8`}
                  language="javascript"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Arrow Functions and Lexical <code>this</code>
                </h3>
                <p className="mb-4">
                  One of the main advantages of arrow functions is that they don't have their own <code>this</code>{" "}
                  binding. Instead, they inherit <code>this</code> from the surrounding code (lexical scoping).
                </p>

                <CodeBlock
                  code={`// Regular function vs Arrow function with 'this'

// With regular function
const person = {
  name: "Alice",
  regularFunction: function() {
    console.log(this.name); // 'this' refers to the person object
  },
  arrowFunction: () => {
    console.log(this.name); // 'this' refers to the outer scope (likely window or undefined)
  },
  delayedRegular: function() {
    setTimeout(function() {
      console.log(this.name); // 'this' is lost, refers to window or undefined
    }, 100);
  },
  delayedArrow: function() {
    setTimeout(() => {
      console.log(this.name); // 'this' is preserved, refers to person
    }, 100);
  }
};

person.regularFunction(); // Output: Alice
person.arrowFunction();   // Output: undefined (or depends on global context)
person.delayedRegular();  // Output: undefined (or depends on global context)
person.delayedArrow();    // Output: Alice`}
                  language="javascript"
                />

                <div className="mt-4 p-4 rounded-md">
                  <div className="flex gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-300">When to Use Arrow Functions</p>
                      <p className="text-amber-700 dark:text-amber-400">
                        Use arrow functions when you want to preserve the lexical <code>this</code>, such as in
                        callbacks or event handlers. Avoid using arrow functions for object methods, constructors, or
                        when you need access to <code>arguments</code> object.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="parameters-arguments">
          <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>Parameters and Arguments</CardTitle>
              </div>
              <CardDescription>Learn how to pass data to functions and handle parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Basic Parameters</h3>
                <p className="mb-4">
                  Parameters are the names listed in the function definition, while arguments are the actual values
                  passed to the function when it is called.
                </p>

                <CodeBlock
                  code={`// Function with two parameters
function add(x, y) {
  return x + y;
}

// Calling with two arguments
console.log(add(5, 3));  // Output: 8

// What happens with missing arguments?
console.log(add(5));     // Output: NaN (5 + undefined = NaN)

// What happens with extra arguments?
console.log(add(5, 3, 2)); // Output: 8 (extra arguments are ignored)`}
                  language="javascript"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Default Parameters</h3>
                <p className="mb-4">
                  ES6 introduced default parameters, which allow you to specify default values for parameters if no
                  argument is provided or if <code>undefined</code> is passed.
                </p>

                <CodeBlock
                  code={`// Function with default parameters
function greet(name = "Guest", greeting = "Hello") {
  return \`\${greeting}, \${name}!\`;
}

console.log(greet());                // Output: Hello, Guest!
console.log(greet("Alice"));         // Output: Hello, Alice!
console.log(greet("Bob", "Hi"));     // Output: Hi, Bob!
console.log(greet(undefined, "Hey")); // Output: Hey, Guest!

// Default parameters can use previous parameters
function createUser(name, role = "user", id = generateId(name)) {
  function generateId(name) {
    return name.toLowerCase().replace(/\\s/g, "") + Date.now();
  }
  return { name, role, id };
}

console.log(createUser("John Doe"));
// Output: { name: "John Doe", role: "user", id: "johndoe1234567890" }`}
                  language="javascript"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Rest Parameters</h3>
                <p className="mb-4">
                  The rest parameter syntax allows a function to accept an indefinite number of arguments as an array.
                  It's denoted by three dots (<code>...</code>) followed by a parameter name.
                </p>

                <CodeBlock
                  code={`// Function with rest parameter
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2));           // Output: 3
console.log(sum(1, 2, 3, 4, 5));  // Output: 15
console.log(sum());               // Output: 0

// Rest parameter must be the last parameter
function logDetails(name, ...details) {
  console.log(\`Name: \${name}\`);
  console.log(\`Details: \${details.join(", ")}\`);
}

logDetails("Alice", "Developer", "New York", "30");
// Output:
// Name: Alice
// Details: Developer, New York, 30`}
                  language="javascript"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">The Arguments Object</h3>
                <p className="mb-4">
                  In non-arrow functions, you can access all arguments passed to a function using the{" "}
                  <code>arguments</code> object, which is an array-like object containing all arguments.
                </p>

                <CodeBlock
                  code={`// Using the arguments object
function logAll() {
  for (let i = 0; i < arguments.length; i++) {
    console.log(\`Argument \${i}: \${arguments[i]}\`);
  }
}

logAll("a", "b", "c");
// Output:
// Argument 0: a
// Argument 1: b
// Argument 2: c

// Note: arguments is not available in arrow functions
const arrowLogAll = () => {
  console.log(arguments); // Error or unexpected behavior
};

// Use rest parameters instead for arrow functions
const betterArrowLogAll = (...args) => {
  args.forEach((arg, i) => {
    console.log(\`Argument \${i}: \${arg}\`);
  });
};`}
                  language="javascript"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Parameter Destructuring</h3>
                <p className="mb-4">
                  You can use object and array destructuring in function parameters to extract values from objects and
                  arrays passed as arguments.
                </p>

                <CodeBlock
                  code={`// Object destructuring in parameters
function displayPerson({ name, age, job = "Unknown" }) {
  console.log(\`Name: \${name}, Age: \${age}, Job: \${job}\`);
}

const person = { name: "Alice", age: 30, location: "New York" };
displayPerson(person);
// Output: Name: Alice, Age: 30, Job: Unknown

// Array destructuring in parameters
function displayCoordinates([x, y, z = 0]) {
  console.log(\`X: \${x}, Y: \${y}, Z: \${z}\`);
}

displayCoordinates([10, 20]);
// Output: X: 10, Y: 20, Z: 0`}
                  language="javascript"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="scope-closures">
          <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>Scope and Closures</CardTitle>
              </div>
              <CardDescription>Understand variable scope and the powerful closure concept</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Variable Scope</h3>
                <p className="mb-4">
                  Scope determines the accessibility of variables in your code. JavaScript has three types of scope:
                  global scope, function scope, and block scope (introduced with <code>let</code> and <code>const</code>{" "}
                  in ES6).
                </p>

                <CodeBlock
                  code={`// Global scope
let globalVar = "I'm global";

function exampleFunction() {
  // Function scope
  let functionVar = "I'm function-scoped";
  
  console.log(globalVar);     // Accessible: Output: I'm global
  console.log(functionVar);   // Accessible: Output: I'm function-scoped
  
  if (true) {
    // Block scope
    let blockVar = "I'm block-scoped";
    var functionScopedVar = "I'm function-scoped too";
    
    console.log(blockVar);    // Accessible: Output: I'm block-scoped
  }
  
  // console.log(blockVar);   // Error: blockVar is not defined
  console.log(functionScopedVar); // Accessible: Output: I'm function-scoped too
}

exampleFunction();
console.log(globalVar);       // Accessible: Output: I'm global
// console.log(functionVar);  // Error: functionVar is not defined`}
                  language="javascript"
                />

                <div className="mt-4 p-4 rounded-md">
                  <div className="flex gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-300">Scope Rules</p>
                      <p className="text-amber-700 dark:text-amber-400">
                        <code>var</code> declarations are function-scoped (visible throughout the function).
                        <br />
                        <code>let</code> and <code>const</code> declarations are block-scoped (visible only within the
                        block).
                        <br />
                        Variables declared without <code>var</code>, <code>let</code>, or <code>const</code> become
                        global variables (not recommended).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Closures</h3>
                <p className="mb-4">
                  A closure is a function that has access to variables from its outer (enclosing) function's scope, even
                  after the outer function has returned. Closures are one of the most powerful features in JavaScript.
                </p>

                <CodeBlock
                  code={`// Basic closure example
function createGreeter(greeting) {
  // The inner function is a closure that "closes over" the greeting variable
  return function(name) {
    return \`\${greeting}, \${name}!\`;
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

console.log(sayHello("Alice")); // Output: Hello, Alice!
console.log(sayHi("Bob"));      // Output: Hi, Bob!

// Practical closure example: counter
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
console.log(counter.increment()); // Output: 1
console.log(counter.increment()); // Output: 2
console.log(counter.getCount());  // Output: 2
console.log(counter.decrement()); // Output: 1

// The count variable is not directly accessible
// console.log(counter.count);    // Output: undefined`}
                  language="javascript"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Common Closure Use Cases</h3>

                <CodeBlock
                  code={`// Data privacy / encapsulation
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        return \`Deposited \${amount}. New balance: \${balance}\`;
      }
      return "Invalid deposit amount";
    },
    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return \`Withdrew \${amount}. New balance: \${balance}\`;
      }
      return "Invalid withdrawal amount";
    },
    getBalance() {
      return \`Current balance: \${balance}\`;
    }
  };
}

const account = createBankAccount(100);
console.log(account.getBalance());  // Output: Current balance: 100
console.log(account.deposit(50));   // Output: Deposited 50. New balance: 150
console.log(account.withdraw(30));  // Output: Withdrew 30. New balance: 120
console.log(account.withdraw(200)); // Output: Invalid withdrawal amount

// Function factory
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // Output: 10
console.log(triple(5));  // Output: 15`}
                  language="javascript"
                />

                <div className="mt-4 p-4 rounded-md">
                  <div className="flex gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-300">Closure Gotchas</p>
                      <p className="text-amber-700 dark:text-amber-400">
                        Be careful with closures in loops. Variables captured by closures refer to their final values,
                        not the value at the time the closure was created. Use let instead of var in loops, or create a
                        new scope for each iteration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="advanced-functions">
          <Card className={`p-4 ${theme === "dark" ? "dark" : "light"}`}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>Advanced Function Concepts</CardTitle>
              </div>
              <CardDescription>Explore higher-order functions, IIFE, and more</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Higher-Order Functions</h3>
                <p className="mb-4">
                  Higher-order functions are functions that take other functions as arguments or return functions as
                  their result. They are a powerful concept in functional programming.
                </p>

                <CodeBlock
                  code={`// Function that takes a function as an argument
function executeOperation(operation, a, b) {
  return operation(a, b);
}

// Functions to pass as arguments
function add(x, y) {
  return x + y;
}

function multiply(x, y) {
  return x * y;
}

console.log(executeOperation(add, 5, 3));      // Output: 8
console.log(executeOperation(multiply, 5, 3)); // Output: 15

// Using arrow functions
console.log(executeOperation((x, y) => x - y, 5, 3)); // Output: 2

// Array methods that are higher-order functions
const numbers = [1, 2, 3, 4, 5];

// map: transforms each element
const doubled = numbers.map(num => num * 2);
console.log(doubled); // Output: [2, 4, 6, 8, 10]

// filter: selects elements that match a condition
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]

// reduce: accumulates values
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum); // Output: 15`}
                  language="javascript"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Immediately Invoked Function Expressions (IIFE)</h3>
                <p className="mb-4">
                  An IIFE is a function that is executed immediately after it is created. It's a common pattern used to
                  create a private scope for variables.
                </p>

                <CodeBlock
                  code={`// Basic IIFE syntax
(function() {
  console.log("This function is executed immediately");
})();

// IIFE with parameters
(function(name) {
  console.log("Hello, " + name);
})("Alice");

// IIFE with arrow function
(() => {
  console.log("Arrow function IIFE");
})();

// IIFE to create private scope
const counter = (function() {
  let count = 0;  // Private variable
  
  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    value() {
      return count;
    }
  };
})();

console.log(counter.increment()); // Output: 1
console.log(counter.increment()); // Output: 2
console.log(counter.value());     // Output: 2`}
                  language="javascript"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Function Binding and <code>this</code>
                </h3>
                <p className="mb-4">
                  JavaScript provides methods to control what <code>this</code> refers to when a function is called:
                  <code>bind()</code>, <code>call()</code>, and <code>apply()</code>.
                </p>

                <CodeBlock
                  code={`// The 'this' problem
const person = {
  name: "Alice",
  greet() {
    console.log(\`Hello, my name is \${this.name}\`);
  }
};

person.greet(); // Output: Hello, my name is Alice

// Losing 'this' context
const greetFunction = person.greet;
// greetFunction(); // Output: Hello, my name is undefined

// Solution 1: bind()
const boundGreet = person.greet.bind(person);
boundGreet(); // Output: Hello, my name is Alice

// bind() with arguments
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // Output: 10

// Solution 2: call()
greetFunction.call(person); // Output: Hello, my name is Alice

// call() with arguments
function introduce(greeting) {
  console.log(\`\${greeting}, my name is \${this.name}\`);
}

introduce.call(person, "Hi"); // Output: Hi, my name is Alice

// Solution 3: apply()
introduce.apply(person, ["Hello"]); // Output: Hello, my name is Alice`}
                  language="javascript"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Function Composition and Currying</h3>
                <p className="mb-4">
                  Function composition and currying are advanced functional programming techniques that help create more
                  modular and reusable code.
                </p>

                <CodeBlock
                  code={`// Function composition
function addOne(x) {
  return x + 1;
}

function double(x) {
  return x * 2;
}

// Manual composition
function addOneThenDouble(x) {
  return double(addOne(x));
}

console.log(addOneThenDouble(3)); // Output: 8

// Composition helper
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

const addOneThenDouble2 = compose(double, addOne);
console.log(addOneThenDouble2(3)); // Output: 8

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

console.log(curriedAdd(1)(2)(3));   // Output: 6
console.log(curriedAdd(1, 2)(3));   // Output: 6
console.log(curriedAdd(1)(2, 3));   // Output: 6
console.log(curriedAdd(1, 2, 3));   // Output: 6`}
                  language="javascript"
                />
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="flex justify-between mt-8">
          <Link href="/berichHub">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" /> Back to Learning Path
            </Button>
          </Link>
          <Link href="">
            <Button className="gap-2">
              Coming Soon Objects and Arrays <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
