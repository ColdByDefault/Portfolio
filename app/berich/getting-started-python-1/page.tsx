"use client"
import Link from "next/link"
import { useTheme } from "next-themes"
import CodeBlock from "@/components/ui/code-block"

export default function PythonLearningPage() {
  const { theme } = useTheme()

  return (
    <div
      className={`flex flex-col justify-center pt-24
    items-center flex-grow p-4 ${theme === "dark" ? "dark" : "light"}`}
    >
      <h1 className="text-lg lg:text-4xl font-bold mb-8">Python Programming: Getting Started Guide</h1>

      <section className="mb-12">
        <h2 id="install-python" className="text-md lg:text-2xl font-semibold mb-4">
          1. How to Install Python
        </h2>
        <div className="prose">
          <p className="pb-1">
            Python is a versatile programming language used for web development, data analysis, AI, and more. Follow
            these steps to install Python:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              Visit the{" "}
              <Link
                href="https://python.org/downloads/"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                official Python website
              </Link>
            </li>
            <li>Download the latest version (or Python 3.12+ recommended for beginners)</li>
            <li>Run the installer and check "Add Python to PATH" during installation</li>
            <li>
              Verify installation by opening a terminal/command prompt and running:
              <CodeBlock code="python --version" language="bash" showLineNumbers={true} />
            </li>
          </ol>
          <p className="mt-4">
            Alternatively, you can use Anaconda or Miniconda for a more comprehensive Python distribution that includes
            many data science packages.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="python-basics" className="text-2xl font-semibold mb-4">
          2. Python Basics
        </h2>
        <div className="prose">
          <p>Let's start with a simple "Hello, World!" program:</p>
          <CodeBlock code="print('Hello, World!')" language="python" showLineNumbers={true} />

          <p className="mt-4">Python uses indentation to define code blocks. Here's a simple example:</p>
          <CodeBlock
            code={`if 5 > 2:
    print("Five is greater than two!")
    print("This is still part of the if block")
print("This is outside the if block")`}
            language="python"
            showLineNumbers={true}
          />

          <p className="mt-4">Comments in Python start with a # character:</p>
          <CodeBlock
            code={`# This is a comment
print("Hello, World!")  # This is an inline comment`}
            language="python"
            showLineNumbers={true}
          />

          <p className="mt-4">
            Python is case-sensitive, so <code>variable</code> and <code>Variable</code> are different variables.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 id="data-types" className="text-2xl font-semibold mb-4">
          3. Python Data Types
        </h2>
        <div className="prose">
          <p>Python has several built-in data types:</p>

          <h3 className="text-xl font-medium mt-4 mb-2">Numeric Types</h3>
          <CodeBlock
            code={`# Integer
x = 10
print(x, type(x))

# Float
y = 10.5
print(y, type(y))

# Complex
z = 1j
print(z, type(z))`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Text Type</h3>
          <CodeBlock
            code={`# String
name = "Python"
print(name, type(name))

# String methods
print(name.upper())
print(name.lower())
print(len(name))`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Sequence Types</h3>
          <CodeBlock
            code={`# List (mutable)
fruits = ["apple", "banana", "cherry"]
print(fruits, type(fruits))
fruits.append("orange")
print(fruits)

# Tuple (immutable)
coordinates = (10, 20)
print(coordinates, type(coordinates))

# Range
numbers = range(5)
print(list(numbers), type(numbers))`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Mapping Type</h3>
          <CodeBlock
            code={`# Dictionary
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}
print(person, type(person))
print(person["name"])`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Set Types</h3>
          <CodeBlock
            code={`# Set (unordered, no duplicates)
fruits_set = {"apple", "banana", "cherry", "apple"}
print(fruits_set, type(fruits_set))  # Note: duplicates are removed`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Boolean Type</h3>
          <CodeBlock
            code={`# Boolean
is_python_fun = True
print(is_python_fun, type(is_python_fun))`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="control-flow" className="text-2xl font-semibold mb-4">
          4. Control Flow in Python
        </h2>
        <div className="prose">
          <h3 className="text-xl font-medium mt-4 mb-2">If-Else Statements</h3>
          <CodeBlock
            code={`age = 18

if age < 18:
    print("You are a minor")
elif age == 18:
    print("You just became an adult")
else:
    print("You are an adult")`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">For Loops</h3>
          <CodeBlock
            code={`# Looping through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Looping through a range
for i in range(5):
    print(i)  # Prints 0, 1, 2, 3, 4`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">While Loops</h3>
          <CodeBlock
            code={`# While loop
count = 0
while count < 5:
    print(count)
    count += 1  # Increment count`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Break and Continue</h3>
          <CodeBlock
            code={`# Break statement
for i in range(10):
    if i == 5:
        break  # Exit the loop when i is 5
    print(i)

# Continue statement
for i in range(10):
    if i % 2 == 0:
        continue  # Skip even numbers
    print(i)  # Prints only odd numbers`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="functions" className="text-2xl font-semibold mb-4">
          5. Functions in Python
        </h2>
        <div className="prose">
          <p>
            Functions are defined using the <code>def</code> keyword:
          </p>
          <CodeBlock
            code={`# Simple function
def greet(name):
    return f"Hello, {name}!"

# Call the function
message = greet("Python Learner")
print(message)

# Function with default parameter
def greet_with_time(name, time="morning"):
    return f"Good {time}, {name}!"

print(greet_with_time("Alice"))
print(greet_with_time("Bob", "evening"))`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Lambda Functions</h3>
          <CodeBlock
            code={`# Lambda (anonymous) function
multiply = lambda x, y: x * y
print(multiply(5, 3))  # Outputs: 15

# Lambda with built-in functions
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # Outputs: [1, 4, 9, 16, 25]`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">*args and **kwargs</h3>
          <CodeBlock
            code={`# *args for variable number of arguments
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3, 4, 5))  # Outputs: 15

# **kwargs for variable keyword arguments
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, country="Wonderland")`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="modules" className="text-2xl font-semibold mb-4">
          6. Working with Modules
        </h2>
        <div className="prose">
          <p>Python modules are files containing Python code that can be imported and used in other Python programs:</p>

          <h3 className="text-xl font-medium mt-4 mb-2">Built-in Modules</h3>
          <CodeBlock
            code={`# Import the math module
import math

# Use functions from the module
print(math.sqrt(16))  # Square root: 4.0
print(math.pi)        # Pi: 3.141592653589793

# Import specific functions
from random import randint
print(randint(1, 10))  # Random integer between 1 and 10

# Import with alias
import datetime as dt
now = dt.datetime.now()
print(now)`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Creating Your Own Module</h3>
          <p>
            Create a file named <code>mymodule.py</code>:
          </p>
          <CodeBlock
            code={`# mymodule.py
def greeting(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b

PI = 3.14159`}
            language="python"
            showLineNumbers={true}
          />

          <p>Then import and use it in another file:</p>
          <CodeBlock
            code={`# main.py
import mymodule

print(mymodule.greeting("Python User"))
print(mymodule.add(5, 3))
print(mymodule.PI)`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Installing External Packages</h3>
          <p>Use pip to install external packages:</p>
          <CodeBlock code="pip install requests" language="bash" showLineNumbers={true} />

          <p>Then use the package in your code:</p>
          <CodeBlock
            code={`import requests

response = requests.get("https://api.github.com")
print(response.status_code)
print(response.json())`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="simple-program" className="text-2xl font-semibold mb-4">
          7. Example of Creating a Simple Python Program
        </h2>
        <div className="prose">
          <p>Let's create a simple temperature converter program:</p>
          <CodeBlock
            code={`def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit."""
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """Convert Fahrenheit to Celsius."""
    return (fahrenheit - 32) * 5/9

def main():
    print("Temperature Converter")
    print("1. Celsius to Fahrenheit")
    print("2. Fahrenheit to Celsius")
    
    choice = input("Enter your choice (1/2): ")
    
    if choice == '1':
        celsius = float(input("Enter temperature in Celsius: "))
        fahrenheit = celsius_to_fahrenheit(celsius)
        print(f"{celsius}°C is equal to {fahrenheit:.2f}°F")
    elif choice == '2':
        fahrenheit = float(input("Enter temperature in Fahrenheit: "))
        celsius = fahrenheit_to_celsius(fahrenheit)
        print(f"{fahrenheit}°F is equal to {celsius:.2f}°C")
    else:
        print("Invalid choice")

if __name__ == "__main__":
    main()`}
            language="python"
            showLineNumbers={true}
          />

          <p className="mt-4">
            Save this code to a file (e.g., <code>temp_converter.py</code>) and run it with:
          </p>
          <CodeBlock code="python temp_converter.py" language="bash" showLineNumbers={true} />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="oop" className="text-2xl font-semibold mb-4">
          8. Object-Oriented Programming in Python
        </h2>
        <div className="prose">
          <p>Python supports object-oriented programming with classes and objects:</p>
          <CodeBlock
            code={`class Person:
    # Class attribute
    species = "Homo sapiens"
    
    # Constructor method
    def __init__(self, name, age):
        # Instance attributes
        self.name = name
        self.age = age
    
    # Instance method
    def introduce(self):
        return f"Hi, I'm {self.name} and I'm {self.age} years old."
    
    # Instance method
    def celebrate_birthday(self):
        self.age += 1
        return f"Happy Birthday! Now I'm {self.age} years old."

# Create objects of the Person class
alice = Person("Alice", 25)
bob = Person("Bob", 30)

# Access attributes and call methods
print(alice.name)                # Alice
print(bob.age)                   # 30
print(alice.species)             # Homo sapiens
print(bob.introduce())           # Hi, I'm Bob and I'm 30 years old.
print(alice.celebrate_birthday()) # Happy Birthday! Now I'm 26 years old.`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Inheritance</h3>
          <CodeBlock
            code={`class Student(Person):
    # Constructor method
    def __init__(self, name, age, student_id):
        # Call the parent class constructor
        super().__init__(name, age)
        self.student_id = student_id
    
    # Override the introduce method
    def introduce(self):
        return f"Hi, I'm {self.name}, a student with ID {self.student_id}."
    
    # New method specific to Student
    def study(self, subject):
        return f"{self.name} is studying {subject}."

# Create a Student object
charlie = Student("Charlie", 20, "S12345")

# Access attributes and call methods
print(charlie.name)        # Charlie
print(charlie.student_id)  # S12345
print(charlie.introduce()) # Hi, I'm Charlie, a student with ID S12345.
print(charlie.study("Python"))  # Charlie is studying Python.`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>
    </div>
  )
}

