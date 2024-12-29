'use client';
import Breadcrumb from '@components/breadcrumb';
import React, { useState } from 'react';
import { Step, StepItem } from '@/components/Step';
import Link from 'next/link';

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

export default function AdvancedPython() {
  return (
    <section className="py-12 text-gray-300 min-h-screen">
      <div className='mb-4'>
          <Breadcrumb />
      </div>
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-12">Python Advanced Topics: Level Up Your Skills</h1>
        <div className="max-w-4xl">
          <Step>
            <StepItem title="1. Object-Oriented Programming (OOP)" number="1">
              <p className="mb-4">
                OOP allows you to structure code using classes and objects. It's useful for modeling real-world entities and behaviors.
              </p>
              <p className="mb-2">Example:</p>
              <CodeBlock
                code={`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound")

class Dog(Animal):
    def speak(self):
        print(f"{self.name} barks")

dog = Dog("Rex")
dog.speak()`}
                language="python"
              />
            </StepItem>

            <StepItem title="2. Generators and Iterators" number="2">
              <p className="mb-4">
                Generators are a memory-efficient way to create iterables using the `yield` keyword.
              </p>
              <p className="mb-2">Example:</p>
              <CodeBlock
                code={`def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

for num in fibonacci(5):
    print(num)`}
                language="python"
              />
            </StepItem>

            <StepItem title="3. Decorators" number="3">
              <p className="mb-4">
                Decorators modify or extend the behavior of functions. They are commonly used for logging, authentication, or caching.
              </p>
              <p className="mb-2">Example:</p>
              <CodeBlock
                code={`def log_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_decorator
def greet(name):
    print(f"Hello, {name}")

greet("Alice")`}
                language="python"
              />
            </StepItem>

            <StepItem title="4. Context Managers" number="4">
              <p className="mb-4">
                Use context managers (e.g., `with`) to manage resources efficiently, such as files or database connections.
              </p>
              <p className="mb-2">Example:</p>
              <CodeBlock
                code={`with open("example.txt", "w") as file:
    file.write("Hello, World!")`}
                language="python"
              />
              <p className="mt-4">
                For custom context managers, implement the `__enter__` and `__exit__` methods.
              </p>
            </StepItem>

            <StepItem title="5. Error Handling" number="5">
              <p className="mb-4">
                Use `try`, `except`, and `finally` to handle exceptions and ensure your code runs smoothly even when errors occur.
              </p>
              <p className="mb-2">Example:</p>
              <CodeBlock
                code={`try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
finally:
    print("Execution completed")`}
                language="python"
              />
            </StepItem>

            <StepItem title="6. Multithreading and Multiprocessing" number="6">
              <p className="mb-4">
                Leverage threading and multiprocessing for concurrent and parallel programming to improve performance.
              </p>
              <p className="mb-2">Example using threading:</p>
              <CodeBlock
                code={`import threading

def task(name):
    print(f"Task {name} is running")

thread = threading.Thread(target=task, args=("A",))
thread.start()
thread.join()`}
                language="python"
              />
              <p className="mb-2 mt-4">Example using multiprocessing:</p>
              <CodeBlock
                code={`import multiprocessing

def task(name):
    print(f"Task {name} is running")

process = multiprocessing.Process(target=task, args=("A",))
process.start()
process.join()`}
                language="python"
              />
            </StepItem>

            <StepItem title="7. Advanced Libraries" number="7">
              <p className="mb-4">
                Python has numerous libraries for advanced use cases. Here are a few:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><Link href="https://numpy.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">NumPy</Link> for numerical computing</li>
                <li><Link href="https://pandas.pydata.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">Pandas</Link> for data manipulation</li>
                <li><Link href="https://docs.python.org/3/library/asyncio.html" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">asyncio</Link> for asynchronous programming</li>
              </ul>
            </StepItem>

            <StepItem title="8. Next Steps" number="8">
              <p className="mb-4">
                You're now equipped with advanced Python knowledge! Consider diving deeper into:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Building REST APIs with <Link href="https://www.djangoproject.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">Django</Link> or Flask</li>
                <li>Data Science and Machine Learning</li>
                <li>Web Scraping with <Link href="https://www.crummy.com/software/BeautifulSoup/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">Beautiful Soup</Link></li>
                <li>Testing and Debugging</li>
              </ul>
              <p>
                Refer to the{" "}
                <Link href="https://docs.python.org/3/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">
                  Python official documentation
                </Link>{" "}
                for further exploration.
              </p>
            </StepItem>
          </Step>
        </div>
      </div>
    </section>
  );
}