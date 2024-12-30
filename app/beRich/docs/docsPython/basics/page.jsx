'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {Step, StepItem} from '../../components/Step';
import Breadcrumb from '../../components/breadcrumb';

const CodeBlock = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="relative mt-4 bg-gray-900 rounded-lg overflow-hidden">
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language} text-sm text-gray-300`}>{code}</code>
      </pre>
      <button
        className="absolute top-2 right-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold py-1 px-2 rounded transition duration-200"
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default function PythonBasics() {
  return (
    <section className="py-12 text-gray-300 min-h-screen">
      <div className='mb-4'>
        <Breadcrumb />
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12">Python Basics: Your Guide to Starting with Python</h1>
        <div className="max-w-4xl">
          <Step>
            <StepItem title="1. Install Python" number="1">
              <p className="mb-4">
                Python is an interpreted, high-level programming language. To begin, download Python from the{" "}
                <Link href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">
                  official Python website
                </Link>. Install version 3.8 or newer.
              </p>
              <p className="mb-2">After installation, verify Python by running:</p>
              <CodeBlock code="python --version" language="bash" />
            </StepItem>

            <StepItem title="2. Understand Variables and Data Types" number="2">
              <p className="mb-4">
                Variables are used to store data. Python supports multiple data types like integers, floats, strings, and booleans.
              </p>
              <p className="mb-2">Here's an example:</p>
              <CodeBlock
                code={`# Example of variables
name = "Alice"  # String
age = 25        # Integer
height = 5.4    # Float
is_student = True  # Boolean`}
                language="python"
              />
            </StepItem>

            <StepItem title="3. Control Flow: If Statements" number="3">
              <p className="mb-4">
                Use `if`, `elif`, and `else` to control program flow based on conditions.
              </p>
              <p className="mb-2">Example:</p>
              <CodeBlock
                code={`age = 18

if age < 18:
    print("Minor")
elif age == 18:
    print("Just an adult")
else:
    print("Adult")`}
                language="python"
              />
            </StepItem>

            <StepItem title="4. Loops: For and While" number="4">
              <p className="mb-4">
                Loops help you iterate over sequences or perform repetitive tasks. Use `for` for sequences and `while` for conditions.
              </p>
              <p className="mb-2">Example of a `for` loop:</p>
              <CodeBlock
                code={`for i in range(5):
    print("Iteration", i)`}
                language="python"
              />
              <p className="mb-2 mt-4">Example of a `while` loop:</p>
              <CodeBlock
                code={`counter = 0
while counter < 5:
    print("Counter is", counter)
    counter += 1`}
                language="python"
              />
            </StepItem>

            <StepItem title="5. Functions" number="5">
              <p className="mb-4">
                Functions are reusable blocks of code. Define a function using the `def` keyword.
              </p>
              <p className="mb-2">Example:</p>
              <CodeBlock
                code={`def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))`}
                language="python"
              />
            </StepItem>

            <StepItem title="6. Lists and Dictionaries" number="6">
              <p className="mb-4">
                Lists and dictionaries are used to store collections of data.
              </p>
              <p className="mb-2">Example of a list:</p>
              <CodeBlock
                code={`fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)`}
                language="python"
              />
              <p className="mb-2 mt-4">Example of a dictionary:</p>
              <CodeBlock
                code={`student = {"name": "Alice", "age": 25, "major": "Computer Science"}
print(student["name"])`}
                language="python"
              />
            </StepItem>

            <StepItem title="7. File Handling" number="7">
              <p className="mb-4">
                Python makes it easy to read and write files.
              </p>
              <p className="mb-2">Example of writing to a file:</p>
              <CodeBlock
                code={`with open("example.txt", "w") as file:
    file.write("Hello, world!")`}
                language="python"
              />
              <p className="mb-2 mt-4">Example of reading from a file:</p>
              <CodeBlock
                code={`with open("example.txt", "r") as file:
    content = file.read()
    print(content)`}
                language="python"
              />
            </StepItem>

            <StepItem title="8. Next Steps" number="8">
              <p className="mb-4">
                Now that you've covered the basics, consider exploring:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Object-Oriented Programming</li>
                <li>Modules and Packages</li>
                <li>Python's Standard Library</li>
                <li>Web Development with Django or Flask</li>
                <li>Data Analysis with Pandas</li>
              </ul>
              <p>
                Check out the{" "}
                <Link href="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">
                  Python official documentation
                </Link>{" "}
                for more in-depth learning.
              </p>
            </StepItem>
          </Step>
        </div>
      </div>
    </section>
  );
}
