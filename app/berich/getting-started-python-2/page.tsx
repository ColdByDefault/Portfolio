"use client"
import Link from "next/link"
import { useTheme } from "next-themes"
import CodeBlock from "@/components/ui/code-block"

export default function AdvancedPythonLearningPage() {
  const { theme } = useTheme()

  return (
    <div
      className={`flex flex-col justify-center pt-24
    items-center flex-grow p-4 ${theme === "dark" ? "dark" : "light"}`}
    >
      <h1 className="text-lg lg:text-4xl font-bold mb-8">Python Programming: Advanced Concepts</h1>

      <section className="mb-12">
        <h2 id="advanced-data-structures" className="text-md lg:text-2xl font-semibold mb-4">
          1. Advanced Data Structures
        </h2>
        <div className="prose">
          <h3 className="text-xl font-medium mt-4 mb-2">Collections Module</h3>
          <p className="pb-1">
            Python's collections module provides specialized container datatypes that go beyond the built-in types:
          </p>
          <CodeBlock
            code={`from collections import Counter, defaultdict, namedtuple, deque

# Counter - count occurrences of elements
words = ['apple', 'orange', 'apple', 'banana', 'apple', 'orange']
word_counts = Counter(words)
print(word_counts)  # Counter({'apple': 3, 'orange': 2, 'banana': 1})
print(word_counts.most_common(1))  # [('apple', 3)]

# defaultdict - dictionary with default values
fruit_colors = defaultdict(list)
fruit_colors['apple'].append('red')  # No KeyError if key doesn't exist
fruit_colors['apple'].append('green')
fruit_colors['banana'].append('yellow')
print(dict(fruit_colors))  # {'apple': ['red', 'green'], 'banana': ['yellow']}

# namedtuple - tuple with named fields
Person = namedtuple('Person', ['name', 'age', 'city'])
alice = Person('Alice', 30, 'New York')
print(alice.name, alice.age, alice.city)  # Alice 30 New York
print(alice[0], alice[1], alice[2])  # Alice 30 New York

# deque - double-ended queue with fast appends and pops
queue = deque(['a', 'b', 'c'])
queue.append('d')         # Add to right
queue.appendleft('z')     # Add to left
print(queue)              # deque(['z', 'a', 'b', 'c', 'd'])
print(queue.pop())        # 'd'
print(queue.popleft())    # 'z'
print(queue)              # deque(['a', 'b', 'c'])`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Comprehensions</h3>
          <CodeBlock
            code={`# List comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(squares)  # [1, 4, 9, 16, 25]

# List comprehension with condition
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(even_squares)  # [4, 16]

# Dictionary comprehension
square_dict = {x: x**2 for x in numbers}
print(square_dict)  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Set comprehension
square_set = {x**2 for x in numbers}
print(square_set)  # {1, 4, 9, 16, 25}

# Generator expression (memory efficient)
sum_of_squares = sum(x**2 for x in numbers)
print(sum_of_squares)  # 55`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Advanced Dictionary Operations</h3>
          <CodeBlock
            code={`# Merging dictionaries (Python 3.9+)
dict1 = {'a': 1, 'b': 2}
dict2 = {'b': 3, 'c': 4}
merged = dict1 | dict2  # {'a': 1, 'b': 3, 'c': 4}
print(merged)

# Dictionary unpacking
user = {'name': 'Alice', 'age': 30}
defaults = {'country': 'USA', 'language': 'English'}
full_profile = {**defaults, **user}
print(full_profile)  # {'country': 'USA', 'language': 'English', 'name': 'Alice', 'age': 30}

# Dictionary views
student = {'name': 'Bob', 'grades': [85, 90, 78]}
keys = student.keys()
values = student.values()
items = student.items()

print(keys)    # dict_keys(['name', 'grades'])
print(values)  # dict_values(['Bob', [85, 90, 78]])
print(items)   # dict_items([('name', 'Bob'), ('grades', [85, 90, 78])])

# Views are dynamic
student['age'] = 20
print(keys)    # dict_keys(['name', 'grades', 'age'])`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="file-handling" className="text-2xl font-semibold mb-4">
          2. File Handling
        </h2>
        <div className="prose">
          <h3 className="text-xl font-medium mt-4 mb-2">Reading and Writing Text Files</h3>
          <CodeBlock
            code={`# Writing to a text file
with open('example.txt', 'w') as file:
    file.write('Hello, Python!\n')
    file.write('File handling is essential.\n')
    
# Reading from a text file
with open('example.txt', 'r') as file:
    content = file.read()
    print(content)
    
# Reading line by line
with open('example.txt', 'r') as file:
    for line in file:
        print(line.strip())  # strip() removes the newline character
        
# Appending to a file
with open('example.txt', 'a') as file:
    file.write('This line is appended.\n')`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Working with CSV Files</h3>
          <CodeBlock
            code={`import csv

# Writing CSV data
data = [
    ['Name', 'Age', 'Country'],
    ['Alice', 30, 'USA'],
    ['Bob', 25, 'Canada'],
    ['Charlie', 35, 'UK']
]

with open('people.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerows(data)
    
# Reading CSV data
with open('people.csv', 'r', newline='') as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
        
# Using DictReader and DictWriter
with open('people.csv', 'r', newline='') as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['Name']} is {row['Age']} years old from {row['Country']}")`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Working with JSON</h3>
          <CodeBlock
            code={`import json

# Python dictionary
user = {
    'name': 'Alice',
    'age': 30,
    'is_active': True,
    'skills': ['Python', 'JavaScript', 'SQL'],
    'address': {
        'city': 'New York',
        'country': 'USA'
    }
}

# Convert Python object to JSON string
json_string = json.dumps(user, indent=4)
print(json_string)

# Write JSON to file
with open('user.json', 'w') as file:
    json.dump(user, file, indent=4)
    
# Read JSON from file
with open('user.json', 'r') as file:
    loaded_user = json.load(file)
    print(loaded_user)
    
# Parse JSON string
json_data = '{"name": "Bob", "age": 25}'
parsed_data = json.loads(json_data)
print(parsed_data['name'])  # Bob`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Working with Binary Files</h3>
          <CodeBlock
            code={`# Writing binary data
with open('binary_file.bin', 'wb') as file:
    file.write(b'\\x48\\x65\\x6c\\x6c\\x6f')  # "Hello" in hex
    
# Reading binary data
with open('binary_file.bin', 'rb') as file:
    data = file.read()
    print(data)  # b'Hello'
    print(data.decode('utf-8'))  # Convert bytes to string: "Hello"`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="exception-handling" className="text-2xl font-semibold mb-4">
          3. Exception Handling
        </h2>
        <div className="prose">
          <h3 className="text-xl font-medium mt-4 mb-2">Basic Exception Handling</h3>
          <CodeBlock
            code={`# Basic try-except
try:
    x = 10 / 0  # This will raise a ZeroDivisionError
except ZeroDivisionError:
    print("Cannot divide by zero!")
    
# Handling multiple exceptions
try:
    num = int(input("Enter a number: "))
    result = 10 / num
    print(f"Result: {result}")
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
    
# Using else clause (runs if no exception occurs)
try:
    num = int(input("Enter a number: "))
    result = 10 / num
except (ValueError, ZeroDivisionError) as e:
    print(f"Error: {e}")
else:
    print(f"Result: {result}")
    
# Using finally clause (always runs)
try:
    file = open("example.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found!")
finally:
    # This will run whether an exception occurred or not
    print("Execution completed")
    # Close the file if it was opened
    if 'file' in locals() and not file.closed:
        file.close()`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Creating Custom Exceptions</h3>
          <CodeBlock
            code={`# Define custom exception
class InsufficientFundsError(Exception):
    """Raised when a withdrawal exceeds the available balance"""
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        self.message = f"Cannot withdraw $ {amount}. Only $ {balance} available."
        super().__init__(self.message)

# Using custom exception
class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance
        
    def deposit(self, amount):
        self.balance += amount
        return self.balance
        
    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance

# Test the custom exception
account = BankAccount(100)
try:
    account.withdraw(150)
except InsufficientFundsError as e:
    print(e)  # Cannot withdraw $150. Only $100 available.`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Context Managers with try-finally</h3>
          <CodeBlock
            code={`# Context manager using class
class FileManager:
    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None
        
    def __enter__(self):
        self.file = open(self.filename, self.mode)
        return self.file
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
        # Return True to suppress exception, False to propagate it
        return False

# Using the context manager
with FileManager('example.txt', 'w') as file:
    file.write('Using a custom context manager')
    
# Context manager using decorator
from contextlib import contextmanager

@contextmanager
def open_file(filename, mode):
    try:
        file = open(filename, mode)
        yield file
    finally:
        file.close()

# Using the decorator-based context manager
with open_file('example.txt', 'r') as file:
    content = file.read()
    print(content)`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="decorators-generators" className="text-2xl font-semibold mb-4">
          4. Decorators and Generators
        </h2>
        <div className="prose">
          <h3 className="text-xl font-medium mt-4 mb-2">Decorators</h3>
          <p>Decorators are functions that modify the behavior of other functions or methods:</p>
          <CodeBlock
            code={`# Basic decorator
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
# Output:
# Something is happening before the function is called.
# Hello!
# Something is happening after the function is called.

# Decorator with arguments
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")
    
greet("Alice")
# Output:
# Hello, Alice!
# Hello, Alice!
# Hello, Alice!

# Practical example: timing decorator
import time

def timing_decorator(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"{func.__name__} took {end_time - start_time:.4f} seconds to run")
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(1)
    return "Function completed"

print(slow_function())
# Output:
# slow_function took 1.0012 seconds to run
# Function completed`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Generators</h3>
          <p>Generators are functions that can pause and resume their execution, yielding values one at a time:</p>
          <CodeBlock
            code={`# Basic generator
def count_up_to(n):
    i = 1
    while i <= n:
        yield i
        i += 1

# Using the generator
counter = count_up_to(5)
print(next(counter))  # 1
print(next(counter))  # 2
print(next(counter))  # 3

# Iterating over a generator
for num in count_up_to(5):
    print(num)  # Prints 1, 2, 3, 4, 5

# Generator expressions
squares = (x**2 for x in range(1, 6))
print(list(squares))  # [1, 4, 9, 16, 25]

# Memory efficiency example
import sys

# List comprehension (stores all values in memory)
list_comp = [x**2 for x in range(10000)]
# Generator expression (generates values on-the-fly)
gen_exp = (x**2 for x in range(10000))

print(f"List size: {sys.getsizeof(list_comp)} bytes")
print(f"Generator size: {sys.getsizeof(gen_exp)} bytes")

# Infinite sequence generator
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Get first 10 Fibonacci numbers
fib = fibonacci()
for _ in range(10):
    print(next(fib), end=" ")  # 0 1 1 2 3 5 8 13 21 34`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Combining Decorators and Generators</h3>
          <CodeBlock
            code={`# Decorator for a generator
def debug_generator(func):
    def wrapper(*args, **kwargs):
        gen = func(*args, **kwargs)
        for value in gen:
            print(f"Generator yielded: {value}")
            yield value
    return wrapper

@debug_generator
def numbers(n):
    for i in range(n):
        yield i * i

# Using the decorated generator
for num in numbers(5):
    pass  # The decorator will print each yielded value`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="working-with-apis" className="text-2xl font-semibold mb-4">
          5. Working with APIs
        </h2>
        <div className="prose">
          <p>Python makes it easy to interact with web APIs using the requests library:</p>
          <CodeBlock
            code={`import requests

# Making a GET request
response = requests.get('https://jsonplaceholder.typicode.com/posts/1')
print(f"Status code: {response.status_code}")
print(f"Content type: {response.headers['Content-Type']}")

# Parsing JSON response
data = response.json()
print(f"Post title: {data['title']}")

# Making a GET request with parameters
params = {'userId': 1}
response = requests.get('https://jsonplaceholder.typicode.com/posts', params=params)
posts = response.json()
print(f"Number of posts by user 1: {len(posts)}")

# Making a POST request
new_post = {
    'title': 'Python API Tutorial',
    'body': 'This is a post about using APIs with Python',
    'userId': 1
}
response = requests.post('https://jsonplaceholder.typicode.com/posts', json=new_post)
created_post = response.json()
print(f"Created post ID: {created_post['id']}")

# Making a PUT request (update)
updated_post = {
    'id': 1,
    'title': 'Updated Title',
    'body': 'This post has been updated',
    'userId': 1
}
response = requests.put('https://jsonplaceholder.typicode.com/posts/1', json=updated_post)
print(f"Update status: {response.status_code}")

# Making a DELETE request
response = requests.delete('https://jsonplaceholder.typicode.com/posts/1')
print(f"Delete status: {response.status_code}")

# Handling authentication
response = requests.get(
    'https://api.github.com/user', 
    auth=('username', 'personal_access_token')
)

# Using sessions for multiple requests
session = requests.Session()
session.headers.update({'User-Agent': 'Python API Tutorial'})
response = session.get('https://api.github.com/repos/python/cpython')
print(response.json()['description'])`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Async API Requests</h3>
          <CodeBlock
            code={`import asyncio
import aiohttp
import time

async def fetch_data(session, url):
    async with session.get(url) as response:
        return await response.json()

async def main():
    start_time = time.time()
    
    # Create a session
    async with aiohttp.ClientSession() as session:
        # Create tasks for concurrent execution
        tasks = []
        for i in range(1, 11):
            url = f'https://jsonplaceholder.typicode.com/posts/{i}'
            tasks.append(fetch_data(session, url))
        
        # Wait for all tasks to complete
        results = await asyncio.gather(*tasks)
        
        # Process results
        for i, result in enumerate(results, 1):
            print(f"Post {i} title: {result['title'][:30]}...")
    
    end_time = time.time()
    print(f"Fetched 10 posts in {end_time - start_time:.2f} seconds")

# Run the async function
asyncio.run(main())`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="data-analysis" className="text-2xl font-semibold mb-4">
          6. Data Analysis with Pandas
        </h2>
        <div className="prose">
          <p>Pandas is a powerful library for data manipulation and analysis:</p>
          <CodeBlock
            code={`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Creating a DataFrame
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David', 'Eva'],
    'Age': [25, 30, 35, 40, 45],
    'City': ['New York', 'Boston', 'Chicago', 'Boston', 'New York'],
    'Salary': [50000, 60000, 70000, 80000, 90000]
}

df = pd.DataFrame(data)
print(df)

# Basic DataFrame operations
print(df.head(2))  # First 2 rows
print(df.tail(2))  # Last 2 rows
print(df.info())   # DataFrame info
print(df.describe())  # Statistical summary

# Selecting data
print(df['Name'])  # Select a column
print(df[['Name', 'Age']])  # Select multiple columns
print(df.loc[0])  # Select a row by label
print(df.iloc[0])  # Select a row by position
print(df.loc[0:2, 'Name':'City'])  # Select rows and columns by label
print(df.iloc[0:2, 0:2])  # Select rows and columns by position

# Filtering data
print(df[df['Age'] > 30])  # Filter by condition
print(df[(df['Age'] > 30) & (df['Salary'] > 70000)])  # Multiple conditions

# Adding and modifying columns
df['Experience'] = [3, 5, 8, 12, 15]  # Add a new column
df['Salary'] = df['Salary'] * 1.1  # Modify a column
print(df)

# Grouping and aggregation
city_groups = df.groupby('City')
print(city_groups.mean())  # Mean of numeric columns by city
print(city_groups.agg({
    'Age': 'mean',
    'Salary': ['min', 'max', 'mean'],
    'Experience': 'sum'
}))

# Handling missing values
df_missing = df.copy()
df_missing.loc[0, 'Age'] = np.nan
df_missing.loc[2, 'Salary'] = np.nan

print(df_missing.isna().sum())  # Count missing values
print(df_missing.fillna(0))  # Fill missing values with 0
print(df_missing.dropna())  # Drop rows with missing values

# Merging DataFrames
df1 = pd.DataFrame({
    'ID': [1, 2, 3, 4],
    'Name': ['Alice', 'Bob', 'Charlie', 'David'],
    'Department': ['HR', 'IT', 'Finance', 'IT']
})

df2 = pd.DataFrame({
    'ID': [1, 2, 3, 5],
    'Salary': [50000, 60000, 70000, 90000],
    'Experience': [3, 5, 8, 15]
})

# Inner join
merged_inner = pd.merge(df1, df2, on='ID', how='inner')
print(merged_inner)

# Outer join
merged_outer = pd.merge(df1, df2, on='ID', how='outer')
print(merged_outer)

# Basic visualization
df.plot(kind='bar', x='Name', y='Salary', figsize=(10, 6))
plt.title('Salary by Employee')
plt.ylabel('Salary ($)')
plt.tight_layout()
plt.show()`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Time Series Analysis</h3>
          <CodeBlock
            code={`# Create a time series
dates = pd.date_range('20230101', periods=12, freq='M')
ts = pd.Series(np.random.randn(12) * 100 + 500, index=dates)
print(ts)

# Resampling
print(ts.resample('Q').mean())  # Quarterly average
print(ts.resample('Q').agg(['min', 'max', 'mean']))  # Multiple aggregations

# Rolling statistics
print(ts.rolling(window=3).mean())  # 3-month rolling average

# Shifting
print(ts.shift(1))  # Shift values forward by 1
print(ts.diff())  # Difference between current and previous value

# Time series visualization
ts.plot(figsize=(10, 6))
ts.rolling(window=3).mean().plot(style='r--')
plt.title('Monthly Values with 3-Month Rolling Average')
plt.ylabel('Value')
plt.legend(['Original', '3-Month Avg'])
plt.tight_layout()
plt.show()`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="web-development" className="text-2xl font-semibold mb-4">
          7. Web Development with Flask
        </h2>
        <div className="prose">
          <p>Flask is a lightweight web framework for Python:</p>
          <CodeBlock
            code={`from flask import Flask, render_template, request, redirect, url_for, jsonify

# Create a Flask application
app = Flask(__name__)

# Sample data
tasks = [
    {'id': 1, 'title': 'Learn Python', 'done': True},
    {'id': 2, 'title': 'Learn Flask', 'done': False},
    {'id': 3, 'title': 'Build a web app', 'done': False}
]

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

# Route to get all tasks (API)
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': tasks})

# Route to get a specific task (API)
@app.route('/api/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = next((task for task in tasks if task['id'] == task_id), None)
    if task:
        return jsonify({'task': task})
    return jsonify({'error': 'Task not found'}), 404

# Route to create a new task (API)
@app.route('/api/tasks', methods=['POST'])
def create_task():
    if not request.json or 'title' not in request.json:
        return jsonify({'error': 'Title is required'}), 400
    
    task_id = max(task['id'] for task in tasks) + 1
    task = {
        'id': task_id,
        'title': request.json['title'],
        'done': False
    }
    tasks.append(task)
    return jsonify({'task': task}), 201

# Route to update a task (API)
@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = next((task for task in tasks if task['id'] == task_id), None)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    if 'title' in request.json:
        task['title'] = request.json['title']
    if 'done' in request.json:
        task['done'] = request.json['done']
    
    return jsonify({'task': task})

# Route to delete a task (API)
@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = next((task for task in tasks if task['id'] == task_id), None)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    tasks.remove(task)
    return jsonify({'result': True})

# Form submission route
@app.route('/add', methods=['POST'])
def add_task():
    title = request.form.get('title')
    if title:
        task_id = max(task['id'] for task in tasks) + 1
        tasks.append({'id': task_id, 'title': title, 'done': False})
    return redirect(url_for('index'))

# Toggle task status route
@app.route('/toggle/<int:task_id>')
def toggle_task(task_id):
    task = next((task for task in tasks if task['id'] == task_id), None)
    if task:
        task['done'] = not task['done']
    return redirect(url_for('index'))

# Delete task route
@app.route('/delete/<int:task_id>')
def remove_task(task_id):
    task = next((task for task in tasks if task['id'] == task_id), None)
    if task:
        tasks.remove(task)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">HTML Template Example</h3>
          <p>Here's a simple HTML template for the Flask app (save as templates/index.html):</p>
          <CodeBlock
            code={`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flask Todo App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .task {
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .task.done {
            text-decoration: line-through;
            color: #888;
        }
        .task-actions {
            margin-left: auto;
        }
        form {
            display: flex;
            margin-bottom: 20px;
        }
        input[type="text"] {
            flex-grow: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px 0 0 4px;
        }
        button {
            padding: 10px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 0 4px 4px 0;
            cursor: pointer;
        }
        .task-actions a {
            margin-left: 10px;
            color: #666;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <h1>Todo List</h1>
    
    <form action="/add" method="post">
        <input type="text" name="title" placeholder="Add a new task..." required>
        <button type="submit">Add</button>
    </form>
    
    <div class="tasks">
        {% for task in tasks %}
        <div class="task {% if task.done %}done{% endif %}">
            <span>{{ task.title }}</span>
            <div class="task-actions">
                <a href="/toggle/{{ task.id }}">{% if task.done %}Undo{% else %}Done{% endif %}</a>
                <a href="/delete/{{ task.id }}">Delete</a>
            </div>
        </div>
        {% endfor %}
    </div>
</body>
</html>`}
            language="html"
            showLineNumbers={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="testing" className="text-2xl font-semibold mb-4">
          8. Testing in Python
        </h2>
        <div className="prose">
          <h3 className="text-xl font-medium mt-4 mb-2">Unit Testing with unittest</h3>
          <p>Python's built-in unittest framework allows you to write and run tests:</p>
          <CodeBlock
            code={`import unittest

# The code to test
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Test case class
class TestMathFunctions(unittest.TestCase):
    
    def test_add(self):
        self.assertEqual(add(10, 5), 15)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(-1, -1), -2)
    
    def test_subtract(self):
        self.assertEqual(subtract(10, 5), 5)
        self.assertEqual(subtract(-1, 1), -2)
        self.assertEqual(subtract(-1, -1), 0)
    
    def test_multiply(self):
        self.assertEqual(multiply(10, 5), 50)
        self.assertEqual(multiply(-1, 1), -1)
        self.assertEqual(multiply(-1, -1), 1)
    
    def test_divide(self):
        self.assertEqual(divide(10, 5), 2)
        self.assertEqual(divide(-1, 1), -1)
        self.assertEqual(divide(5, 2), 2.5)
        
        # Test division by zero
        with self.assertRaises(ValueError):
            divide(10, 0)
    
    # Setup and teardown methods
    def setUp(self):
        # Code to run before each test
        print("Setting up test...")
    
    def tearDown(self):
        # Code to run after each test
        print("Tearing down test...")
    
    @classmethod
    def setUpClass(cls):
        # Code to run once before all tests
        print("Setting up test class...")
    
    @classmethod
    def tearDownClass(cls):
        # Code to run once after all tests
        print("Tearing down test class...")

if __name__ == '__main__':
    unittest.main()`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Testing with pytest</h3>
          <p>pytest is a more modern testing framework with simpler syntax:</p>
          <CodeBlock
            code={`# Save as test_math.py
import pytest

# The code to test
def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Test functions
def test_add():
    assert add(10, 5) == 15
    assert add(-1, 1) == 0
    assert add(-1, -1) == -2

def test_divide():
    assert divide(10, 5) == 2
    assert divide(-1, 1) == -1
    assert divide(5, 2) == 2.5

def test_divide_by_zero():
    with pytest.raises(ValueError):
        divide(10, 0)

# Parameterized tests
@pytest.mark.parametrize("a, b, expected", [
    (10, 5, 15),
    (-1, 1, 0),
    (-1, -1, -2),
    (0, 0, 0)
])
def test_add_parameterized(a, b, expected):
    assert add(a, b) == expected

# Fixtures
@pytest.fixture
def sample_data():
    return [1, 2, 3, 4, 5]

def test_with_fixture(sample_data):
    assert len(sample_data) == 5
    assert sum(sample_data) == 15`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Mock Objects</h3>
          <p>Using mock objects to isolate code for testing:</p>
          <CodeBlock
            code={`import unittest
from unittest.mock import Mock, patch

# Function that makes an API call
def get_user_data(user_id):
    # In a real app, this would call an API
    response = make_api_request(f"https://api.example.com/users/{user_id}")
    if response.status_code == 200:
        return response.json()
    return None

# Function that processes user data
def process_user(user_id):
    user_data = get_user_data(user_id)
    if user_data and user_data.get('active'):
        return f"Active user: {user_data['name']}"
    return "Inactive or missing user"

# Test case using mocks
class TestUserProcessing(unittest.TestCase):
    
    def test_process_active_user(self):
        # Create a mock for get_user_data
        mock_get_data = Mock(return_value={
            'id': 123,
            'name': 'Test User',
            'active': True
        })
        
        # Patch the get_user_data function
        with patch('__main__.get_user_data', mock_get_data):
            result = process_user(123)
            self.assertEqual(result, "Active user: Test User")
            mock_get_data.assert_called_once_with(123)
    
    def test_process_inactive_user(self):
        # Create a mock for get_user_data
        mock_get_data = Mock(return_value={
            'id': 456,
            'name': 'Inactive User',
            'active': False
        })
        
        # Patch the get_user_data function
        with patch('__main__.get_user_data', mock_get_data):
            result = process_user(456)
            self.assertEqual(result, "Inactive or missing user")
    
    def test_process_missing_user(self):
        # Create a mock for get_user_data
        mock_get_data = Mock(return_value=None)
        
        # Patch the get_user_data function
        with patch('__main__.get_user_data', mock_get_data):
            result = process_user(789)
            self.assertEqual(result, "Inactive or missing user")`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 id="concurrency" className="text-2xl font-semibold mb-4">
          9. Concurrency and Parallelism
        </h2>
        <div className="prose">
          <h3 className="text-xl font-medium mt-4 mb-2">Threading</h3>
          <CodeBlock
            code={`import threading
import time

def worker(name, delay):
    print(f"{name} started")
    time.sleep(delay)
    print(f"{name} finished")

# Create threads
thread1 = threading.Thread(target=worker, args=("Thread-1", 2))
thread2 = threading.Thread(target=worker, args=("Thread-2", 4))

# Start threads
start_time = time.time()
thread1.start()
thread2.start()

# Wait for threads to complete
thread1.join()
thread2.join()

end_time = time.time()
print(f"All threads completed in {end_time - start_time:.2f} seconds")`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Multiprocessing</h3>
          <CodeBlock
            code={`import multiprocessing
import time

def cpu_bound_task(number):
    """A CPU-bound task that computes the sum of squares."""
    return sum(i * i for i in range(number))

def process_worker(numbers):
    """Process a list of numbers using a single process."""
    start_time = time.time()
    results = [cpu_bound_task(number) for number in numbers]
    end_time = time.time()
    print(f"Sequential processing took {end_time - start_time:.2f} seconds")
    return results

def process_worker_parallel(numbers):
    """Process a list of numbers using multiple processes."""
    start_time = time.time()
    
    # Create a pool of processes
    with multiprocessing.Pool() as pool:
        # Map the function to the list of numbers
        results = pool.map(cpu_bound_task, numbers)
    
    end_time = time.time()
    print(f"Parallel processing took {end_time - start_time:.2f} seconds")
    return results

if __name__ == "__main__":
    # List of numbers to process
    numbers = [10000000, 20000000, 30000000, 40000000]
    
    # Process sequentially
    sequential_results = process_worker(numbers)
    
    # Process in parallel
    parallel_results = process_worker_parallel(numbers)
    
    # Verify results are the same
    print(f"Results match: {sequential_results == parallel_results}")`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Asyncio</h3>
          <CodeBlock
            code={`import asyncio
import time

async def async_task(name, delay):
    print(f"{name} started at {time.strftime('%X')}")
    await asyncio.sleep(delay)  # Non-blocking sleep
    print(f"{name} finished at {time.strftime('%X')}")
    return f"{name} completed"

async def main():
    # Create tasks
    task1 = asyncio.create_task(async_task("Task-1", 2))
    task2 = asyncio.create_task(async_task("Task-2", 3))
    task3 = asyncio.create_task(async_task("Task-3", 1))
    
    print(f"Started at {time.strftime('%X')}")
    
    # Wait for all tasks to complete
    results = await asyncio.gather(task1, task2, task3)
    
    print(f"Finished at {time.strftime('%X')}")
    print(f"Results: {results}")

# Run the async program
asyncio.run(main())`}
            language="python"
            showLineNumbers={true}
          />

          <h3 className="text-xl font-medium mt-4 mb-2">Combining Asyncio with Multiprocessing</h3>
          <CodeBlock
            code={`import asyncio
import concurrent.futures
import time

def cpu_bound(number):
    """CPU-bound task: find sum of squares."""
    return sum(i * i for i in range(number))

async def cpu_bound_async(number):
    """Run CPU-bound task in a thread pool."""
    loop = asyncio.get_running_loop()
    with concurrent.futures.ProcessPoolExecutor() as pool:
        return await loop.run_in_executor(pool, cpu_bound, number)

async def io_bound(delay):
    """I/O-bound task: just wait."""
    print(f"IO task started, waiting for {delay} seconds")
    await asyncio.sleep(delay)
    print(f"IO task finished after {delay} seconds")
    return f"IO result after {delay}s"

async def main():
    start_time = time.time()
    
    # Combine CPU-bound and I/O-bound tasks
    cpu_tasks = [cpu_bound_async(num) for num in [10000000, 20000000, 30000000]]
    io_tasks = [io_bound(delay) for delay in [1, 2, 3]]
    
    # Run all tasks concurrently
    all_results = await asyncio.gather(*(cpu_tasks + io_tasks))
    
    end_time = time.time()
    print(f"All tasks completed in {end_time - start_time:.2f} seconds")
    print(f"Results: {all_results}")

if __name__ == "__main__":
    asyncio.run(main())`}
            language="python"
            showLineNumbers={true}
          />
        </div>
      </section>
    </div>
  )
}

